import Navbar from '@/Components/Navbar';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useSimulationStore } from '@/stores';

export default function SimulationResults() {
    // Get results from simulation store
    const { getResults, getOverallStats, getHistory } = useSimulationStore();
    const results = getResults();
    const stats = getOverallStats();
    const history = getHistory();

    const { score, totalAnswered, percentage } = results;

    // Feedback based on performance
    const getFeedback = () => {
        if (percentage >= 80) return "Great job! You’re a phishing detection pro.";
        if (percentage >= 60) return "Good work! Keep sharpening your skills.";
        if (percentage >= 40) return "Not bad! Practice makes perfect.";
        return "Keep learning! Cybersecurity skills take time to develop.";
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const statVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } },
    };

    return (
        <div className="min-h-screen text-white bg-gray-900">
            <Head title="Simulation Results - AntiPhishing" />

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="relative flex items-center justify-center min-h-screen pt-20 pb-16 overflow-hidden bg-gradient-to-br from-gray-900 via-cyan-950 to-blue-900">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 rounded-full w-96 h-96 bg-cyan-500/10 blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 delay-1000 rounded-full w-80 h-80 bg-blue-500/10 blur-3xl animate-pulse"></div>
                </div>

                <motion.div
                    className="relative z-10 max-w-5xl px-4 mx-auto sm:px-6 lg:px-8"
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
                                    Simulation Results
                                </h1>
                                <p className="mt-2 font-mono text-lg text-cyan-200">
                                    Email Phishing Lab
                                </p>
                            </div>
                        </div>

                        {/* Score Summary */}
                        <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-3">
                            <motion.div
                                className="p-6 border shadow-lg bg-gray-700/50 rounded-xl border-cyan-500/20"
                                variants={statVariants}
                            >
                                <p className="text-sm uppercase text-cyan-400">Score</p>
                                <p className="mt-2 text-3xl font-bold text-white">{score}/{totalAnswered}</p>
                            </motion.div>
                            <motion.div
                                className="p-6 border shadow-lg bg-gray-700/50 rounded-xl border-cyan-500/20"
                                variants={statVariants}
                            >
                                <p className="text-sm uppercase text-cyan-400">Accuracy</p>
                                <p className="mt-2 text-3xl font-bold text-white">{percentage}%</p>
                            </motion.div>
                            <motion.div
                                className="p-6 border shadow-lg bg-gray-700/50 rounded-xl border-cyan-500/20"
                                variants={statVariants}
                            >
                                <p className="text-sm uppercase text-cyan-400">Best Score</p>
                                <p className="mt-2 text-3xl font-bold text-white">{stats.bestScore}%</p>
                            </motion.div>
                        </div>

                        {/* Feedback */}
                        <div className="mb-10 text-center">
                            <p className="text-xl text-gray-300">{getFeedback()}</p>
                            {percentage < 80 && (
                                <p className="mt-2 font-mono text-sm text-cyan-300">
                                    Tip: Look for suspicious domains and urgent language in phishing attempts.
                                </p>
                            )}

                            {/* Overall Stats */}
                            {stats.totalSimulations > 1 && (
                                <div className="mt-6 p-4 bg-gray-700/30 rounded-lg">
                                    <p className="text-sm text-gray-400 mb-2">Your Progress</p>
                                    <div className="flex justify-center space-x-6 text-sm">
                                        <span className="text-cyan-300">
                                            Simulations: {stats.totalSimulations}
                                        </span>
                                        <span className="text-cyan-300">
                                            Average: {stats.averageScore}%
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* CTA */}
                        <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                            <Link
                                href="/simulation/email"
                                className="px-6 py-3 font-semibold text-white transition-all duration-300 shadow-md bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                            >
                                Retry Simulation
                            </Link>
                            <Link
                                href="/simulation"
                                className="px-6 py-3 font-semibold text-white transition-all duration-300 shadow-md bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl hover:from-gray-600 hover:to-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Back to Labs
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}