import { motion } from "framer-motion";

const LatestPhishingTrends = () => {
    // Animation variants for the section
    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section
            id="phishing-trends"
            className="w-full px-4 py-16 text-blue-900 bg-white"
        >
            <motion.div
                className="max-w-5xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
            >
                {/* Header */}
                <div className="mb-12 text-center">
                    <h2 className="relative inline-block text-5xl font-extrabold text-blue-900 md:text-6xl">
                        Latest Phishing Trends
                        <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-blue-900/30 rounded-full"></span>
                    </h2>
                    <p className="max-w-3xl mx-auto mt-6 text-xl md:text-2xl text-blue-900/80">
                        Stay ahead of cybercriminals with the latest insights on phishing tactics and trends.
                    </p>
                </div>

                {/* Trends List */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Trend 1: AI-Powered Phishing Attacks */}
                    <motion.div
                        className="flex items-start p-6 space-x-4 border bg-blue-900/5 border-blue-900/20 rounded-xl"
                        variants={itemVariants}
                    >
                        <div className="flex-shrink-0 mt-1">
                            <svg
                                className="w-8 h-8 text-blue-900"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="mb-2 text-xl font-semibold text-blue-900">
                                AI-Powered Phishing Attacks
                            </h3>
                            <p className="text-blue-900/80">
                                Cybercriminals are leveraging artificial intelligence to craft highly personalized and convincing phishing emails, making them harder to detect. These attacks often mimic legitimate communication styles and exploit user data.
                            </p>
                        </div>
                    </motion.div>

                    {/* Trend 2: Smishing Surge (Unchanged Icon) */}
                    <motion.div
                        className="flex items-start p-6 space-x-4 border bg-blue-900/5 border-blue-900/20 rounded-xl"
                        variants={itemVariants}
                    >
                        <div className="flex-shrink-0 mt-1">
                            <svg
                                className="w-8 h-8 text-blue-900"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="mb-2 text-xl font-semibold text-blue-900">
                                Smishing Surge
                            </h3>
                            <p className="text-blue-900/80">
                                SMS-based phishing (smishing) is on the rise, with attackers sending urgent text messages pretending to be from banks, delivery services, or government agencies to trick users into clicking malicious links.
                            </p>
                        </div>
                    </motion.div>

                    {/* Trend 3: QR Code Phishing (Quishing) */}
                    <motion.div
                        className="flex items-start p-6 space-x-4 border bg-blue-900/5 border-blue-900/20 rounded-xl"
                        variants={itemVariants}
                    >
                        <div className="flex-shrink-0 mt-1">
                            <svg
                                className="w-8 h-8 text-blue-900"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4h6v6H4V4zm0 10h6v6H4v-6zm10-10h6v6h-6V4zm0 10h6v6h-6v-6zm-2 0h-2v-2h2v2zm-2 2h-2v2h2v-2zm4-2h2v2h-2v-2zm2 2h2v2h-2v-2z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="mb-2 text-xl font-semibold text-blue-900">
                                QR Code Phishing (Quishing)
                            </h3>
                            <p className="text-blue-900/80">
                                Phishing via QR codes is gaining traction. Scammers embed malicious links in QR codes found in emails, flyers, or public spaces, targeting users who scan them with mobile devices.
                            </p>
                        </div>
                    </motion.div>

                    {/* Trend 4: Social Media Targeting */}
                    <motion.div
                        className="flex items-start p-6 space-x-4 border bg-blue-900/5 border-blue-900/20 rounded-xl"
                        variants={itemVariants}
                    >
                        <div className="flex-shrink-0 mt-1">
                            <svg
                                className="w-8 h-8 text-blue-900"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="mb-2 text-xl font-semibold text-blue-900">
                                Social Media Targeting
                            </h3>
                            <p className="text-blue-900/80">
                                Social media platforms are increasingly exploited for phishing, with attackers impersonating brands or contacts to lure users into sharing credentials or downloading malware.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Call to Action */}
                <div className="mt-12 text-center">
                    <p className="text-lg text-blue-900/80">
                        Protect yourself by staying informed. Check back regularly for updates on emerging threats.
                    </p>
                </div>
            </motion.div>
        </section>
    );
};

export default LatestPhishingTrends;