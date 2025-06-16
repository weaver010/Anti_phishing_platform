import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { 
    UrlScanTabNavigation, 
    UrlScanStatusNavigation, 
    UrlScanQuickActions,
    UrlScanBreadcrumb 
} from '@/Components/UrlScanNavigation';
import { useUrlScanStore, useUiStore } from '@/stores';

export default function UrlScanResults() {
    const [activeTab, setActiveTab] = useState('all');
    const [activeFilter, setActiveFilter] = useState(null);
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');

    // Stores
    const { recentScans, clearRecentScans } = useUrlScanStore();
    const { addNotification } = useUiStore();

    // Calculate scan counts
    const scanCounts = {
        total: recentScans.length,
        safe: recentScans.filter(scan => scan.status === 'safe').length,
        warning: recentScans.filter(scan => scan.status === 'warning').length,
        unsafe: recentScans.filter(scan => scan.status === 'unsafe').length
    };

    // Filter scans based on active tab and filter
    const filteredScans = recentScans.filter(scan => {
        if (activeTab !== 'all' && scan.status !== activeTab) return false;
        if (activeFilter && scan.status !== activeFilter) return false;
        return true;
    });

    // Sort scans
    const sortedScans = [...filteredScans].sort((a, b) => {
        let aValue, bValue;
        
        switch (sortBy) {
            case 'date':
                aValue = new Date(a.date);
                bValue = new Date(b.date);
                break;
            case 'url':
                aValue = a.url.toLowerCase();
                bValue = b.url.toLowerCase();
                break;
            case 'status':
                aValue = a.status;
                bValue = b.status;
                break;
            default:
                return 0;
        }
        
        if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    // Handle quick actions
    const handleQuickAction = (actionId) => {
        switch (actionId) {
            case 'scan-new':
                window.location.href = '/url-check';
                break;
            case 'export-results':
                exportResults();
                break;
            case 'clear-history':
                handleClearHistory();
                break;
        }
    };

    // Export results to JSON
    const exportResults = () => {
        const dataStr = JSON.stringify(filteredScans, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `url-scan-results-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        
        addNotification({
            type: 'success',
            message: 'Scan results exported successfully!'
        });
    };

    // Clear scan history
    const handleClearHistory = () => {
        if (window.confirm('Are you sure you want to clear all scan history? This action cannot be undone.')) {
            clearRecentScans();
            addNotification({
                type: 'info',
                message: 'Scan history cleared successfully.'
            });
        }
    };

    // Get status color classes
    const getStatusClasses = (status) => {
        switch (status) {
            case 'safe':
                return 'bg-green-900/30 text-green-300 border-green-700/50';
            case 'warning':
                return 'bg-yellow-900/30 text-yellow-300 border-yellow-700/50';
            case 'unsafe':
                return 'bg-red-900/30 text-red-300 border-red-700/50';
            default:
                return 'bg-gray-900/30 text-gray-300 border-gray-700/50';
        }
    };

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    // Truncate URL
    const truncateUrl = (url, maxLength = 50) => {
        return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Head title="URL Scan Results - AntiPhishing" />
            <Navbar />
            
            <div className="pt-20 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <UrlScanBreadcrumb 
                        currentPath="/url-scan/results"
                        onNavigate={(path) => window.location.href = path}
                    />

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2">URL Scan Results</h1>
                        <p className="text-gray-400">View and manage your URL security scan history</p>
                    </div>

                    {/* Quick Actions */}
                    <div className="mb-6">
                        <UrlScanQuickActions onAction={handleQuickAction} />
                    </div>

                    {/* Tab Navigation */}
                    <div className="mb-6">
                        <UrlScanTabNavigation
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            scanCounts={scanCounts}
                        />
                    </div>

                    {/* Status Filter Navigation */}
                    <UrlScanStatusNavigation
                        activeFilter={activeFilter}
                        onFilterChange={setActiveFilter}
                        scanCounts={scanCounts}
                    />

                    {/* Sort Controls */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                            >
                                <option value="date">Sort by Date</option>
                                <option value="url">Sort by URL</option>
                                <option value="status">Sort by Status</option>
                            </select>
                            <button
                                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm hover:bg-gray-700 transition-colors"
                            >
                                {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
                            </button>
                        </div>
                        <div className="text-sm text-gray-400">
                            Showing {sortedScans.length} of {recentScans.length} scans
                        </div>
                    </div>

                    {/* Results Table */}
                    {sortedScans.length > 0 ? (
                        <motion.div
                            className="bg-gray-800/50 rounded-lg border border-gray-700/50 overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-700/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">URL</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Threat Level</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700/30">
                                        {sortedScans.map((scan) => (
                                            <motion.tr
                                                key={scan.id}
                                                className="hover:bg-gray-700/20 transition-colors duration-150"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-300" title={scan.url}>
                                                        {truncateUrl(scan.url)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusClasses(scan.status)}`}>
                                                        {scan.status === 'safe' ? 'Safe' : scan.status === 'warning' ? 'Suspicious' : 'Malicious'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                                    {scan.threatLevel || 'Unknown'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                                    {formatDate(scan.date)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <Link
                                                        href={`/url-check?url=${encodeURIComponent(scan.url)}`}
                                                        className="text-cyan-400 hover:text-cyan-300 transition-colors"
                                                    >
                                                        Rescan
                                                    </Link>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            className="text-center py-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="text-gray-400 mb-4">
                                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-300 mb-2">No scan results found</h3>
                            <p className="text-gray-400 mb-6">Start scanning URLs to see your results here.</p>
                            <Link
                                href="/url-check"
                                className="inline-flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors"
                            >
                                Scan Your First URL
                            </Link>
                        </motion.div>
                    )}
                </div>
            </div>
            
            <Footer />
        </div>
    );
}
