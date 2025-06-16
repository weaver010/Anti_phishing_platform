import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup'; // Make sure: npm install react-countup

// Phishing stats with raw data
const statsData = [
    { number: 3400000000, display: '3.4B', label: 'Phishing emails blast out daily' },
    { number: 94, display: '94%', label: 'Orgs hit by phishing in 2023' },
    { number: 36, display: '36%', label: 'Breaches tied to phishing hooks' },
    { number: 20, display: '1 in 5', label: 'Employees biting the bait yearly' },
    { number: 4910000, display: '$4.91M', label: 'Average cost of a phishing sting' },
];

const PhishingStats = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, threshold: 0.5 });

    // Animation variants to match other sections
    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <section 
            ref={ref}
            className="w-full py-16 bg-gray-900 text-blue-900 px-4 relative overflow-hidden"
        >
            {/* Grid Background */}
            <div 
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #1e3a8a 1px, transparent 1px),
                        linear-gradient(to bottom, #1e3a8a 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Content */}
            <motion.div
                className="max-w-5xl mx-auto relative z-10"
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={sectionVariants}
            >
                <div className="text-center mb-12">
                    <h2 className="text-5xl md:text-6xl font-extrabold text-white relative inline-block">
                        Phishing: The Raw Stats
                        <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-blue-900/30 rounded-full"></span>
                    </h2>
                    <p className="mt-6 text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
                        Unmasking the scale of cyber traps
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                    {statsData.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="bg-gray-800 border border-blue-900/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                            variants={cardVariants}
                        >
                            <div className="text-3xl font-bold text-blue-300">
                                {isInView ? (
                                    <CountUp
                                        start={0}
                                        end={stat.number}
                                        duration={2.5}
                                        formattingFn={() => stat.display}
                                        redraw={true}
                                    />
                                ) : (
                                    stat.display
                                )}
                            </div>
                            <p className="mt-2 text-sm text-gray-200">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                <p className="mt-10 text-center text-sm text-gray-400">
                    Intel from IBM, Verizon, APWG (2023-2025 vibes)
                </p>
            </motion.div>
        </section>
    );
};

export default PhishingStats;