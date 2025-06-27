import Navbar from '@/Components/Navbar';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Simulation() {
    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
        hover: { scale: 1.05, transition: { duration: 0.3 } },
    };

    const handleClick = (e) => {
        console.log('Link clicked! Navigating to /simulation/email');
    };

    return (
        <div className="min-h-screen text-white bg-gray-900">
            <Head title="Simulation Labs - AntiPhishing" />

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
                    className="relative z-10 max-w-6xl px-4 mx-auto sm:px-6 lg:px-8"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <div className="p-8 border shadow-2xl bg-gray-800/90 backdrop-blur-md rounded-2xl border-cyan-500/30">
                        {/* Top Accent Bar */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-600 to-blue-900" />

                        {/* Header */}
                        <div className="flex items-center mb-8 space-x-6">
                            <img
                                src="/assets/Eye.png"
                                alt="Eye Icon"
                                className="object-contain w-20 h-20 mt-2"
                            />
                            <div>
                                <h1 className="text-4xl font-extrabold tracking-tight text-white">
                                    Phishing Simulation Labs
                                </h1>
                                <p className="mt-2 font-mono text-lg text-cyan-200">
                                    Test your skills. Defend the digital frontier.
                                </p>
                            </div>
                        </div>

                        {/* Introduction */}
                        <div className="mb-10">
                            <p className="text-lg leading-relaxed text-gray-300 max-w-prose">
                                Hone your phishing detection skills with interactive simulations. Identify threats, earn scores, and become a cybersecurity expert.
                            </p>
                        </div>

                        {/* Simulation Cards */}
                        <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2">
                            <Link href="/simulation/email" onClick={handleClick}>
                                <motion.div
                                    className="p-6 transition-all duration-300 border shadow-lg cursor-pointer bg-gray-700/50 rounded-xl border-cyan-500/20 hover:shadow-cyan-500/30"
                                    variants={cardVariants}
                                    whileHover="hover"
                                >
                                    <h3 className="text-xl font-semibold text-cyan-300">Email Phishing Lab</h3>
                                    <p className="mt-2 text-gray-400">Spot phishing emails in a simulated inbox.</p>
                                    <p className="mt-2 text-sm text-cyan-400">Difficulty: Beginner | ~5 mins</p>
                                </motion.div>
                            </Link>
                            <motion.div
                                className="p-6 transition-all duration-300 border shadow-lg bg-gray-700/50 rounded-xl border-cyan-500/20 hover:shadow-cyan-500/30"
                                variants={cardVariants}
                                whileHover="hover"
                            >
                                <h3 className="text-xl font-semibold text-cyan-300">Website Phishing Lab</h3>
                                <p className="mt-2 text-gray-400">Identify fake websites designed to steal data.</p>
                                <p className="mt-2 text-sm text-cyan-400">Difficulty: Intermediate | ~7 mins</p>
                            </motion.div>
                        </div>

                        {/* Score Dashboard */}
                        <div className="mb-10">
                            <h2 className="mb-4 text-2xl font-bold text-white">Your Scores</h2>
                            <div className="p-6 border bg-gray-700/50 rounded-xl border-cyan-500/20">
                                <p className="text-center text-gray-400">No simulations completed yet.</p>
                                <p className="mt-2 font-mono text-center text-cyan-300">
                                    Start a lab to see your scores!
                                </p>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="text-center">
                            <Link
                                href="/simulation/email"
                                onClick={handleClick}
                                className="inline-block px-8 py-4 text-lg font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                            >
                                Start Simulation
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}