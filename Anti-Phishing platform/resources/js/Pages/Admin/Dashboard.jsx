import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { 
    ShieldCheckIcon, 
    ShieldExclamationIcon, 
    UserGroupIcon, 
    LinkIcon,
    DocumentTextIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler
);

const StatCard = ({ title, value, icon: Icon, trend, trendValue, trendType }) => (
    <div className="p-6 transition-all duration-300 border border-gray-700 shadow-lg bg-gray-800/60 backdrop-blur-sm rounded-xl hover:border-cyan-500 hover:shadow-cyan-900/20 hover:shadow-xl">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-400">{title}</p>
                <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
            </div>
            <div className="p-3 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10">
                <Icon className="w-6 h-6 text-cyan-400" />
            </div>
        </div>
        {trend && (
            <div className="flex items-center mt-4">
                {trendType === 'up' ? (
                    <ArrowTrendingUpIcon className="w-5 h-5 text-green-400" />
                ) : (
                    <ArrowTrendingDownIcon className="w-5 h-5 text-red-400" />
                )}
                <span className={`ml-2 text-sm font-medium ${trendType === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {trendValue}% from last month
                </span>
            </div>
        )}
    </div>
);



export default function Dashboard({
    totalUsers,
    totalUrlScans,
    totalMalwareScans,
    maliciousUrlScans,
    maliciousMalwareScans,
    recentUrlScans,
    recentMalwareScans,
    scanTrends
}) {

    const urlScanData = {
        labels: ['Safe', 'Suspicious', 'Malicious'],
        datasets: [
            {
                data: [
                    totalUrlScans - maliciousUrlScans,
                    Math.floor(maliciousUrlScans * 0.3),
                    Math.floor(maliciousUrlScans * 0.7)
                ],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(234, 179, 8, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderColor: [
                    'rgba(34, 197, 94, 1)',
                    'rgba(234, 179, 8, 1)',
                    'rgba(239, 68, 68, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const malwareScanData = {
        labels: ['Clean', 'Infected'],
        datasets: [
            {
                data: [
                    totalMalwareScans - maliciousMalwareScans,
                    maliciousMalwareScans
                ],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderColor: [
                    'rgba(34, 197, 94, 1)',
                    'rgba(239, 68, 68, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const scanTrendData = {
        labels: scanTrends.map(trend => trend.date),
        datasets: [
            {
                label: 'URL Scans',
                data: scanTrends.map(trend => trend.url_scans),
                borderColor: 'rgb(34, 211, 238)',
                backgroundColor: 'rgba(34, 211, 238, 0.2)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Malware Scans',
                data: scanTrends.map(trend => trend.malware_scans),
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#9CA3AF',
                    font: {
                        size: 12,
                        weight: 500
                    },
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            },
            tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                titleColor: '#F9FAFB',
                bodyColor: '#E5E7EB',
                borderColor: '#374151',
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
                usePointStyle: true,
                titleFont: {
                    size: 14,
                    weight: 'bold'
                },
                callbacks: {
                    label: function(context) {
                        const value = context.raw;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = Math.round((value / total) * 100);
                        return `${context.label}: ${value} (${percentage}%)`;
                    }
                }
            }
        }
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    color: '#9CA3AF',
                    font: {
                        size: 12,
                        weight: 500
                    },
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 20
                }
            },
            tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                titleColor: '#F9FAFB',
                bodyColor: '#E5E7EB',
                borderColor: '#374151',
                borderWidth: 1,
                padding: 12,
                boxPadding: 6
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(75, 85, 99, 0.1)',
                    drawBorder: false
                },
                ticks: {
                    color: '#9CA3AF',
                    padding: 10,
                    font: {
                        size: 11
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#9CA3AF',
                    padding: 10,
                    font: {
                        size: 11
                    }
                }
            }
        }
    };

    return (
        <AdminLayout>
            <Head title="Security Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Header with greeting and date */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-white">Security Dashboard</h1>
                        <p className="mt-1 text-gray-400">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>

                    {/* Main dashboard content */}
                    <div className="overflow-hidden border border-gray-700 shadow-xl bg-gradient-to-br from-gray-900 to-gray-800 sm:rounded-xl">
                        <div className="p-8 text-gray-300">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                                <StatCard 
                                    title="Total Users" 
                                    value={totalUsers.toLocaleString()} 
                                    icon={UserGroupIcon}
                                    trend={true}
                                    trendValue={12}
                                    trendType="up"
                                />
                                <StatCard 
                                    title="URL Scans" 
                                    value={totalUrlScans.toLocaleString()} 
                                    icon={LinkIcon}
                                    trend={true}
                                    trendValue={8}
                                    trendType="up"
                                />
                                <StatCard 
                                    title="Malware Scans" 
                                    value={totalMalwareScans.toLocaleString()} 
                                    icon={DocumentTextIcon}
                                    trend={true}
                                    trendValue={5}
                                    trendType="up"
                                />
                                <StatCard 
                                    title="Threats Detected" 
                                    value={(maliciousUrlScans + maliciousMalwareScans).toLocaleString()} 
                                    icon={ShieldExclamationIcon}
                                    trend={true}
                                    trendValue={3}
                                    trendType="down"
                                />
                            </div>

                            {/* Scan Trends */}
                            <div className="p-6 mb-8 transition-colors duration-300 border border-gray-700 shadow-lg bg-gray-800/40 backdrop-blur-sm rounded-xl hover:border-gray-600">
                                <div className="flex flex-col mb-6 md:flex-row md:items-center md:justify-between">
                                    <h3 className="flex items-center text-lg font-medium text-white">
                                        <ChartBarIcon className="w-5 h-5 mr-2 text-cyan-400" />
                                        Scan Activity Trends
                                    </h3>
                                    <div className="mt-3 md:mt-0">
                                        <select className="p-2 text-sm text-gray-300 bg-gray-700 border border-gray-600 rounded-lg focus:ring-cyan-500 focus:border-cyan-500">
                                            <option>Last 7 Days</option>
                                            <option>Last 30 Days</option>
                                            <option>Last 90 Days</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="h-80">
                                    <Line 
                                        data={scanTrendData}
                                        options={lineChartOptions}
                                    />
                                </div>
                            </div>

                            {/* Charts Grid */}
                            <div className="grid grid-cols-1 gap-8 mb-8 lg:grid-cols-2">
                                <div className="p-6 transition-colors duration-300 border border-gray-700 shadow-lg bg-gray-800/40 backdrop-blur-sm rounded-xl hover:border-gray-600">
                                    <h3 className="flex items-center mb-6 text-lg font-medium text-white">
                                        <LinkIcon className="w-5 h-5 mr-2 text-cyan-400" />
                                        URL Scan Distribution
                                    </h3>
                                    <div className="h-64">
                                        <Doughnut 
                                            data={urlScanData}
                                            options={doughnutOptions}
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 mt-6">
                                        <div className="p-3 text-center rounded-lg bg-gray-700/50">
                                            <div className="text-2xl font-semibold text-white">
                                                {(((totalUrlScans - maliciousUrlScans) / totalUrlScans) * 100).toFixed(1)}%
                                            </div>
                                            <div className="mt-1 text-xs text-gray-400">Safe</div>
                                        </div>
                                        <div className="p-3 text-center rounded-lg bg-gray-700/50">
                                            <div className="text-2xl font-semibold text-yellow-400">
                                                {((Math.floor(maliciousUrlScans * 0.3) / totalUrlScans) * 100).toFixed(1)}%
                                            </div>
                                            <div className="mt-1 text-xs text-gray-400">Suspicious</div>
                                        </div>
                                        <div className="p-3 text-center rounded-lg bg-gray-700/50">
                                            <div className="text-2xl font-semibold text-red-400">
                                                {((Math.floor(maliciousUrlScans * 0.7) / totalUrlScans) * 100).toFixed(1)}%
                                            </div>
                                            <div className="mt-1 text-xs text-gray-400">Malicious</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-6 transition-colors duration-300 border border-gray-700 shadow-lg bg-gray-800/40 backdrop-blur-sm rounded-xl hover:border-gray-600">
                                    <h3 className="flex items-center mb-6 text-lg font-medium text-white">
                                        <DocumentTextIcon className="w-5 h-5 mr-2 text-cyan-400" />
                                        Malware Scan Results
                                    </h3>
                                    <div className="h-64">
                                        <Doughnut 
                                            data={malwareScanData}
                                            options={doughnutOptions}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        <div className="p-3 text-center rounded-lg bg-gray-700/50">
                                            <div className="text-2xl font-semibold text-green-400">
                                                {(((totalMalwareScans - maliciousMalwareScans) / totalMalwareScans) * 100).toFixed(1)}%
                                            </div>
                                            <div className="mt-1 text-xs text-gray-400">Clean Files</div>
                                        </div>
                                        <div className="p-3 text-center rounded-lg bg-gray-700/50">
                                            <div className="text-2xl font-semibold text-red-400">
                                                {((maliciousMalwareScans / totalMalwareScans) * 100).toFixed(1)}%
                                            </div>
                                            <div className="mt-1 text-xs text-gray-400">Infected Files</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Scans */}
                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                                <div className="p-6 transition-colors duration-300 border border-gray-700 shadow-lg bg-gray-800/40 backdrop-blur-sm rounded-xl hover:border-gray-600">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="flex items-center text-lg font-medium text-white">
                                            <LinkIcon className="w-5 h-5 mr-2 text-cyan-400" />
                                            Recent URL Scans
                                        </h3>
                                        <button className="text-xs font-medium text-cyan-400 hover:text-cyan-300">View All</button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-700/50">
                                            <thead>
                                                <tr>
                                                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">URL</th>
                                                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">Status</th>
                                                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">Date</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-700/30">
                                                {recentUrlScans.map((scan) => (
                                                    <tr key={scan.id} className="transition-colors duration-150 hover:bg-gray-700/20">
                                                        <td className="max-w-xs px-6 py-4 text-sm text-gray-300 truncate whitespace-nowrap">
                                                            {scan.url}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                scan.is_malicious 
                                                                    ? 'bg-red-900/30 text-red-300 border border-red-700/50' 
                                                                    : 'bg-green-900/30 text-green-300 border border-green-700/50'
                                                            }`}>
                                                                {scan.is_malicious ? 'Malicious' : 'Safe'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-400 whitespace-nowrap">
                                                            {new Date(scan.created_at).toLocaleDateString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="p-6 transition-colors duration-300 border border-gray-700 shadow-lg bg-gray-800/40 backdrop-blur-sm rounded-xl hover:border-gray-600">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="flex items-center text-lg font-medium text-white">
                                            <DocumentTextIcon className="w-5 h-5 mr-2 text-cyan-400" />
                                            Recent Malware Scans
                                        </h3>
                                        <button className="text-xs font-medium text-cyan-400 hover:text-cyan-300">View All</button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-700/50">
                                            <thead>
                                                <tr>
                                                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">File</th>
                                                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">Status</th>
                                                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">Date</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-700/30">
                                                {recentMalwareScans.map((scan) => (
                                                    <tr key={scan.id} className="transition-colors duration-150 hover:bg-gray-700/20">
                                                        <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                            {scan.filename}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                scan.is_malicious 
                                                                    ? 'bg-red-900/30 text-red-300 border border-red-700/50' 
                                                                    : 'bg-green-900/30 text-green-300 border border-green-700/50'
                                                            }`}>
                                                                {scan.is_malicious ? 'Infected' : 'Clean'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-400 whitespace-nowrap">
                                                            {new Date(scan.created_at).toLocaleDateString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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