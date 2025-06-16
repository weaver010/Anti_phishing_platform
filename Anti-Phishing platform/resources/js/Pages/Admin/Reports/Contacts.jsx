import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { 
    EyeIcon, 
    TrashIcon, 
    EnvelopeIcon,
    EnvelopeOpenIcon,
    CheckCircleIcon,
    ClockIcon
} from '@heroicons/react/24/outline';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

export default function ContactsIndex({ contacts, stats, filters = {} }) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

    const confirmContactDeletion = (contact) => {
        setContactToDelete(contact);
        setDeleteModalOpen(true);
    };

    const closeModal = () => {
        setDeleteModalOpen(false);
        setContactToDelete(null);
    };

    const deleteContact = () => {
        if (contactToDelete) {
            router.delete(route('admin.reports.contacts.delete', contactToDelete.id), {
                onSuccess: () => {
                    closeModal();
                }
            });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route('admin.reports.contacts'), 
            { search: searchTerm, status: statusFilter },
            { preserveState: true, preserveScroll: true }
        );
    };

    const clearFilters = () => {
        setSearchTerm('');
        setStatusFilter('');
        router.get(
            route('admin.reports.contacts'),
            {},
            { preserveState: true }
        );
    };
    
    const handleStatusChange = (e) => {
        const status = e.target.value;
        setStatusFilter(status);
        router.get(
            route('admin.reports.contacts'),
            { search: searchTerm, status: status },
            { preserveState: true, preserveScroll: true }
        );
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'unread':
                return <EnvelopeIcon className="h-5 w-5 text-yellow-400" />;
            case 'read':
                return <EnvelopeOpenIcon className="h-5 w-5 text-blue-400" />;
            case 'replied':
                return <CheckCircleIcon className="h-5 w-5 text-green-400" />;
            default:
                return <ClockIcon className="h-5 w-5 text-gray-400" />;
        }
    };

    const getStatusBadge = (status) => {
        const baseClasses = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full";
        switch (status) {
            case 'unread':
                return `${baseClasses} bg-yellow-900/50 text-yellow-300`;
            case 'read':
                return `${baseClasses} bg-blue-900/50 text-blue-300`;
            case 'replied':
                return `${baseClasses} bg-green-900/50 text-green-300`;
            default:
                return `${baseClasses} bg-gray-700/50 text-gray-300`;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AdminLayout>
            <Head title="Contact Submissions" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-800 overflow-hidden shadow-xl sm:rounded-xl border border-gray-700">
                        <div className="p-6 text-gray-300">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-white">Contact Submissions</h2>
                                <Link
                                    href={route('admin.reports.index')}
                                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
                                >
                                    Back to Reports
                                </Link>
                            </div>

                            {/* Statistics Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-gray-700/50 rounded-lg p-4">
                                    <div className="flex items-center">
                                        <EnvelopeIcon className="h-8 w-8 text-cyan-400" />
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-400">Total</p>
                                            <p className="text-2xl font-semibold text-white">{stats.total}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-700/50 rounded-lg p-4">
                                    <div className="flex items-center">
                                        <EnvelopeIcon className="h-8 w-8 text-yellow-400" />
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-400">Unread</p>
                                            <p className="text-2xl font-semibold text-white">{stats.unread}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-700/50 rounded-lg p-4">
                                    <div className="flex items-center">
                                        <EnvelopeOpenIcon className="h-8 w-8 text-blue-400" />
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-400">Read</p>
                                            <p className="text-2xl font-semibold text-white">{stats.read}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-700/50 rounded-lg p-4">
                                    <div className="flex items-center">
                                        <CheckCircleIcon className="h-8 w-8 text-green-400" />
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-400">Replied</p>
                                            <p className="text-2xl font-semibold text-white">{stats.replied}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Search and Filter Section */}
                            <div className="mb-6 bg-gray-700/50 p-4 rounded-lg">
                                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1">
                                        <TextInput
                                            type="text"
                                            placeholder="Search by name, email, or message..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="md:w-48">
                                        <select
                                            value={statusFilter}
                                            onChange={handleStatusChange}
                                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        >
                                            <option value="">All Status</option>
                                            <option value="unread">Unread</option>
                                            <option value="read">Read</option>
                                            <option value="replied">Replied</option>
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
                                {(filters.search || filters.status) && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        <span className="text-gray-400">Active filters:</span>
                                        {filters.search && (
                                            <span className="bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full text-xs">
                                                Search: {filters.search}
                                            </span>
                                        )}
                                        {filters.status && (
                                            <span className="bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full text-xs">
                                                Status: {filters.status.charAt(0).toUpperCase() + filters.status.slice(1)}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-700">
                                    <thead className="bg-gray-700/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Contact</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Message</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                                        {contacts.data.map((contact) => (
                                            <tr key={contact.id} className="hover:bg-gray-700/50 transition-colors duration-200">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-white">{contact.name}</div>
                                                        <div className="text-sm text-gray-300">{contact.email}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-300 max-w-xs truncate">
                                                        {contact.message}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={getStatusBadge(contact.status)}>
                                                        <span className="flex items-center">
                                                            {getStatusIcon(contact.status)}
                                                            <span className="ml-1">{contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}</span>
                                                        </span>
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                    {formatDate(contact.created_at)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex items-center space-x-3">
                                                        <Link
                                                            href={route('admin.reports.contacts.show', contact.id)}
                                                            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                                            title="View Contact"
                                                        >
                                                            <EyeIcon className="h-5 w-5" />
                                                        </Link>
                                                        <button
                                                            onClick={() => confirmContactDeletion(contact)}
                                                            className="text-red-400 hover:text-red-300 transition-colors duration-200"
                                                            title="Delete Contact"
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
                                {contacts.links && (
                                    <div className="flex justify-center">
                                        {contacts.links.map((link, index) => (
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
                        Delete Contact Submission
                    </h2>

                    <p className="text-sm text-gray-600 mb-6">
                        Are you sure you want to delete the contact submission from <strong>{contactToDelete?.name}</strong>? 
                        This action cannot be undone.
                    </p>

                    <div className="flex justify-end space-x-3">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>
                        <DangerButton onClick={deleteContact}>
                            Delete Contact
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}
