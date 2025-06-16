import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ContactUs = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        message: "",
    });

    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/contact", {
            preserveScroll: true,
            onSuccess: () => {
                setShowSuccess(true);
                reset();
                setTimeout(() => setShowSuccess(false), 4000);
            },
            onError: (err) => {
                setShowSuccess(false);
                console.log("Errors:", err);
            },
        });
    };

    // Animation variants
    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const formVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const floatVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            transition: { 
                duration: 0.5, 
                ease: "easeOut",
                type: "spring",
                stiffness: 100 
            } 
        },
        exit: { 
            opacity: 0, 
            y: 50, 
            scale: 0.95, 
            transition: { duration: 0.3, ease: "easeIn" } 
        },
    };

    return (
        <section
            id="contact"
            className="w-full min-h-screen bg-white text-blue-900 flex items-center justify-center px-4 py-16 relative"
        >
            <motion.div
                className="w-full max-w-5xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
            >
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-5xl md:text-6xl font-extrabold text-blue-900 relative inline-block">
                        Contact Us
                        <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-blue-900/30 rounded-full"></span>
                    </h2>
                    <p className="mt-6 text-xl md:text-2xl text-blue-900/80 max-w-3xl mx-auto">
                        Got a question or need help? Drop us a line—we’ll hit you back ASAP!
                    </p>
                </div>

                {/* Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="w-full bg-white border border-blue-900/20 rounded-2xl p-8 max-w-2xl mx-auto"
                    variants={formVariants}
                >
                    <div className="space-y-8">
                        {/* Name Field */}
                        <div>
                            <label className="block text-lg font-semibold text-blue-900 mb-2">
                                Your Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 bg-blue-900/5 border border-blue-900/30 rounded-lg text-blue-900 placeholder-blue-900/50 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900/50 transition-colors duration-300"
                                placeholder="Enter your full name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                required
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-lg font-semibold text-blue-900 mb-2">
                                Your Email
                            </label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 bg-blue-900/5 border border-blue-900/30 rounded-lg text-blue-900 placeholder-blue-900/50 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900/50 transition-colors duration-300"
                                placeholder="Enter your email address"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                required
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                            )}
                        </div>

                        {/* Message Field */}
                        <div>
                            <label className="block text-lg font-semibold text-blue-900 mb-2">
                                Message
                            </label>
                            <textarea
                                className="w-full px-4 py-3 bg-blue-900/5 border border-blue-900/30 rounded-lg text-blue-900 placeholder-blue-900/50 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900/50 transition-colors duration-300"
                                rows="6"
                                placeholder="Tell us how we can assist you..."
                                value={data.message}
                                onChange={(e) => setData("message", e.target.value)}
                                required
                            />
                            {errors.message && (
                                <p className="text-red-500 text-sm mt-2">{errors.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="px-10 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900/50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={processing}
                            >
                                {processing ? "Sending..." : "Send Message"}
                            </button>
                        </div>
                    </div>
                </motion.form>
            </motion.div>

            {/* Enhanced Darker Blue Floating Success Message with Gradient and Blur */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        className="fixed bottom-8 right-8 max-w-sm rounded-xl shadow-xl border border-blue-950/50 p-4 z-50 overflow-hidden backdrop-blur-sm"
                        style={{
                            background: 'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)', // Dark blue gradient
                        }}
                        variants={floatVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Success Indicator Bar */}
                        <div 
                            className="absolute top-0 left-0 h-1 bg-blue-400"
                            style={{
                                width: '100%',
                                animation: 'shrink 4s linear forwards'
                            }}
                        />
                        
                        {/* Content */}
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                                <svg
                                    className="w-6 h-6 text-blue-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-white">
                                    Message Submitted
                                </h4>
                                <p className="text-sm text-blue-200 mt-1">
                                    Thank you for your submission. Our team will respond to your inquiry shortly.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ContactUs;