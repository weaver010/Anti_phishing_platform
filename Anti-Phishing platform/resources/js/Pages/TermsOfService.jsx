import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function TermsOfService() {
    return (
        <>
            <Head title="Terms of Service" />
            <div className="min-h-screen bg-slate-50">
                <Navbar />
                
                {/* Hero Section */}
                <div className="pb-16 pt-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                    <div className="max-w-4xl px-6 mx-auto lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-light tracking-tight text-white lg:text-5xl">
                                Terms of Service
                            </h1>
                            <div className="w-24 h-px mx-auto mt-6 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                            <p className="mt-6 text-lg font-light text-slate-300">
                                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="px-6 py-20 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="overflow-hidden bg-white border shadow-sm border-slate-200/50 rounded-2xl">
                            
                            {/* Table of Contents */}
                            <div className="p-8 border-b bg-slate-50/50 border-slate-200/50">
                                <h2 className="mb-4 text-lg font-semibold text-slate-900">Table of Contents</h2>
                                <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
                                    {[
                                        "Introduction",
                                        "Acceptance of Terms",
                                        "Description of Service",
                                        "User Accounts",
                                        "Acceptable Use Policy",
                                        "Intellectual Property",
                                        "User Content",
                                        "Privacy & Data Protection",
                                        "Service Availability",
                                        "Disclaimers & Liability",
                                        "Indemnification",
                                        "Termination",
                                        "Governing Law",
                                        "Changes to Terms",
                                        "Contact Information"
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center cursor-pointer text-slate-600 hover:text-cyan-600">
                                            <span className="mr-3 font-mono text-xs text-slate-400">{String(index + 1).padStart(2, '0')}</span>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Content Sections */}
                            <div className="p-10 space-y-12 lg:p-12">
                                
                                {/* Introduction */}
                                <section className="prose-slate max-w-none">
                                    <div className="flex items-center mb-6">
                                        <span className="px-2 py-1 mr-4 font-mono text-xs rounded text-slate-400 bg-slate-100">01</span>
                                        <h2 className="text-2xl font-semibold text-slate-900">Introduction</h2>
                                    </div>
                                    <div className="py-4 pl-6 border-l-4 rounded-r-lg bg-slate-50/30 border-cyan-500">
                                        <p className="leading-relaxed text-slate-700">
                                            Welcome to <strong className="font-semibold text-slate-900">Secura (AntiPhishing)</strong>! These Terms of Service ("Terms") govern your use of our website, applications, and services (collectively, the "Service") operated by Secura. By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
                                        </p>
                                    </div>
                                </section>

                                {/* Acceptance of Terms */}
                                <section className="prose-slate max-w-none">
                                    <div className="flex items-center mb-6">
                                        <span className="px-2 py-1 mr-4 font-mono text-xs rounded text-slate-400 bg-slate-100">02</span>
                                        <h2 className="text-2xl font-semibold text-slate-900">Acceptance of Terms</h2>
                                    </div>
                                    <div className="p-6 border bg-amber-50 border-amber-200 rounded-xl">
                                        <p className="leading-relaxed text-slate-700">
                                            By creating an account, accessing, or using our Service, you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. You also represent that you have the legal authority to enter into these Terms on behalf of yourself or the organization you represent.
                                        </p>
                                    </div>
                                </section>

                                {/* Description of Service */}
                                <section className="prose-slate max-w-none">
                                    <div className="flex items-center mb-6">
                                        <span className="px-2 py-1 mr-4 font-mono text-xs rounded text-slate-400 bg-slate-100">03</span>
                                        <h2 className="text-2xl font-semibold text-slate-900">Description of Service</h2>
                                    </div>
                                    <p className="mb-6 leading-relaxed text-slate-700">
                                        Secura provides comprehensive anti-phishing and cybersecurity services, including but not limited to:
                                    </p>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {[
                                            "URL scanning and phishing detection",
                                            "Malware detection and file analysis",
                                            "Security awareness training and education",
                                            "Phishing simulation and testing",
                                            "Real-time threat intelligence and alerts",
                                            "Security reporting and analytics"
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-start p-4 rounded-lg bg-slate-50/50">
                                                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                                <span className="text-slate-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* User Accounts and Registration */}
                                <section className="prose-slate max-w-none">
                                    <div className="flex items-center mb-6">
                                        <span className="px-2 py-1 mr-4 font-mono text-xs rounded text-slate-400 bg-slate-100">04</span>
                                        <h2 className="text-2xl font-semibold text-slate-900">User Accounts and Registration</h2>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            "To access certain features of our Service, you may be required to register for an account. When you create an account, you must provide accurate, complete, and current information.",
                                            "You are responsible for safeguarding your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account or any other breach of security.",
                                            "We reserve the right to refuse service, terminate accounts, or cancel orders at our sole discretion."
                                        ].map((text, index) => (
                                            <div key={index} className="p-5 border rounded-lg border-slate-200/50">
                                                <div className="flex items-start">
                                                    <div className="flex-shrink-0 w-2 h-2 mt-2 mr-3 bg-blue-500 rounded-full"></div>
                                                    <p className="leading-relaxed text-slate-700">{text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Acceptable Use Policy */}
                                <section className="prose-slate max-w-none">
                                    <div className="flex items-center mb-6">
                                        <span className="px-2 py-1 mr-4 font-mono text-xs rounded text-slate-400 bg-slate-100">05</span>
                                        <h2 className="text-2xl font-semibold text-slate-900">Acceptable Use Policy</h2>
                                    </div>
                                    <div className="p-6 mb-6 border border-red-200 bg-red-50 rounded-xl">
                                        <p className="font-medium leading-relaxed text-slate-700">
                                            You agree to use our Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            "To violate any applicable local, state, national, or international law or regulation",
                                            "To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service",
                                            "To attempt to gain unauthorized access to any portion of the Service or any other systems or networks",
                                            "To upload, post, or transmit any content that contains viruses, malware, or other harmful code",
                                            "To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity",
                                            "To use the Service for any commercial purpose without our express written consent"
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-start p-4 border border-red-100 rounded-lg bg-red-50/50">
                                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                                <span className="text-sm text-slate-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Intellectual Property Rights */}
                                <section className="prose-slate max-w-none">
                                    <div className="flex items-center mb-6">
                                        <span className="px-2 py-1 mr-4 font-mono text-xs rounded text-slate-400 bg-slate-100">06</span>
                                        <h2 className="text-2xl font-semibold text-slate-900">Intellectual Property Rights</h2>
                                    </div>
                                    <div className="p-6 border border-purple-200 bg-purple-50 rounded-xl">
                                        <p className="leading-relaxed text-slate-700">
                                            The Service and its original content, features, and functionality are and will remain the exclusive property of Secura and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
                                        </p>
                                    </div>
                                </section>

                                {/* User Content */}
                                <section className="prose-slate max-w-none">
                                    <div className="flex items-center mb-6">
                                        <span className="px-2 py-1 mr-4 font-mono text-xs rounded text-slate-400 bg-slate-100">07</span>
                                        <h2 className="text-2xl font-semibold text-slate-900">User Content</h2>
                                    </div>
                                    <div className="p-6 border border-indigo-200 bg-indigo-50 rounded-xl">
                                        <p className="leading-relaxed text-slate-700">
                                            Our Service may allow you to submit, upload, or share content such as URLs for scanning, files for analysis, or feedback. You retain ownership of any intellectual property rights that you hold in that content. By submitting content to our Service, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute such content solely for the purpose of providing our services.
                                        </p>
                                    </div>
                                </section>

                                {/* Privacy and Data Protection */}
                                <section className="prose-slate max-w-none">
                                    <div className="flex items-center mb-6">
                                        <span className="px-2 py-1 mr-4 font-mono text-xs rounded text-slate-400 bg-slate-100">08</span>
                                        <h2 className="text-2xl font-semibold text-slate-900">Privacy and Data Protection</h2>
                                    </div>
                                    <div className="p-6 border border-green-200 bg-green-50 rounded-xl">
                                        <p className="leading-relaxed text-slate-700">
                                            Your privacy is important to us. Please review our{" "}
                                            <Link
                                                href="/privacy"
                                                className="font-semibold text-green-700 underline hover:text-green-800 decoration-2 underline-offset-2"
                                            >
                                                Privacy Policy
                                            </Link>
                                            , which also governs your use of the Service, to understand our practices regarding the collection, use, and disclosure of your personal information.
                                        </p>
                                    </div>
                                </section>

                                {/* Service Availability */}
                                <section className="prose-slate max-w-none">
                                    <div className="flex items-center mb-6">
                                        <span className="px-2 py-1 mr-4 font-mono text-xs rounded text-slate-400 bg-slate-100">09</span>
                                        <h2 className="text-2xl font-semibold text-slate-900">Service Availability</h2>
                                    </div>
                                    <p className="p-6 leading-relaxed text-slate-700 bg-slate-50/50 rounded-xl">
                                        We strive to provide reliable and continuous service, but we do not guarantee that the Service will be available at all times. The Service may be subject to limitations, delays, and other problems inherent in the use of the internet and electronic communications. We may suspend or restrict access to the Service for maintenance, updates, or other operational reasons.
                                    </p>
                                </section>

                                {/* Disclaimers and Limitation of Liability */}
                                <section className="prose-slate max-w-none">
                                    <div className="flex items-center mb-6">
                                        <span className="px-2 py-1 mr-4 font-mono text-xs rounded text-slate-400 bg-slate-100">10</span>
                                        <h2 className="text-2xl font-semibold text-slate-900">Disclaimers and Limitation of Liability</h2>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="p-6 border border-orange-200 bg-orange-50 rounded-xl">
                                            <h3 className="flex items-center mb-3 font-semibold text-slate-900">
                                                <span className="w-2 h-2 mr-3 bg-orange-500 rounded-full"></span>
                                                Disclaimer
                                            </h3>
                                            <p className="leading-relaxed text-slate-700">
                                                The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or warranties of any kind, express or implied, regarding the use or results of the Service in terms of correctness, accuracy, reliability, or otherwise.
                                            </p>
                                        </div>
                                        <div className="p-6 border border-red-200 bg-red-50 rounded-xl">
                                            <h3 className="flex items-center mb-3 font-semibold text-slate-900">
                                                <span className="w-2 h-2 mr-3 bg-red-500 rounded-full"></span>
                                                Limitation of Liability
                                            </h3>
                                            <p className="leading-relaxed text-slate-700">
                                                To the fullest extent permitted by applicable law, in no event shall Secura be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                {/* Remaining sections with consistent styling */}
                                {[
                                    {
                                        number: "11",
                                        title: "Indemnification",
                                        content: "You agree to defend, indemnify, and hold harmless Secura and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).",
                                        color: "yellow"
                                    },
                                    {
                                        number: "12",
                                        title: "Termination",
                                        content: "We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms. If you wish to terminate your account, you may simply discontinue using the Service.",
                                        color: "red"
                                    },
                                    {
                                        number: "13",
                                        title: "Governing Law",
                                        content: "These Terms shall be interpreted and governed by the laws of the jurisdiction in which Secura operates, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.",
                                        color: "blue"
                                    },
                                    {
                                        number: "14",
                                        title: "Changes to Terms",
                                        content: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.",
                                        color: "purple"
                                    }
                                ].map((section, index) => (
                                    <section key={index} className="prose-slate max-w-none">
                                        <div className="flex items-center mb-6">
                                            <span className="px-2 py-1 mr-4 font-mono text-xs rounded text-slate-400 bg-slate-100">{section.number}</span>
                                            <h2 className="text-2xl font-semibold text-slate-900">{section.title}</h2>
                                        </div>
                                        <div className={`bg-${section.color}-50 border border-${section.color}-200 rounded-xl p-6`}>
                                            <p className="leading-relaxed text-slate-700">
                                                {section.content}
                                            </p>
                                        </div>
                                    </section>
                                ))}

                                {/* Contact Information */}
                                <section className="prose-slate max-w-none">
                                    <div className="flex items-center mb-6">
                                        <span className="px-2 py-1 mr-4 font-mono text-xs rounded text-slate-400 bg-slate-100">15</span>
                                        <h2 className="text-2xl font-semibold text-slate-900">Contact Information</h2>
                                    </div>
                                    <div className="p-6 border bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200 rounded-xl">
                                        <p className="leading-relaxed text-slate-700">
                                            If you have any questions about these Terms of Service, please{" "}
                                            <Link
                                                href="/contact"
                                                className="font-semibold underline text-cyan-700 hover:text-cyan-800 decoration-2 underline-offset-2"
                                            >
                                                contact us
                                            </Link>
                                            . We are here to help and address any concerns you may have.
                                        </p>
                                    </div>
                                </section>
                            </div>

                            {/* Footer Navigation */}
                            <div className="p-8 border-t bg-slate-50/50 border-slate-200/50">
                                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8">
                                    <Link
                                        href="/"
                                        className="inline-flex items-center px-6 py-3 text-sm font-medium bg-white border rounded-lg text-slate-700 border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                                    >
                                        ← Back to Home
                                    </Link>
                                    <div className="hidden w-px h-6 sm:block bg-slate-300"></div>
                                    <Link
                                        href="/privacy"
                                        className="inline-flex items-center px-6 py-3 text-sm font-medium text-white rounded-lg bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                                    >
                                        Privacy Policy →
                                    </Link>
                                </div>
                                
                                {/* Additional Footer Info */}
                                <div className="pt-6 mt-6 text-center border-t border-slate-200/50">
                                    <p className="text-xs text-slate-500">
                                        By using our services, you acknowledge that you have read and understood these terms.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Footer />
            </div>
        </>
    );
}