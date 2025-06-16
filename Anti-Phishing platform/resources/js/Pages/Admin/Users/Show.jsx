import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { 
    ArrowLeftIcon, 
    PencilIcon, 
    TrashIcon,
    UserIcon,
    EnvelopeIcon,
    ShieldCheckIcon,
    CalendarIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';

export default function ShowUser({ user }) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const confirmUserDeletion = () => {
        setDeleteModalOpen(true);
    };

    const closeModal = () => {
        setDeleteModalOpen(false);
    };

    const deleteUser = () => {
        router.delete(route('admin.users.destroy', user.id), {
            onSuccess: () => {
                router.visit(route('admin.users.index'));
            }
        });
    };

    return (
        <AdminLayout>
            <Head title={`User Details - ${user.name}`} />

            <div className="py-12">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-800 overflow-hidden shadow-xl sm:rounded-xl border border-gray-700">
                        <div className="p-6 text-gray-300">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center space-x-4">
                                    <Link
                                        href={route('admin.users.index')}
                                        className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                                    >
                                        <ArrowLeftIcon className="h-6 w-6" />
                                    </Link>
                                    <h2 className="text-3xl font-bold text-white">User Details</h2>
                                </div>
                                <div className="flex space-x-3">
                                    <Link
                                        href={route('admin.users.edit', user.id)}
                                        className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition-colors duration-300 flex items-center space-x-2"
                                    >
                                        <PencilIcon className="h-4 w-4" />
                                        <span>Edit</span>
                                    </Link>
                                    <button
                                        onClick={confirmUserDeletion}
                                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center space-x-2"
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* User Information */}
                                <div className="lg:col-span-2">
                                    <div className="bg-gray-700/50 rounded-lg p-6 mb-6">
                                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                            <UserIcon className="h-5 w-5 mr-2" />
                                            User Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                                                <p className="text-white text-lg">{user.name}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                                <p className="text-white text-lg flex items-center">
                                                    <EnvelopeIcon className="h-4 w-4 mr-2" />
                                                    {user.email}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                    user.is_admin 
                                                        ? 'bg-cyan-900/50 text-cyan-300' 
                                                        : 'bg-gray-600/50 text-gray-300'
                                                }`}>
                                                    <ShieldCheckIcon className="h-4 w-4 mr-1" />
                                                    {user.is_admin ? 'Administrator' : 'Regular User'}
                                                </span>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1">Provider</label>
                                                <p className="text-white">{user.provider || 'Local'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Activity Statistics */}
                                    <div className="bg-gray-700/50 rounded-lg p-6">
                                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                            <ChartBarIcon className="h-5 w-5 mr-2" />
                                            Activity Statistics
                                        </h3>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="text-center">
                                                <div className="text-3xl font-bold text-cyan-400">{user.url_scans?.length || 0}</div>
                                                <div className="text-gray-400">URL Scans</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-3xl font-bold text-purple-400">{user.malware_scans?.length || 0}</div>
                                                <div className="text-gray-400">Malware Scans</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Sidebar */}
                                <div className="space-y-6">
                                    {/* Account Details */}
                                    <div className="bg-gray-700/50 rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                            <CalendarIcon className="h-5 w-5 mr-2" />
                                            Account Details
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1">Created</label>
                                                <p className="text-white text-sm">{formatDate(user.created_at)}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1">Last Updated</label>
                                                <p className="text-white text-sm">{formatDate(user.updated_at)}</p>
                                            </div>
                                            {user.last_active_at && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-1">Last Active</label>
                                                    <p className="text-white text-sm">{formatDate(user.last_active_at)}</p>
                                                </div>
                                            )}
                                            {user.email_verified_at && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-1">Email Verified</label>
                                                    <p className="text-green-400 text-sm">✓ Verified</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Avatar */}
                                    {user.avatar && (
                                        <div className="bg-gray-700/50 rounded-lg p-6">
                                            <h3 className="text-lg font-semibold text-white mb-4">Avatar</h3>
                                            <img 
                                                src={user.avatar} 
                                                alt={`${user.name}'s avatar`}
                                                className="w-20 h-20 rounded-full mx-auto"
                                            />
                                        </div>
                                    )}
                                </div>
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
                        Are you sure you want to delete <strong>{user.name}</strong>?
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
