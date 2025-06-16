import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { 
    ArrowLeftIcon, 
    TrashIcon,
    EnvelopeIcon,
    CalendarIcon,
    ComputerDesktopIcon,
    GlobeAltIcon
} from '@heroicons/react/24/outline';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';

export default function ContactShow({ contact }) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        status: contact.status,
        admin_notes: contact.admin_notes || '',
    });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const confirmContactDeletion = () => {
        setDeleteModalOpen(true);
    };

    const closeModal = () => {
        setDeleteModalOpen(false);
    };

    const deleteContact = () => {
        router.delete(route('admin.reports.contacts.delete', contact.id), {
            onSuccess: () => {
                router.visit(route('admin.reports.contacts'));
            }
        });
    };

    const updateContact = (e) => {
        e.preventDefault();
        put(route('admin.reports.contacts.update', contact.id));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'unread':
                return 'bg-yellow-900/50 text-yellow-300';
            case 'read':
                return 'bg-blue-900/50 text-blue-300';
            case 'replied':
                return 'bg-green-900/50 text-green-300';
            default:
                return 'bg-gray-700/50 text-gray-300';
        }
    };

    return (
        <AdminLayout>
            <Head title={`Contact from ${contact.name}`} />

            <div className="py-12">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-800 overflow-hidden shadow-xl sm:rounded-xl border border-gray-700">
                        <div className="p-6 text-gray-300">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center space-x-4">
                                    <Link
                                        href={route('admin.reports.contacts')}
                                        className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                                    >
                                        <ArrowLeftIcon className="h-6 w-6" />
                                    </Link>
                                    <h2 className="text-3xl font-bold text-white">Contact Details</h2>
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={confirmContactDeletion}
                                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center space-x-2"
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Contact Information */}
                                <div className="lg:col-span-2">
                                    <div className="bg-gray-700/50 rounded-lg p-6 mb-6">
                                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                            <EnvelopeIcon className="h-5 w-5 mr-2" />
                                            Contact Information
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                                                <p className="text-white text-lg">{contact.name}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                                <p className="text-white text-lg">{contact.email}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(contact.status)}`}>
                                                    {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="bg-gray-700/50 rounded-lg p-6 mb-6">
                                        <h3 className="text-xl font-semibold text-white mb-4">Message</h3>
                                        <div className="bg-gray-800/50 rounded-lg p-4">
                                            <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                                                {contact.message}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Admin Actions */}
                                    <div className="bg-gray-700/50 rounded-lg p-6">
                                        <h3 className="text-xl font-semibold text-white mb-4">Admin Actions</h3>
                                        <form onSubmit={updateContact} className="space-y-4">
                                            <div>
                                                <InputLabel htmlFor="status" value="Status" className="text-gray-300" />
                                                <select
                                                    id="status"
                                                    value={data.status}
                                                    onChange={(e) => setData('status', e.target.value)}
                                                    className="mt-1 block w-full bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                                >
                                                    <option value="unread">Unread</option>
                                                    <option value="read">Read</option>
                                                    <option value="replied">Replied</option>
                                                </select>
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="admin_notes" value="Admin Notes" className="text-gray-300" />
                                                <textarea
                                                    id="admin_notes"
                                                    value={data.admin_notes}
                                                    onChange={(e) => setData('admin_notes', e.target.value)}
                                                    rows="4"
                                                    className="mt-1 block w-full bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                                    placeholder="Add internal notes about this contact..."
                                                />
                                            </div>

                                            <div className="flex justify-end">
                                                <PrimaryButton 
                                                    className="bg-cyan-600 hover:bg-cyan-700 focus:bg-cyan-700 active:bg-cyan-900" 
                                                    disabled={processing}
                                                >
                                                    {processing ? 'Updating...' : 'Update Contact'}
                                                </PrimaryButton>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {/* Sidebar */}
                                <div className="space-y-6">
                                    {/* Submission Details */}
                                    <div className="bg-gray-700/50 rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                            <CalendarIcon className="h-5 w-5 mr-2" />
                                            Submission Details
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1">Submitted</label>
                                                <p className="text-white text-sm">{formatDate(contact.created_at)}</p>
                                            </div>
                                            {contact.read_at && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-1">Read At</label>
                                                    <p className="text-white text-sm">{formatDate(contact.read_at)}</p>
                                                </div>
                                            )}
                                            {contact.read_by && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-1">Read By</label>
                                                    <p className="text-white text-sm">{contact.read_by.name}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Technical Details */}
                                    <div className="bg-gray-700/50 rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                            <ComputerDesktopIcon className="h-5 w-5 mr-2" />
                                            Technical Details
                                        </h3>
                                        <div className="space-y-4">
                                            {contact.ip_address && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-1">IP Address</label>
                                                    <p className="text-white text-sm font-mono">{contact.ip_address}</p>
                                                </div>
                                            )}
                                            {contact.user_agent && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-1">User Agent</label>
                                                    <p className="text-white text-xs break-all">{contact.user_agent}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
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
                        Delete Contact Submission
                    </h2>

                    <p className="text-sm text-gray-600 mb-6">
                        Are you sure you want to delete the contact submission from <strong>{contact.name}</strong>? 
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
