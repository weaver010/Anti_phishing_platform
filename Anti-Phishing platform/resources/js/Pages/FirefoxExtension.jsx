import Navbar from '@/Components/Navbar';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function FirefoxExtension() {
    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
        hover: { scale: 1.02, transition: { duration: 0.3 } },
    };

    const handleExtensionClick = () => {
        window.open('https://addons.mozilla.org/en-US/firefox/addon/website-safety-checker-v1/', '_blank');
    };

    return (
        <div className="min-h-screen text-white bg-gray-900">
            <Head title="Firefox Extension - AntiPhishing" />

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="relative flex items-center justify-center min-h-screen pt-24 pb-16 overflow-hidden bg-gradient-to-br from-gray-900 via-cyan-950 to-blue-900">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 rounded-full w-96 h-96 bg-cyan-500/10 blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 delay-1000 rounded-full w-80 h-80 bg-blue-500/10 blur-3xl animate-pulse"></div>
                </div>

                <motion.div
                    className="relative z-10 max-w-4xl px-4 mx-auto sm:px-6 lg:px-8"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div
                        className="p-8 border shadow-2xl bg-gray-800/90 backdrop-blur-md rounded-2xl border-cyan-500/30"
                        variants={cardVariants}
                        whileHover="hover"
                    >
                        {/* Top Accent Bar */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-600 to-blue-900" />

                        {/* Header */}
                        <div className="flex items-center justify-center mb-8 space-x-6">
                            <div className="p-4 border rounded-full bg-cyan-500/10 border-cyan-500/30">
                                <svg 
                                    className="w-16 h-16 text-cyan-400" 
                                    fill="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                            </div>
                            <div className="text-center">
                                <h1 className="text-4xl font-extrabold tracking-tight text-white">
                                    Website Safety Checker
                                </h1>
                                <p className="mt-2 font-mono text-lg text-cyan-200">
                                    Firefox Extension - Real-time URL Protection
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-10 text-center">
                            <p className="mx-auto mb-6 text-lg leading-relaxed text-gray-300 max-w-prose">
                                Enhance your browsing security with our Firefox extension. Get instant safety checks for every website you visit, protecting you from malicious URLs and phishing attempts in real-time.
                            </p>
                            
                            <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-3">
                                <div className="p-4 border rounded-lg bg-gray-700/50 border-cyan-500/20">
                                    <div className="mb-2 text-cyan-400">🛡️</div>
                                    <h3 className="mb-1 font-semibold text-white">Real-time Protection</h3>
                                    <p className="text-sm text-gray-400">Instant URL safety analysis</p>
                                </div>
                                <div className="p-4 border rounded-lg bg-gray-700/50 border-cyan-500/20">
                                    <div className="mb-2 text-cyan-400">⚡</div>
                                    <h3 className="mb-1 font-semibold text-white">Lightning Fast</h3>
                                    <p className="text-sm text-gray-400">No browsing interruption</p>
                                </div>
                                <div className="p-4 border rounded-lg bg-gray-700/50 border-cyan-500/20">
                                    <div className="mb-2 text-cyan-400">🔒</div>
                                    <h3 className="mb-1 font-semibold text-white">Privacy First</h3>
                                    <p className="text-sm text-gray-400">Your data stays secure</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="text-center">
                            <motion.button
                                onClick={handleExtensionClick}
                                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg 
                                    className="w-6 h-6 mr-3" 
                                    fill="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                </svg>
                                Install Firefox Extension
                            </motion.button>
                            <p className="mt-4 text-sm text-gray-400">
                                Free • Compatible with Firefox 89+
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}