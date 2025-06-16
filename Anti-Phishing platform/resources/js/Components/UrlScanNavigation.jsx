import { motion } from 'framer-motion';
import { useUrlScanStore } from '@/stores';

// Status Badge Component
const StatusBadge = ({ status, count, isActive, onClick }) => {
    const getStatusConfig = (status) => {
        switch (status) {
            case 'safe':
                return {
                    bg: isActive ? 'bg-green-500/20' : 'bg-green-900/30',
                    border: isActive ? 'border-green-400' : 'border-green-700/50',
                    text: isActive ? 'text-green-300' : 'text-green-400',
                    hover: 'hover:bg-green-500/10 hover:border-green-500/50',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    label: 'Safe'
                };
            case 'warning':
                return {
                    bg: isActive ? 'bg-yellow-500/20' : 'bg-yellow-900/30',
                    border: isActive ? 'border-yellow-400' : 'border-yellow-700/50',
                    text: isActive ? 'text-yellow-300' : 'text-yellow-400',
                    hover: 'hover:bg-yellow-500/10 hover:border-yellow-500/50',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    label: 'Suspicious'
                };
            case 'unsafe':
                return {
                    bg: isActive ? 'bg-red-500/20' : 'bg-red-900/30',
                    border: isActive ? 'border-red-400' : 'border-red-700/50',
                    text: isActive ? 'text-red-300' : 'text-red-400',
                    hover: 'hover:bg-red-500/10 hover:border-red-500/50',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    label: 'Malicious'
                };
            default:
                return {
                    bg: 'bg-gray-900/30',
                    border: 'border-gray-700/50',
                    text: 'text-gray-400',
                    hover: 'hover:bg-gray-700/50',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    label: 'Unknown'
                };
        }
    };

    const config = getStatusConfig(status);

    return (
        <motion.button
            className={`flex items-center px-4 py-3 rounded-lg border transition-all duration-300 ${config.bg} ${config.border} ${config.text} ${config.hover} ${isActive ? 'shadow-lg' : ''}`}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center space-x-3">
                {config.icon}
                <div className="text-left">
                    <div className="font-semibold text-sm">{config.label}</div>
                    <div className="text-xs opacity-75">{count} URLs</div>
                </div>
            </div>
        </motion.button>
    );
};

// Tab Navigation Component
const UrlScanTabNavigation = ({ activeTab, onTabChange, scanCounts }) => {
    const tabs = [
        { id: 'all', label: 'All Scans', count: scanCounts.total },
        { id: 'safe', label: 'Safe', count: scanCounts.safe },
        { id: 'warning', label: 'Suspicious', count: scanCounts.warning },
        { id: 'unsafe', label: 'Malicious', count: scanCounts.unsafe }
    ];

    return (
        <div className="flex flex-wrap gap-2 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
            {tabs.map((tab) => (
                <motion.button
                    key={tab.id}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        activeTab === tab.id
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                            : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-300'
                    }`}
                    onClick={() => onTabChange(tab.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="flex items-center space-x-2">
                        <span>{tab.label}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                            activeTab === tab.id ? 'bg-cyan-400/20 text-cyan-300' : 'bg-gray-600/50 text-gray-400'
                        }`}>
                            {tab.count}
                        </span>
                    </div>
                </motion.button>
            ))}
        </div>
    );
};

// Status Filter Navigation
const UrlScanStatusNavigation = ({ activeFilter, onFilterChange, scanCounts }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatusBadge
                status="safe"
                count={scanCounts.safe}
                isActive={activeFilter === 'safe'}
                onClick={() => onFilterChange('safe')}
            />
            <StatusBadge
                status="warning"
                count={scanCounts.warning}
                isActive={activeFilter === 'warning'}
                onClick={() => onFilterChange('warning')}
            />
            <StatusBadge
                status="unsafe"
                count={scanCounts.unsafe}
                isActive={activeFilter === 'unsafe'}
                onClick={() => onFilterChange('unsafe')}
            />
        </div>
    );
};

// Quick Action Navigation
const UrlScanQuickActions = ({ onAction }) => {
    const actions = [
        {
            id: 'scan-new',
            label: 'Scan New URL',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            ),
            color: 'bg-blue-600 hover:bg-blue-700 text-white'
        },
        {
            id: 'export-results',
            label: 'Export Results',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            color: 'bg-gray-600 hover:bg-gray-700 text-white'
        },
        {
            id: 'clear-history',
            label: 'Clear History',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            ),
            color: 'bg-red-600 hover:bg-red-700 text-white'
        }
    ];

    return (
        <div className="flex flex-wrap gap-3">
            {actions.map((action) => (
                <motion.button
                    key={action.id}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${action.color}`}
                    onClick={() => onAction(action.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {action.icon}
                    <span className="ml-2">{action.label}</span>
                </motion.button>
            ))}
        </div>
    );
};

// Breadcrumb Navigation
const UrlScanBreadcrumb = ({ currentPath, onNavigate }) => {
    const pathSegments = currentPath.split('/').filter(Boolean);
    
    return (
        <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
            <motion.button
                className="hover:text-cyan-400 transition-colors duration-200"
                onClick={() => onNavigate('/')}
                whileHover={{ scale: 1.05 }}
            >
                Home
            </motion.button>
            {pathSegments.map((segment, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <motion.button
                        className={`capitalize ${index === pathSegments.length - 1 ? 'text-cyan-400' : 'hover:text-cyan-400'} transition-colors duration-200`}
                        onClick={() => onNavigate(`/${pathSegments.slice(0, index + 1).join('/')}`)}
                        whileHover={{ scale: 1.05 }}
                    >
                        {segment.replace('-', ' ')}
                    </motion.button>
                </div>
            ))}
        </nav>
    );
};

export {
    StatusBadge,
    UrlScanTabNavigation,
    UrlScanStatusNavigation,
    UrlScanQuickActions,
    UrlScanBreadcrumb
};
