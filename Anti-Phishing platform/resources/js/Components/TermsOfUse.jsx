import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function TermsOfUse() {
    return (
        <>
            <Head title="Terms of Use" />
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col pt-10">
                <Navbar />
                <div className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl p-8 transform transition-all duration-300 hover:shadow-3xl">
                        {/* Header */}
                        <div className="text-center mb-10">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-900">
                                Terms of Use
                            </h1>
                            <p className="mt-4 text-lg text-gray-600">
                                Last Updated: March 13, 2025
                            </p>
                        </div>

                        {/* Content */}
                        <div className="space-y-8 text-gray-700">
                            {/* Introduction */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Introduction</h2>
                                <p className="text-sm leading-relaxed">
                                    Welcome to AntiPhishing! By accessing or using our services, you agree to be bound by these Terms of Use ("Terms"). These Terms govern your use of our website, tools, and any related services provided by AntiPhishing. If you do not agree to these Terms, please refrain from using our services.
                                </p>
                            </section>

                            {/* Acceptance of Terms */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Acceptance of Terms</h2>
                                <p className="text-sm leading-relaxed">
                                    By creating an account or using our platform, you confirm that you have read, understood, and accepted these Terms. We reserve the right to update or modify these Terms at any time, and such changes will be effective upon posting on this page.
                                </p>
                            </section>

                            {/* Use of Services */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Use of Services</h2>
                                <p className="text-sm leading-relaxed">
                                    AntiPhishing provides tools to protect users from phishing attacks. You agree to use our services only for lawful purposes and in a manner consistent with all applicable laws and regulations. You may not use our services to engage in any harmful, fraudulent, or illegal activities.
                                </p>
                            </section>

                            {/* User Responsibilities */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">4. User Responsibilities</h2>
                                <p className="text-sm leading-relaxed">
                                    You are responsible for maintaining the confidentiality of your account credentials. Any activity conducted under your account is your responsibility. Please notify us immediately if you suspect unauthorized use of your account.
                                </p>
                            </section>

                            {/* Limitation of Liability */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Limitation of Liability</h2>
                                <p className="text-sm leading-relaxed">
                                    AntiPhishing strives to provide accurate and reliable services, but we do not guarantee that our tools will be error-free or uninterrupted. To the fullest extent permitted by law, we disclaim liability for any damages arising from your use of our services.
                                </p>
                            </section>

                            {/* Termination */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Termination</h2>
                                <p className="text-sm leading-relaxed">
                                    We reserve the right to suspend or terminate your access to our services at our discretion, with or without notice, if you violate these Terms or engage in any activity we deem inappropriate.
                                </p>
                            </section>

                            {/* Contact Us */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Contact Us</h2>
                                <p className="text-sm leading-relaxed">
                                    If you have any questions about these Terms, please reach out to us at{" "}
                                    <Link
                                        href="/contact"
                                        className="text-cyan-600 hover:text-cyan-800 underline font-medium transition-colors duration-200"
                                    >
                                        Contact Us
                                    </Link>
                                    .
                                </p>
                            </section>
                        </div>

                        {/* Back to Register */}
                        <div className="mt-10 text-center">
                            <Link
                                href={route('register')}
                                className="text-sm text-cyan-600 hover:text-cyan-800 underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded-md"
                            >
                                Back to Register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}