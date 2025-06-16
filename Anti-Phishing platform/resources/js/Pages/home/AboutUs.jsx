import React from 'react';

function AboutUs() {
    return (
        <section
            id="about"
            className="px-4 py-16 sm:px-6 lg:py-24 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
        >
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col items-center gap-12 lg:flex-row">
                    {/* Image Section */}
                    <div className="w-full lg:w-5/12">
                        <div className="relative overflow-hidden border shadow-lg rounded-2xl border-slate-200 dark:border-slate-700">
                            <img
                                src="/assets/about.jpg"
                                alt="Phishing protection services interface"
                                className="object-cover w-full h-auto aspect-square"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full space-y-8 lg:w-7/12">
                        <header className="space-y-4">
                            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
                                Ultimate Phishing Defense
                            </h2>
                            <div className="w-20 h-1 bg-blue-500 rounded-full"></div>
                        </header>

                        <p className="max-w-2xl text-lg text-slate-700 dark:text-slate-300">
                            Harness the power of AI-driven security and immersive training to shield your digital world from phishing threats.
                        </p>

                        <div className="grid gap-6">
                            {[
                                {
                                    icon: (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                        />
                                    ),
                                    title: "Real-Time Threat Analysis",
                                    text: "AI-powered scanning with instant threat neutralization across all channels.",
                                },
                                {
                                    icon: (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    ),
                                    title: "Adaptive Learning Hub",
                                    text: "Gamified training with real-world simulations to master phishing defense.",
                                },
                                {
                                    icon: (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    ),
                                    title: "Cyber Shield Extension",
                                    text: "Seamless browser protection with zero performance impact.",
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-5 p-6 transition-colors bg-white border shadow-sm dark:bg-slate-800 rounded-xl border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800"
                                >
                                    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 bg-blue-100 rounded-lg dark:bg-blue-900">
                                        <svg
                                            className="w-5 h-5 text-blue-600 dark:text-blue-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            {item.icon}
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-lg font-medium text-slate-900 dark:text-white">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutUs;