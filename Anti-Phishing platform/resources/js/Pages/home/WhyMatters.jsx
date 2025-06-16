import React from 'react';
import { motion } from 'framer-motion';

// Data for "Why It Matters" with detailed descriptions
const mattersData = [
    {
        icon: (
            <svg className="text-blue-900 w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 1.857a5.002 5.002 0 009.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        title: 'Targets Everyone',
        description: 'Phishing doesn’t discriminate—whether you’re an individual checking emails or a massive corporation handling sensitive data, attackers are after you. No one’s off their radar.',
    },
    {
        icon: (
            <svg className="text-blue-900 w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.66 0 3-1.34 3-3V5a3 3 0 00-6 0v3c0 1.66 1.34 3 3 3zm-1 2h2v6H9v2h6v-2h-2v-6z" />
            </svg>
        ),
        title: 'Steals Data',
        description: 'One wrong click can hand over your passwords, financial details, or company secrets to cybercriminals. Phishing emails are designed to trick you into giving up what matters most.',
    },
    {
        icon: (
            <svg className="text-blue-900 w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: 'Costs Billions',
        description: 'Phishing attacks drain billions from economies annually—businesses lose revenue, individuals lose savings, and recovery costs pile up fast. It’s a global financial nightmare.',
    },
];

const WhyMatters = () => {
    // Animation variants
    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
                {/* Header with Accent Line */}
                <div className="mb-12 text-center">
                    <h2 className="relative inline-block text-5xl font-extrabold text-blue-900 md:text-6xl">
                        Why Phishing Matters
                        <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-blue-900/30 rounded-full"></span>
                    </h2>
                    <p className="max-w-3xl mx-auto mt-6 text-xl md:text-2xl text-blue-900/80">
                        Discover why phishing is a threat you can’t ignore in today’s digital world.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {mattersData.map((item, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center p-6 text-center transition-all duration-300 bg-white border shadow-lg border-blue-900/20 rounded-xl hover:shadow-xl"
                            variants={cardVariants}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="p-3 mb-4 rounded-full bg-blue-900/5">{item.icon}</div>
                            <h3 className="mb-2 text-xl font-semibold text-blue-900">{item.title}</h3>
                            <p className="leading-relaxed text-blue-900/80">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default WhyMatters;