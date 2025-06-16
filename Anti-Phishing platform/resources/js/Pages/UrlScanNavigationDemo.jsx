import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { 
    StatusBadge,
    UrlScanTabNavigation, 
    UrlScanStatusNavigation, 
    UrlScanQuickActions,
    UrlScanBreadcrumb 
} from '@/Components/UrlScanNavigation';

export default function UrlScanNavigationDemo() {
    const [activeTab, setActiveTab] = useState('all');
    const [activeFilter, setActiveFilter] = useState(null);

    // Demo data
    const scanCounts = {
        total: 150,
        safe: 120,
        warning: 20,
        unsafe: 10
    };

    const handleQuickAction = (actionId) => {
        alert(`Quick action: ${actionId}`);
    };

    const handleNavigate = (path) => {
        console.log(`Navigate to: ${path}`);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Head title="URL Scan Navigation Demo - AntiPhishing" />
            <Navbar />
            
            <div className="pt-20 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2">URL Scan Navigation Demo</h1>
                        <p className="text-gray-400">Showcase of color-coded navigation components for URL scan results</p>
                    </div>

                    {/* Breadcrumb Demo */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Breadcrumb Navigation</h2>
                        <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700/50">
                            <UrlScanBreadcrumb 
                                currentPath="/url-scan/results/malicious"
                                onNavigate={handleNavigate}
                            />
                        </div>
                    </div>

                    {/* Status Badge Demo */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Status Badges</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                                <h3 className="text-lg font-medium text-white mb-3">Safe URLs</h3>
                                <StatusBadge
                                    status="safe"
                                    count={120}
                                    isActive={false}
                                    onClick={() => console.log('Safe clicked')}
                                />
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                                <h3 className="text-lg font-medium text-white mb-3">Suspicious URLs</h3>
                                <StatusBadge
                                    status="warning"
                                    count={20}
                                    isActive={true}
                                    onClick={() => console.log('Warning clicked')}
                                />
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                                <h3 className="text-lg font-medium text-white mb-3">Malicious URLs</h3>
                                <StatusBadge
                                    status="unsafe"
                                    count={10}
                                    isActive={false}
                                    onClick={() => console.log('Unsafe clicked')}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Tab Navigation Demo */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Tab Navigation</h2>
                        <UrlScanTabNavigation
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            scanCounts={scanCounts}
                        />
                    </div>

                    {/* Status Filter Navigation Demo */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Status Filter Navigation</h2>
                        <UrlScanStatusNavigation
                            activeFilter={activeFilter}
                            onFilterChange={setActiveFilter}
                            scanCounts={scanCounts}
                        />
                    </div>

                    {/* Quick Actions Demo */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Quick Actions</h2>
                        <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700/50">
                            <UrlScanQuickActions onAction={handleQuickAction} />
                        </div>
                    </div>

                    {/* Color Scheme Reference */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Color Scheme Reference</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Safe Colors */}
                            <motion.div 
                                className="p-6 bg-green-900/30 border border-green-700/50 rounded-lg"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                    <h3 className="text-lg font-semibold text-green-300">Safe URLs</h3>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Background:</span>
                                        <span className="text-green-300">bg-green-900/30</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Border:</span>
                                        <span className="text-green-300">border-green-700/50</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Text:</span>
                                        <span className="text-green-300">text-green-300</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Hover:</span>
                                        <span className="text-green-300">hover:bg-green-500/10</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Warning Colors */}
                            <motion.div 
                                className="p-6 bg-yellow-900/30 border border-yellow-700/50 rounded-lg"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                                    <h3 className="text-lg font-semibold text-yellow-300">Suspicious URLs</h3>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Background:</span>
                                        <span className="text-yellow-300">bg-yellow-900/30</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Border:</span>
                                        <span className="text-yellow-300">border-yellow-700/50</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Text:</span>
                                        <span className="text-yellow-300">text-yellow-300</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Hover:</span>
                                        <span className="text-yellow-300">hover:bg-yellow-500/10</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Unsafe Colors */}
                            <motion.div 
                                className="p-6 bg-red-900/30 border border-red-700/50 rounded-lg"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                                    <h3 className="text-lg font-semibold text-red-300">Malicious URLs</h3>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Background:</span>
                                        <span className="text-red-300">bg-red-900/30</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Border:</span>
                                        <span className="text-red-300">border-red-700/50</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Text:</span>
                                        <span className="text-red-300">text-red-300</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Hover:</span>
                                        <span className="text-red-300">hover:bg-red-500/10</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Usage Instructions */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Usage Instructions</h2>
                        <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700/50">
                            <div className="prose prose-invert max-w-none">
                                <h3 className="text-lg font-semibold text-white mb-3">How to Use These Components</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li><strong className="text-cyan-300">StatusBadge:</strong> Individual status indicators with hover effects</li>
                                    <li><strong className="text-cyan-300">UrlScanTabNavigation:</strong> Tab-style navigation with counts</li>
                                    <li><strong className="text-cyan-300">UrlScanStatusNavigation:</strong> Grid-based status filters</li>
                                    <li><strong className="text-cyan-300">UrlScanQuickActions:</strong> Action buttons for common tasks</li>
                                    <li><strong className="text-cyan-300">UrlScanBreadcrumb:</strong> Hierarchical navigation</li>
                                </ul>
                                
                                <h3 className="text-lg font-semibold text-white mb-3 mt-6">Color Coding</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li><strong className="text-green-300">Green:</strong> Safe URLs - No threats detected</li>
                                    <li><strong className="text-yellow-300">Yellow:</strong> Suspicious URLs - Potential threats</li>
                                    <li><strong className="text-red-300">Red:</strong> Malicious URLs - Confirmed threats</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}
