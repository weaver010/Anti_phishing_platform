import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { 
    EnvelopeIcon,
    ChartBarIcon,
    DocumentTextIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';

export default function ReportsIndex() {
    const reportCards = [
        {
            title: 'Contact Submissions',
            description: 'View and manage contact form submissions from users',
            icon: EnvelopeIcon,
            href: route('admin.reports.contacts'),
            color: 'bg-blue-600 hover:bg-blue-700',
            iconColor: 'text-blue-100',
        },
        {
            title: 'User Analytics',
            description: 'Coming soon - User activity and engagement metrics',
            icon: UserGroupIcon,
            href: '#',
            color: 'bg-gray-600 hover:bg-gray-700',
            iconColor: 'text-gray-300',
            disabled: true,
        },
        {
            title: 'Scan Reports',
            description: 'Coming soon - Detailed scan statistics and trends',
            icon: ChartBarIcon,
            href: '#',
            color: 'bg-gray-600 hover:bg-gray-700',
            iconColor: 'text-gray-300',
            disabled: true,
        },
        {
            title: 'System Logs',
            description: 'Coming soon - System activity and error logs',
            icon: DocumentTextIcon,
            href: '#',
            color: 'bg-gray-600 hover:bg-gray-700',
            iconColor: 'text-gray-300',
            disabled: true,
        },
    ];

    return (
        <AdminLayout>
            <Head title="Reports Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-800 overflow-hidden shadow-xl sm:rounded-xl border border-gray-700">
                        <div className="p-6 text-gray-300">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-white mb-2">Reports Dashboard</h2>
                                <p className="text-gray-400">Access various reports and analytics for your anti-phishing platform</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                {reportCards.map((card, index) => (
                                    <div key={index} className="relative">
                                        {card.disabled ? (
                                            <div className={`${card.color} rounded-lg p-6 cursor-not-allowed opacity-60`}>
                                                <div className="flex items-center">
                                                    <div className={`flex-shrink-0 ${card.iconColor}`}>
                                                        <card.icon className="h-8 w-8" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <h3 className="text-lg font-medium text-white">{card.title}</h3>
                                                        <p className="text-sm text-gray-200 mt-1">{card.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <Link
                                                href={card.href}
                                                className={`block ${card.color} rounded-lg p-6 transition-colors duration-200`}
                                            >
                                                <div className="flex items-center">
                                                    <div className={`flex-shrink-0 ${card.iconColor}`}>
                                                        <card.icon className="h-8 w-8" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <h3 className="text-lg font-medium text-white">{card.title}</h3>
                                                        <p className="text-sm text-gray-200 mt-1">{card.description}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 bg-gray-700/50 rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-white mb-4">Quick Stats</h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-cyan-400">-</div>
                                        <div className="text-gray-400 text-sm">Total Contacts</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-400">-</div>
                                        <div className="text-gray-400 text-sm">Resolved</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-yellow-400">-</div>
                                        <div className="text-gray-400 text-sm">Pending</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-400">-</div>
                                        <div className="text-gray-400 text-sm">This Week</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
