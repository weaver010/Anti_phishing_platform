import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { PencilIcon, TrashIcon, EyeIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

export default function UsersIndex({ users, filters = {} }) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role || '');

    const confirmUserDeletion = (user) => {
        setUserToDelete(user);
        setDeleteModalOpen(true);
    };

    const closeModal = () => {
        setDeleteModalOpen(false);
        setUserToDelete(null);
    };

    const deleteUser = () => {
        if (userToDelete) {
            router.delete(route('admin.users.destroy', userToDelete.id), {
                onSuccess: () => {
                    closeModal();
                }
            });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route('admin.users.index'),
            { search: searchTerm, role: roleFilter },
            { preserveState: true, preserveScroll: true }
        );
    };

    const clearFilters = () => {
        setSearchTerm('');
        setRoleFilter('');
        router.get(
            route('admin.users.index'),
            {},
            { preserveState: true }
        );
    };

    const handleRoleChange = (e) => {
        const role = e.target.value;
        setRoleFilter(role);
        router.get(
            route('admin.users.index'),
            { search: searchTerm, role: role },
            { preserveState: true, preserveScroll: true }
        );
    };

    return (
        <AdminLayout>
            <Head title="Users Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-800 overflow-hidden shadow-xl sm:rounded-xl border border-gray-700">
                        <div className="p-6 text-gray-300">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-white">Users Management</h2>
                                <Link
                                    href={route('admin.users.create')}
                                    className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition-colors duration-300 flex items-center space-x-2"
                                >
                                    <UserPlusIcon className="h-5 w-5" />
                                    <span>Add New User</span>
                                </Link>
                            </div>

                            {/* Search and Filter Section */}
                            <div className="mb-6 bg-gray-700/50 p-4 rounded-lg">
                                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1">
                                        <TextInput
                                            type="text"
                                            placeholder="Search by name or email..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="md:w-48">
                                        <select
                                            value={roleFilter}
                                            onChange={handleRoleChange}
                                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        >
                                            <option value="">All Roles</option>
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors duration-200"
                                        >
                                            Search
                                        </button>
                                        <button
                                            type="button"
                                            onClick={clearFilters}
                                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors duration-200"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                </form>

                                {/* Active Filters Display */}
                                {(filters.search || filters.role) && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        <span className="text-gray-400">Active filters:</span>
                                        {filters.search && (
                                            <span className="bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full text-xs">
                                                Search: {filters.search}
                                            </span>
                                        )}
                                        {filters.role && (
                                            <span className="bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full text-xs">
                                                Role: {filters.role === 'admin' ? 'Admin' : 'User'}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-700">
                                    <thead className="bg-gray-700/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">URL Scans</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Malware Scans</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                                        {users.data.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-700/50 transition-colors duration-200">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-white">{user.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-300">{user.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        user.is_admin 
                                                            ? 'bg-cyan-900/50 text-cyan-300' 
                                                            : 'bg-gray-700/50 text-gray-300'
                                                    }`}>
                                                        {user.is_admin ? 'Admin' : 'User'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                    {user.url_scans_count}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                    {user.malware_scans_count}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex items-center space-x-3">
                                                        <Link
                                                            href={route('admin.users.show', user.id)}
                                                            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                                            title="View User"
                                                        >
                                                            <EyeIcon className="h-5 w-5" />
                                                        </Link>
                                                        <Link
                                                            href={route('admin.users.edit', user.id)}
                                                            className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                                                            title="Edit User"
                                                        >
                                                            <PencilIcon className="h-5 w-5" />
                                                        </Link>
                                                        <button
                                                            onClick={() => confirmUserDeletion(user)}
                                                            className="text-red-400 hover:text-red-300 transition-colors duration-200"
                                                            title="Delete User"
                                                        >
                                                            <TrashIcon className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-4">
                                {users.links && (
                                    <div className="flex justify-center">
                                        {users.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`px-4 py-2 mx-1 rounded-md ${
                                                    link.active
                                                        ? 'bg-cyan-600 text-white'
                                                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 transition-colors duration-200'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal show={deleteModalOpen} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                        Delete User
                    </h2>

                    <p className="text-sm text-gray-600 mb-6">
                        Are you sure you want to delete <strong>{userToDelete?.name}</strong>?
                        This action cannot be undone and will permanently remove the user and all associated data.
                    </p>

                    <div className="flex justify-end space-x-3">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>
                        <DangerButton onClick={deleteUser}>
                            Delete User
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}