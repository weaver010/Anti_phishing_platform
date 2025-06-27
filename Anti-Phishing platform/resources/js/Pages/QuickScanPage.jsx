import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import QuickUrlScan from '../Components/QuickUrlScan';

export default function QuickScanPage() {
    // Animation Variants
    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Head title="Quick URL Scan - AntiPhishing" />
            <Navbar />

            <div className="pt-20 pb-16">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <img
                                src="/assets/Eye.png"
                                alt="Eye Icon"
                                className="object-contain w-14 h-14"
                            />
                            <div>
                                <h1 className="text-4xl font-bold text-white mb-1">Quick URL Scan</h1>
                                <p className="text-gray-400">
                                    Instantly check if a URL is phishing or spam using our fast AI-powered scanner.
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/url-check"
                            className="px-4 py-2 text-sm font-medium transition-colors rounded-lg bg-cyan-700/70 hover:bg-cyan-600/70 text-cyan-100"
                        >
                            Full URL Scanner
                        </Link>
                    </div>

                    {/* Card */}
                    <motion.div
                        className="bg-gray-800/90 border border-cyan-500/30 rounded-2xl shadow-2xl p-8 backdrop-blur-md"
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                    >
                        <QuickUrlScan />
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
}