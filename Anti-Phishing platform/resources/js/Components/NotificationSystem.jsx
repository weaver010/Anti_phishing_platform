import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUiStore } from '@/stores';

const NotificationSystem = () => {
    const { notifications, removeNotification } = useUiStore();

    // Auto-remove notifications after 5 seconds
    useEffect(() => {
        notifications.forEach(notification => {
            if (!notification.persistent) {
                const timer = setTimeout(() => {
                    removeNotification(notification.id);
                }, 5000);

                return () => clearTimeout(timer);
            }
        });
    }, [notifications, removeNotification]);

    const getNotificationStyles = (type) => {
        switch (type) {
            case 'success':
                return {
                    bg: 'bg-green-900/90',
                    border: 'border-green-500/50',
                    text: 'text-green-300',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    )
                };
            case 'error':
                return {
                    bg: 'bg-red-900/90',
                    border: 'border-red-500/50',
                    text: 'text-red-300',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )
                };
            case 'warning':
                return {
                    bg: 'bg-yellow-900/90',
                    border: 'border-yellow-500/50',
                    text: 'text-yellow-300',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 3h.01" />
                        </svg>
                    )
                };
            case 'info':
            default:
                return {
                    bg: 'bg-blue-900/90',
                    border: 'border-blue-500/50',
                    text: 'text-blue-300',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )
                };
        }
    };

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
            <AnimatePresence>
                {notifications.map((notification) => {
                    const styles = getNotificationStyles(notification.type);
                    
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
                                        <h4 className="text-sm font-semibold mb-1">
                                            {notification.title}
                                        </h4>
                                    )}
                                    <p className="text-sm">
                                        {notification.message}
                                    </p>
                                </div>
                                
                                <button
                                    onClick={() => removeNotification(notification.id)}
                                    className="flex-shrink-0 ml-2 text-current opacity-70 hover:opacity-100 transition-opacity"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

export default NotificationSystem;