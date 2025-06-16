import Navbar from '@/Components/Navbar';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function EmailScanner() {
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

    const handleDownloadClick = async () => {
        try {
            const downloadUrl = '/gui.exe'; // Update path as needed
            
            // Check if file exists first
            const response = await fetch(downloadUrl, { method: 'HEAD' });
            if (!response.ok) {
                alert('Download file is currently unavailable. Please try again later.');
                return;
            }
            
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = 'email-scanner-gui.exe';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Download error:', error);
            alert('Download failed. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen text-white bg-gray-900">
            <Head title="SECURA Email & URL Analyzer - AntiPhishing" />

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
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                </svg>
                            </div>
                            <div className="text-center">
                                <h1 className="text-4xl font-extrabold tracking-tight text-white">
                                    SECURA Email & URL Analyzer
                                </h1>
                                <p className="mt-2 font-mono text-lg text-cyan-200">
                                    Desktop Security Suite - Email Authentication & URL Safety Analysis
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-10 text-center">
                            <p className="mx-auto mb-6 text-lg leading-relaxed text-gray-300 max-w-prose">
                                Protect your inbox with our advanced email scanner. This powerful desktop application analyzes your emails for phishing attempts, malicious links, and suspicious attachments with enterprise-grade security technology.
                            </p>
                            
                            <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-3">
                                <div className="p-4 border rounded-lg bg-gray-700/50 border-cyan-500/20">
                                    <div className="mb-2 text-cyan-400">🔍</div>
                                    <h3 className="mb-1 font-semibold text-white">Deep Scan Analysis</h3>
                                    <p className="text-sm text-gray-400">Advanced threat detection algorithms</p>
                                </div>
                                <div className="p-4 border rounded-lg bg-gray-700/50 border-cyan-500/20">
                                    <div className="mb-2 text-cyan-400">📧</div>
                                    <h3 className="mb-1 font-semibold text-white">Email Integration</h3>
                                    <p className="text-sm text-gray-400">Works with all major email clients</p>
                                </div>
                                <div className="p-4 border rounded-lg bg-gray-700/50 border-cyan-500/20">
                                    <div className="mb-2 text-cyan-400">🖥️</div>
                                    <h3 className="mb-1 font-semibold text-white">Offline Processing</h3>
                                    <p className="text-sm text-gray-400">No data sent to external servers</p>
                                </div>
                            </div>

                            {/* System Requirements */}
                            <div className="p-4 mb-6 border rounded-lg bg-gray-700/30 border-cyan-500/20">
                                <h3 className="mb-2 font-semibold text-white">System Requirements</h3>
                                <div className="grid grid-cols-1 gap-4 text-sm text-gray-400 md:grid-cols-2">
                                    <div>
                                        <p>• Windows 10/11 (64-bit)</p>
                                        <p>• 4GB RAM minimum</p>
                                    </div>
                                    <div>
                                        <p>• 500MB available storage</p>
                                        <p>• .NET Framework 4.8+</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="text-center">
                            <motion.button
                                onClick={handleDownloadClick}
                                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg 
                                    className="w-6 h-6 mr-3" 
                                    fill="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                                </svg>
                                Download SECURA Analyzer
                            </motion.button>
                            <p className="mt-4 text-sm text-gray-400">
                                Free Download • Version 1.0 • 39 MB
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}