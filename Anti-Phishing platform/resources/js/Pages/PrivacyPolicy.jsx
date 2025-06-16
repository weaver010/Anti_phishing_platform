import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function PrivacyPolicy() {
    return (
        <>
            <Head title="Privacy Policy" />
            <div className="min-h-screen bg-slate-50">
                <Navbar />

                {/* Hero Section */}
                <div className="pb-16 pt-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                    <div className="max-w-4xl px-6 mx-auto lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-light tracking-tight text-white lg:text-5xl">
                                Privacy Policy
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
                                        "Information We Collect",
                                        "How We Use Your Information",
                                        "Information Sharing",
                                        "Data Security",
                                        "Data Retention",
                                        "Your Privacy Rights",
                                        "Third-Party Services",
                                        "Children's Privacy",
                                        "Policy Changes",
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
                                            At <strong className="font-semibold text-slate-900">Secura (AntiPhishing)</strong>, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our anti-phishing services. Please read this privacy policy carefully to understand our practices regarding your personal data.
                                        </p>
                                    </div>
                                </section>

                                {/* Information We Collect */}
                                <section className="prose-slate max-w-none">
                                    <div className="flex items-center mb-6">
                                        <span className="px-2 py-1 mr-4 font-mono text-xs rounded text-slate-400 bg-slate-100">02</span>
                                        <h2 className="text-2xl font-semibold text-slate-900">Information We Collect</h2>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="p-6 bg-white border border-slate-200/50 rounded-xl">
                                            <h3 className="flex items-center mb-4 text-xl font-medium text-slate-900">
                                                <span className="w-2 h-2 mr-3 rounded-full bg-cyan-500"></span>
                                                Personal Information
                                            </h3>
                                            <p className="mb-4 leading-relaxed text-slate-700">
                                                We may collect personal information that you voluntarily provide to us when you:
                                            </p>
                                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                {[
                                                    "Register for an account",
                                                    "Contact us through our contact forms",
                                                    "Subscribe to our newsletter or updates",
                                                    "Participate in surveys or feedback forms"
                                                ].map((item, index) => (
                                                    <div key={index} className="flex items-center text-slate-600">
                                                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-3"></div>
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="p-4 mt-4 text-sm leading-relaxed rounded-lg text-slate-700 bg-slate-50">
                                                <strong>Note:</strong> This information may include your name, email address, phone number, and any other information you choose to provide.
                                            </p>
                                        </div>

                                        <div className="p-6 bg-white border border-slate-200/50 rounded-xl">
                                            <h3 className="flex items-center mb-4 text-xl font-medium text-slate-900">
                                                <span className="w-2 h-2 mr-3 rounded-full bg-cyan-500"></span>
                                                Usage Information
                                            </h3>
                                            <p className="mb-4 leading-relaxed text-slate-700">
                                                We automatically collect certain information about your device and usage of our services, including:
                                            </p>
                                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                {[
                                                    "IP address and location data",
                                                    "Browser type and version",
                                                    "Operating system information",
                                                    "Pages visited and time spent on our website",
                                                    "URLs submitted for scanning (anonymized)",
                                                    "Files uploaded for malware detection (processed securely)"
                                                ].map((item, index) => (
                                                    <div key={index} className="flex items-center text-slate-600">
                                                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-3"></div>
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="p-6 bg-white border border-slate-200/50 rounded-xl">
                                            <h3 className="flex items-center mb-4 text-xl font-medium text-slate-900">
                                                <span className="w-2 h-2 mr-3 rounded-full bg-cyan-500"></span>
                                                Cookies and Tracking Technologies
                                            </h3>
                                            <p className="leading-relaxed text-slate-700">
                                                We use cookies, web beacons, and similar tracking technologies to enhance your experience on our website. These technologies help us remember your preferences, analyze website traffic, and improve our services.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                {/* How We Use Your Information */}
                                <section className="prose-slate max-w-none">
                                    <div className="flex items-center mb-6">
                                        <span className="px-2 py-1 mr-4 font-mono text-xs rounded text-slate-400 bg-slate-100">03</span>
                                        <h2 className="text-2xl font-semibold text-slate-900">How We Use Your Information</h2>
                                    </div>
                                    <p className="mb-6 leading-relaxed text-slate-700">
                                        We use the information we collect for the following purposes:
                                    </p>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {[
                                            "To provide and maintain our anti-phishing services",
                                            "To process URL scans and malware detection requests",
                                            "To communicate with you about our services",
                                            "To send you important updates and security notifications",
                                            "To improve our website and services",
                                            "To analyze usage patterns and optimize performance",
                                            "To prevent fraud and enhance security",
                                            "To comply with legal obligations"
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-start p-4 rounded-lg bg-slate-50/50">
                                                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                                <span className="text-slate-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Information Sharing */}
                                <section className="prose-slate max-w-none">
                                    <div className="flex items-center mb-6">
                                        <span className="px-2 py-1 mr-4 font-mono text-xs rounded text-slate-400 bg-slate-100">04</span>
                                        <h2 className="text-2xl font-semibold text-slate-900">Information Sharing and Disclosure</h2>
                                    </div>
                                    <div className="p-6 mb-6 border bg-amber-50 border-amber-200 rounded-xl">
                                        <p className="font-medium leading-relaxed text-slate-700">
                                            We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { title: "Service Providers", desc: "We may share information with trusted third-party service providers who assist us in operating our website and providing our services" },
                                            { title: "Legal Requirements", desc: "We may disclose information when required by law or to protect our rights, property, or safety" },
                                            { title: "Business Transfers", desc: "In the event of a merger, acquisition, or sale of assets, your information may be transferred" },
                                            { title: "Consent", desc: "We may share information with your explicit consent" }
                                        ].map((item, index) => (
                                            <div key={index} className="p-5 border rounded-lg border-slate-200/50">
                                                <h4 className="mb-2 font-semibold text-slate-900">{item.title}</h4>
                                                <p className="text-sm leading-relaxed text-slate-700">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Data Security */}
                                <section className="prose-slate max-w-none">
                                    <div className="flex items-center mb-6">
                                        <span className="px-2 py-1 mr-4 font-mono text-xs rounded text-slate-400 bg-slate-100">05</span>
                                        <h2 className="text-2xl font-semibold text-slate-900">Data Security</h2>
                                    </div>
                                    <div className="p-6 border border-green-200 bg-green-50 rounded-xl">
                                        <p className="leading-relaxed text-slate-700">
                                            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, access controls, and regular security assessments. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                                        </p>
                                    </div>
                                </section>

                                {/* Data Retention */}
                                <section className="prose-slate max-w-none">
                                    <div className="flex items-center mb-6">
                                        <span className="px-2 py-1 mr-4 font-mono text-xs rounded text-slate-400 bg-slate-100">06</span>
                                        <h2 className="text-2xl font-semibold text-slate-900">Data Retention</h2>
                                    </div>
                                    <p className="p-6 leading-relaxed text-slate-700 bg-slate-50/50 rounded-xl">
                                        We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Scan results and uploaded files are automatically deleted after a specified period to ensure your privacy and security.
                                    </p>
                                </section>

                                {/* Your Rights */}
                                <section className="prose-slate max-w-none">
                                    <div className="flex items-center mb-6">
                                        <span className="px-2 py-1 mr-4 font-mono text-xs rounded text-slate-400 bg-slate-100">07</span>
                                        <h2 className="text-2xl font-semibold text-slate-900">Your Privacy Rights</h2>
                                    </div>
                                    <p className="mb-6 leading-relaxed text-slate-700">
                                        Depending on your location, you may have the following rights regarding your personal information:
                                    </p>
                                    <div className="grid grid-cols-1 gap-3 mb-6 md:grid-cols-2">
                                        {[
                                            "Right to access your personal information",
                                            "Right to correct inaccurate or incomplete information",
                                            "Right to delete your personal information",
                                            "Right to restrict or object to processing",
                                            "Right to data portability",
                                            "Right to withdraw consent"
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center p-3 rounded-lg bg-blue-50/50">
                                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                                                <span className="text-sm text-slate-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-4 border border-blue-200 bg-blue-50 rounded-xl">
                                        <p className="text-sm leading-relaxed text-slate-700">
                                            To exercise these rights, please contact us using the information provided in the "Contact Information" section below.
                                        </p>
                                    </div>
                                </section>

                                {/* Remaining sections with consistent styling */}
                                {[
                                    {
                                        number: "08",
                                        title: "Third-Party Services",
                                        content: "Our services may integrate with third-party APIs and services (such as VirusTotal) to provide comprehensive security analysis. These third parties have their own privacy policies, and we encourage you to review them. We are not responsible for the privacy practices of these third-party services."
                                    },
                                    {
                                        number: "09",
                                        title: "Children's Privacy",
                                        content: "Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately."
                                    },
                                    {
                                        number: "10",
                                        title: "Changes to This Privacy Policy",
                                        content: "We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the \"Last Updated\" date."
                                    }
                                ].map((section, index) => (
                                    <section key={index} className="prose-slate max-w-none">
                                        <div className="flex items-center mb-6">
                                            <span className="px-2 py-1 mr-4 font-mono text-xs rounded text-slate-400 bg-slate-100">{section.number}</span>
                                            <h2 className="text-2xl font-semibold text-slate-900">{section.title}</h2>
                                        </div>
                                        <p className="p-6 leading-relaxed text-slate-700 bg-slate-50/50 rounded-xl">
                                            {section.content}
                                        </p>
                                    </section>
                                ))}

                                {/* Contact Section */}
                                <section className="prose-slate max-w-none">
                                    <div className="flex items-center mb-6">
                                        <span className="px-2 py-1 mr-4 font-mono text-xs rounded text-slate-400 bg-slate-100">11</span>
                                        <h2 className="text-2xl font-semibold text-slate-900">Contact Information</h2>
                                    </div>
                                    <div className="p-6 border bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200 rounded-xl">
                                        <p className="leading-relaxed text-slate-700">
                                            If you have any questions about this Privacy Policy or our privacy practices, please{" "}
                                            <Link
                                                href={route('contact')}
                                                className="font-semibold underline text-cyan-700 hover:text-cyan-800 decoration-2 underline-offset-2"
                                            >
                                                Contact Us
                                            </Link>

                                            . We are committed to addressing your concerns and protecting your privacy.
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
                                        href="/terms"
                                        className="inline-flex items-center px-6 py-3 text-sm font-medium text-white rounded-lg bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                                    >
                                        Terms of Service →
                                    </Link>
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