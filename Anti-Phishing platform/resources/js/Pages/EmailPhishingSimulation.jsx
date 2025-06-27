import Navbar from '@/Components/Navbar';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useSimulationStore, useUiStore } from '@/stores';

export default function EmailPhishingSimulation() {
    // Simulation store
    const {
        currentQuestion,
        score,
        answers,
        isCompleted,
        answerQuestion,
        nextQuestion,
        resetSimulation,
        completeSimulation,
        setSimulationType,
        getCurrentAnswer,
        getResults
    } = useSimulationStore();

    const { addNotification } = useUiStore();

    // Constants
    const totalSteps = 5; // Total number of simulations
    const step = currentQuestion + 1; // Use currentQuestion as step (1-based for UI)

    // Set simulation type on mount and ensure we have valid data
    useEffect(() => {
        setSimulationType('email');
        // If we're past the available simulations, reset
        if (currentQuestion >= totalSteps) {
            resetSimulation();
        }
    }, [setSimulationType, currentQuestion, totalSteps, resetSimulation]);

    // Email simulation data
    const emailSimulations = [
        {
            sender: "support@yourbank.com",
            subject: "Urgent: Verify Your Account Now!",
            body: "Dear Customer,\n\nWe’ve detected unusual activity on your account. Click the link below to verify your identity within 24 hours or your account will be suspended.\n\n[Verify Now](http://yourbank-security.com/login)",
            isPhishing: true,
            explanation: "The domain 'yourbank-security.com' is not the official bank site, and urgent demands are common phishing tactics."
        },
        {
            sender: "noreply@amazon.com",
            subject: "Your Order Confirmation #12345",
            body: "Thank you for your order!\n\nOrder Details:\n- Product: Wireless Headphones\n- Total: $89.99\n\nYour order will be shipped within 2-3 business days.",
            isPhishing: false,
            explanation: "This appears to be a legitimate order confirmation with no suspicious links or urgent demands."
        },
        {
            sender: "security@paypal.com",
            subject: "Account Limitation Notice",
            body: "Your PayPal account has been limited due to suspicious activity.\n\nClick here to restore access: http://paypal-security.net/restore\n\nFailure to verify within 48 hours will result in permanent suspension.",
            isPhishing: true,
            explanation: "The domain 'paypal-security.net' is fake. Real PayPal emails come from @paypal.com and don't use urgent threats."
        },
        {
            sender: "team@github.com",
            subject: "Weekly Repository Activity",
            body: "Here's your weekly summary:\n\n- 5 commits this week\n- 2 pull requests merged\n- 1 new issue opened\n\nView your dashboard: https://github.com/dashboard",
            isPhishing: false,
            explanation: "This is a legitimate notification from GitHub with official links and no urgent demands."
        },
        {
            sender: "admin@microsoft.com",
            subject: "Your Microsoft Account Will Be Deleted",
            body: "URGENT: Your Microsoft account will be permanently deleted in 24 hours due to inactivity.\n\nClick here immediately to prevent deletion: http://microsoft-account-recovery.com/save\n\nThis is your final warning!",
            isPhishing: true,
            explanation: "Microsoft doesn't delete accounts for inactivity, and the domain is fake. Real Microsoft emails come from @microsoft.com."
        }
    ];

    // Get current simulation
    const simulation = emailSimulations[currentQuestion] || emailSimulations[0];

    // Get current result from store
    const currentResult = getCurrentAnswer(currentQuestion);

    const handleChoice = (userChoice) => {
        const isCorrect = (userChoice === 'phishing') === simulation.isPhishing;

        // Store answer in simulation store
        answerQuestion(currentQuestion, userChoice, isCorrect);

        // Show notification
        addNotification({
            type: isCorrect ? 'success' : 'error',
            message: isCorrect ? 'Correct! Well spotted.' : 'Incorrect. Check the explanation.'
        });
    };

    const nextStep = () => {
        if (currentQuestion < totalSteps - 1) {
            nextQuestion();
        } else {
            // Complete the simulation
            completeSimulation(totalSteps);
            addNotification({
                type: 'success',
                title: 'Simulation Complete!',
                message: `You scored ${score + (currentResult?.isCorrect ? 1 : 0)} out of ${totalSteps}`
            });
        }
    };

    const handleReset = () => {
        resetSimulation();
        addNotification({
            type: 'info',
            message: 'Simulation reset. Good luck!'
        });
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const resultVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    };

    return (
        <div className="min-h-screen text-white bg-gray-900">
            <Head title="Email Phishing Simulation - AntiPhishing" />

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
                                    Email Phishing Simulation
                                </h1>
                                <p className="mt-2 font-mono text-lg text-cyan-200">
                                    Step {step} of {totalSteps} | Score: {score}
                                </p>
                            </div>
                        </div>

                        {/* Instructions */}
                        <p className="mb-6 text-lg text-gray-300">
                            Analyze the email below. Is it safe or a phishing attempt?
                        </p>

                        {/* Email Simulation */}
                        <div className="p-6 mb-8 border bg-gray-700/50 rounded-xl border-cyan-500/20">
                            <div className="text-left">
                                <p className="font-mono text-sm text-cyan-400">From: {simulation.sender}</p>
                                <p className="mt-2 font-mono text-sm text-cyan-400">Subject: {simulation.subject}</p>
                                <p className="mt-4 text-gray-200 whitespace-pre-line">{simulation.body}</p>
                            </div>
                        </div>

                        {/* Choices */}
                        {!currentResult && (
                            <div className="flex justify-center mb-8 space-x-6">
                                <button
                                    onClick={() => handleChoice('safe')}
                                    className="px-6 py-3 font-semibold text-white transition-all duration-300 shadow-md bg-gradient-to-r from-green-600 to-green-500 rounded-xl hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    Safe
                                </button>
                                <button
                                    onClick={() => handleChoice('phishing')}
                                    className="px-6 py-3 font-semibold text-white transition-all duration-300 shadow-md bg-gradient-to-r from-red-600 to-red-500 rounded-xl hover:from-red-700 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    Phishing
                                </button>
                            </div>
                        )}

                        {/* Result */}
                        {currentResult && (
                            <motion.div
                                className={`p-6 rounded-xl border ${
                                    currentResult.isCorrect
                                        ? 'bg-green-900/30 border-green-500/50'
                                        : 'bg-red-900/30 border-red-500/50'
                                }`}
                                initial="hidden"
                                animate="visible"
                                variants={resultVariants}
                            >
                                <div className="flex items-center space-x-4">
                                    <svg
                                        className={`w-8 h-8 ${currentResult.isCorrect ? 'text-green-400' : 'text-red-400'}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d={currentResult.isCorrect ? 'M5 13l4 4L19 7' : 'M6 18L18 6M6 6l12 12'}
                                        />
                                    </svg>
                                    <div>
                                        <p className={`text-lg font-semibold ${currentResult.isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                                            {currentResult.isCorrect ? 'Correct! Well spotted.' : 'Incorrect. Check the explanation.'}
                                        </p>
                                        <p className="mt-2 text-gray-300">{simulation.explanation}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Navigation */}
                        {currentResult && (
                            <div className="flex justify-center mt-8 space-x-4">
                                {step < totalSteps ? (
                                    <button
                                        onClick={nextStep}
                                        className="px-6 py-3 font-semibold text-white transition-all duration-300 shadow-md bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                                    >
                                        Next Simulation
                                    </button>
                                ) : (
                                    <>
                                        <Link
                                            href="/simulation/results"
                                            className="px-6 py-3 font-semibold text-white transition-all duration-300 shadow-md bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                                        >
                                            View Results
                                        </Link>
                                        <button
                                            onClick={handleReset}
                                            className="px-6 py-3 font-semibold text-white transition-all duration-300 shadow-md bg-gradient-to-r from-gray-600 to-gray-500 rounded-xl hover:from-gray-700 hover:to-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                        >
                                            Try Again
                                        </button>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Completion Summary */}
                        {isCompleted && (
                            <motion.div
                                className="mt-8 p-6 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-xl border border-cyan-500/30"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        Simulation Complete!
                                    </h3>
                                    <p className="text-cyan-200 mb-4">
                                        Final Score: {score} out of {totalSteps} ({Math.round((score / totalSteps) * 100)}%)
                                    </p>
                                    <p className="text-gray-300">
                                        {score === totalSteps
                                            ? "Perfect! You're a phishing detection expert!"
                                            : score >= totalSteps * 0.8
                                            ? "Great job! You have strong phishing detection skills."
                                            : score >= totalSteps * 0.6
                                            ? "Good work! Keep practicing to improve your skills."
                                            : "Keep learning! Practice makes perfect in cybersecurity."}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}