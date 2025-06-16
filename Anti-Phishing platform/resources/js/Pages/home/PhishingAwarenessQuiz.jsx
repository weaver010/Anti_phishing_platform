import { motion, AnimatePresence } from "framer-motion";
import { useQuizStore, useUiStore } from '@/stores';

const PhishingAwarenessQuiz = () => {
    const {
        currentQuestion,
        score,
        quizCompleted, // Changed from isCompleted to quizCompleted
        handleAnswer,
        resetQuiz: resetQuizStore,
        getQuizResults
    } = useQuizStore();

    const { activeModal, setActiveModal, closeModal } = useUiStore();

    const isModalOpen = activeModal === 'phishing-quiz';

    const quizQuestions = [
        {
            question: "Is this email safe? Subject: 'Urgent: Update Your Account Now!'",
            description: "An email claiming to be from your bank asks you to click a link to update your account details immediately, with a generic greeting ('Dear Customer').",
            options: ["Safe", "Phishing"],
            correctAnswer: "Phishing",
        },
        {
            question: "Is this email safe? Subject: 'Your Order Confirmation #12345'",
            description: "An email with your recent order details, sent from a legitimate company email (e.g., orders@amazon.com), but you didn't place an order recently.",
            options: ["Safe", "Phishing"],
            correctAnswer: "Phishing",
        },
        {
            question: "Is this email safe? Subject: 'Meeting Agenda for Tomorrow'",
            description: "An email from your colleague's email address with a meeting agenda, but the email contains a suspicious attachment named 'agenda.exe'.",
            options: ["Safe", "Phishing"],
            correctAnswer: "Phishing",
        },
    ];

    const onAnswerSubmit = async (answer) => {
        try {
            await handleAnswer(answer);
        } catch (error) {
            console.error('Error handling answer:', error);
        }
    };

    const handleResetQuiz = async () => {
        try {
            await resetQuizStore();  // Wait for the store reset to complete
        } catch (error) {
            console.error('Error resetting quiz:', error);
        }
    };

    const openQuizModal = () => {
        setActiveModal('phishing-quiz');
    };

    // Animation variants
    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: "easeIn" } },
    };

    const backdropVariants = {
        hidden: { opacity: 0, backdropFilter: "blur(0px)" },
        visible: { opacity: 1, backdropFilter: "blur(8px)", transition: { duration: 0.4, ease: "easeOut" } },
        exit: { opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.3, ease: "easeIn" } },
    };

    return (
        <section className="w-full px-4 py-16 text-blue-900 bg-white">
            <motion.div
                className="max-w-5xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
            >
                <div className="mb-12 text-center">
                    <h2 className="relative inline-block text-5xl font-extrabold text-blue-900 md:text-6xl">
                        Test Your Phishing Awareness
                        <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-blue-900/30 rounded-full"></span>
                    </h2>
                    <p className="max-w-3xl mx-auto mt-6 text-xl md:text-2xl text-blue-900/80">
                        Can you spot a phishing attempt? Take this quick quiz to find out!
                    </p>
                </div>

                <div className="text-center">
                    <button
                        onClick={openQuizModal}
                        className="px-8 py-3 text-white transition-colors duration-300 bg-blue-900 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900/50"
                    >
                        Take the Quiz Now
                    </button>
                </div>
            </motion.div>

            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 z-40 bg-black/40"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={backdropVariants}
                            style={{ backdropFilter: "blur(8px)" }}
                        />

                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={modalVariants}
                        >
                            <div className="relative w-full max-w-2xl p-6 overflow-y-auto bg-white border shadow-xl dark:bg-gray-800 rounded-xl backdrop-blur-sm border-blue-900/20 dark:border-gray-700 max-h-[90vh]">
                                <button
                                    onClick={closeModal}
                                    className="absolute text-blue-900 top-4 right-4 dark:text-white hover:text-blue-700"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>

                                <div className="text-center">
                                    {!quizCompleted ? (
                                        <>
                                            <h3 className="mb-4 text-xl font-semibold text-blue-900 dark:text-white">
                                                Question {currentQuestion + 1} of {quizQuestions.length}
                                            </h3>
                                            <p className="mb-2 text-lg text-blue-900 dark:text-white">
                                                {quizQuestions[currentQuestion].question}
                                            </p>
                                            <p className="mb-6 text-blue-900/80 dark:text-gray-200">
                                                {quizQuestions[currentQuestion].description}
                                            </p>
                                            <div className="flex justify-center gap-4">
                                                {quizQuestions[currentQuestion].options.map((option, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => onAnswerSubmit(option)}
                                                        className="px-6 py-2 text-white transition-colors duration-300 bg-blue-900 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900/50"
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="space-y-8">
                                            <h3 className="text-2xl font-bold text-blue-900 dark:text-white">
                                                Quiz Results
                                            </h3>
                                            
                                            {/* Score Overview */}
                                            <div className="p-6 text-left bg-blue-50 dark:bg-gray-700 rounded-xl">
                                                <div className="flex items-center justify-between mb-4">
                                                    <p className="text-3xl font-bold text-blue-900 dark:text-white">
                                                        Score: {getQuizResults().score} / {getQuizResults().totalQuestions}
                                                    </p>
                                                    <p className="text-2xl font-semibold text-blue-900 dark:text-white">
                                                        {getQuizResults().percentage}%
                                                    </p>
                                                </div>
                                                <div className="w-full h-3 mb-4 bg-blue-200 rounded-full dark:bg-gray-600">
                                                    <div 
                                                        className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
                                                        style={{ width: `${getQuizResults().percentage}%` }}
                                                    />
                                                </div>
                                                <p className="text-lg text-blue-900/80 dark:text-gray-200">
                                                    {getQuizResults().feedback}
                                                </p>
                                            </div>

                                            {/* Detailed Breakdown */}
                                            <div className="px-4 py-6 space-y-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                                <h4 className="mb-4 text-lg font-semibold text-blue-900 dark:text-white">
                                                    Detailed Breakdown
                                                </h4>
                                                {getQuizResults().answerBreakdown.map((item, index) => (
                                                    <div 
                                                        key={index}
                                                        className="p-4 transition-colors bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                                                    >
                                                        <div className="flex items-start justify-between gap-4">
                                                            <div>
                                                                <p className="font-medium text-blue-900 dark:text-white">
                                                                    {item.question}
                                                                </p>
                                                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                                    {item.description}
                                                                </p>
                                                            </div>
                                                            <div className={`px-3 py-1 text-sm font-medium rounded-full ${
                                                                item.isCorrect
                                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                                            }`}>
                                                                {item.isCorrect ? 'Correct' : 'Incorrect'}
                                                            </div>
                                                        </div>
                                                        {!item.isCorrect && (
                                                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                                                Correct answer: <span className="font-medium text-blue-600 dark:text-blue-400">{item.correctAnswer}</span>
                                                            </p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex justify-center gap-4">
                                                <button
                                                    onClick={handleResetQuiz}
                                                    className="px-6 py-2 text-white transition-colors duration-300 bg-blue-900 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900/50"
                                                >
                                                    Try Again
                                                </button>
                                                <button
                                                    onClick={closeModal}
                                                    className="px-6 py-2 text-blue-900 transition-colors duration-300 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-900/50 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600"
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};

export default PhishingAwarenessQuiz;