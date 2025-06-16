import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUiStore } from '@/stores';

const FloatingResultMessage = () => {
    const { notifications, removeNotification } = useUiStore();

    // Filter for scan result notifications
    const scanResultNotifications = notifications.filter(
        notification => notification.category === 'scan-result'
    );

    // Auto-remove scan result notifications after 8 seconds (longer for scan results)
    useEffect(() => {
        scanResultNotifications.forEach(notification => {
            if (!notification.persistent) {
                const timer = setTimeout(() => {
                    removeNotification(notification.id);
                }, 8000);

                return () => clearTimeout(timer);
            }
        });
    }, [scanResultNotifications, removeNotification]);

    const getScanResultStyles = (status) => {
        switch (status) {
            case 'safe':
                return {
                    bg: 'bg-gradient-to-r from-green-900/95 to-green-800/95',
                    border: 'border-green-500/60',
                    text: 'text-green-100',
                    accent: 'text-green-300',
                    glow: 'shadow-green-500/20',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    statusText: 'SAFE',
                    statusIcon: '🛡️'
                };
            case 'warning':
                return {
                    bg: 'bg-gradient-to-r from-yellow-900/95 to-orange-900/95',
                    border: 'border-yellow-500/60',
                    text: 'text-yellow-100',
                    accent: 'text-yellow-300',
                    glow: 'shadow-yellow-500/20',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    statusText: 'SUSPICIOUS',
                    statusIcon: '⚠️'
                };
            case 'unsafe':
                return {
                    bg: 'bg-gradient-to-r from-red-900/95 to-red-800/95',
                    border: 'border-red-500/60',
                    text: 'text-red-100',
                    accent: 'text-red-300',
                    glow: 'shadow-red-500/20',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    statusText: 'MALICIOUS',
                    statusIcon: '🚨'
                };
            default:
                return {
                    bg: 'bg-gradient-to-r from-gray-900/95 to-gray-800/95',
                    border: 'border-gray-500/60',
                    text: 'text-gray-100',
                    accent: 'text-gray-300',
                    glow: 'shadow-gray-500/20',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    statusText: 'UNKNOWN',
                    statusIcon: '❓'
                };
        }
    };

    return (
        // Change this div to position at top right like NotificationSystem
        <div className="fixed z-50 max-w-sm space-y-2 top-4 right-4">
            <AnimatePresence>
                {scanResultNotifications.map((notification) => {
                    const styles = getScanResultStyles(notification.scanStatus);
                    
                    return (
                        <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: 300, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 300, scale: 0.8 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className={`${styles.bg} ${styles.border} ${styles.text} border backdrop-blur-md rounded-lg shadow-lg p-4 relative overflow-hidden`}
                        >
                            {/* Progress bar for auto-dismiss */}
                            {!notification.persistent && (
                                <motion.div
                                    initial={{ width: '100%' }}
                                    animate={{ width: '0%' }}
                                    transition={{ duration: 5, ease: 'linear' }}
                                    className="absolute bottom-0 left-0 h-1 bg-current opacity-30"
                                />
                            )}
                            
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 mt-0.5">
                                    {styles.icon}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    {notification.title && (
                                        <h4 className="mb-1 text-sm font-semibold">
                                            {notification.title}
                                        </h4>
                                    )}
                                    <p className="text-sm">
                                        {notification.message}
                                    </p>
                                    
                                    {/* URL display - simplified */}
                                    {notification.url && (
                                        <div className="mt-1 text-xs break-all opacity-80">
                                            {notification.url}
                                        </div>
                                    )}
                                </div>
                                
                                <button
                                    onClick={() => removeNotification(notification.id)}
                                    className="flex-shrink-0 ml-2 text-current transition-opacity opacity-70 hover:opacity-100"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            {/* Action buttons - simplified */}
                            {notification.actions && (
                                <div className="flex mt-2 space-x-2">
                                    {notification.actions.map((action, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                action.onClick();
                                                removeNotification(notification.id);
                                            }}
                                            className={`px-3 py-1 text-xs font-medium rounded transition-all duration-200 ${
                                                action.primary 
                                                    ? `${styles.accent} bg-white/20 hover:bg-white/30` 
                                                    : `${styles.text} bg-white/10 hover:bg-white/20`
                                            }`}
                                        >
                                            {action.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

export default FloatingResultMessage;