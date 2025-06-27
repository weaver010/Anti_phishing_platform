import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { memo, useState } from "react";

//main services component
// Memoize the Services component to prevent unnecessary re-renders
const Services = memo(() => {
    // State for filtering categories
    const [activeFilter, setActiveFilter] = useState("all");
    
    const servicesData = [
        {
            id: 1,
            title: "URL Scanning",
            description: "Analyze URLs in real-time to neutralize phishing and malicious threats with precision.",
            image: "/assets/url.jpg",
            link: "/url-check",
            category: "protection",
            icon: "shield-check"
        },
        {
            id: 2,
            title: "Phishing Email Detection",
            description: "Advanced algorithms detect phishing emails, safeguarding users from deceptive scams.",
            image: "/assets/email.jpg",
            link: "/email-check",
            category: "protection",
            icon: "mail-warning"
        },
        {
            id: 3,
            title: "Malware Detection",
            description: "Identify and eliminate malware threats embedded in websites or files instantly.",
            image: "/assets/malware.jpg",
            link: "/malware-detection",
            category: "protection",
            icon: "virus"
        },
        {
            id: 4,
            title: "Real-Time Alerts",
            description: "Instant notifications of phishing attempts, empowering rapid threat response.",
            image: "/assets/alert.jpg",
            link: "/firefox-extension",
            category: "monitoring",
            icon: "bell"
        },
        {
            id: 5,
            title: "Phishing Simulation",
            description: "Simulate real-world phishing attacks to train and fortify your team's defenses.",
            image: "/assets/simulation.jpg",
            link: "/simulation",
            category: "training",
            icon: "users"
        },
        {
            id: 6,
            title: "Training Content",
            description: "Cutting-edge resources to educate and empower users against phishing threats.",
            image: "/assets/training.jpg",
            link: "/training",
            category: "training",
            icon: "graduation-cap"
        },
    ];

    // Filter categories for the filter bar
    const categories = [
        { id: "all", label: "All Services" },
        { id: "protection", label: "Protection" },
        { id: "monitoring", label: "Monitoring" },
        { id: "training", label: "Training" }
    ];

    // Filter services based on active filter
    const filteredServices = activeFilter === "all" 
        ? servicesData 
        : servicesData.filter(service => service.category === activeFilter);

    // Optimized scrolling animation
    const cardVariants = {
        offscreen: { y: 30, opacity: 0 },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: "tween",
                ease: "easeOut",
                duration: 0.4,
            }
        }
    };

    // Container variants for staggered children animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <section id="services" className="relative py-24 overflow-hidden bg-gradient-to-b from-blue-50 via-white to-blue-50">
            {/* Optimized Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300/10 rounded-full blur-2xl transform-gpu animate-[orbit_15s_infinite_linear]"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-300/10 rounded-full blur-2xl transform-gpu animate-[orbit_20s_infinite_linear_reverse]"></div>
                <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-indigo-300/10 rounded-full blur-xl transform-gpu animate-[float_8s_infinite_ease-in-out]"></div>
                
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-grid-blue-100/[0.08] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"></div>
            </div>

            <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="mb-16 text-center"
                >
                    <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full">Cybersecurity Solutions</span>
                    <h2 className="relative mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl">
                        Enterprise-Grade Protection
                        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 w-24 h-1.5 bg-blue-600 rounded-full"></div>
                    </h2>
                    <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-600 md:text-xl">
                        Our comprehensive suite of security services protects your organization from 
                        evolving digital threats and sophisticated phishing attacks.
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveFilter(category.id)}
                            className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 transform-gpu hover:scale-105 ${
                                activeFilter === category.id
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </motion.div>

                {/* Services Grid */}
                <motion.div 
                    className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {filteredServices.map((service) => (
                        <motion.div
                            key={service.id}
                            variants={cardVariants}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="relative h-full service-card group will-change-transform perspective-1000"
                        >
                            <div className="relative h-full overflow-hidden transition-all duration-300 bg-white border shadow-lg rounded-2xl border-blue-100/30">
                                {/* Card Header with Image */}
                                <div className="relative overflow-hidden h-52">
                                    <img
                                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                        src={service.image}
                                        alt={service.title}
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    
                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 text-xs font-semibold text-white uppercase rounded-full bg-blue-600/80 backdrop-blur-sm">
                                            {service.category}
                                        </span>
                                    </div>
                                    
                                    {/* Title overlaying image */}
                                    <h3 className="absolute text-2xl font-bold text-white bottom-4 left-4 right-4">
                                        {service.title}
                                    </h3>
                                </div>
                                
                                {/* Card Content */}
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="flex items-center justify-center w-10 h-10 mr-3 text-blue-600 bg-blue-100 rounded-full">
                                            <ServiceIcon name={service.icon} />
                                        </div>
                                        <div className="h-0.5 flex-grow bg-gray-100"></div>
                                    </div>
                                    
                                    <p className="mb-6 leading-relaxed text-gray-600">
                                        {service.description}
                                    </p>
                                    
                                    {/* Enhanced CTA Button */}
                                    <Link
                                        href={service.link}
                                        className="relative inline-flex items-center justify-center w-full px-6 py-3 overflow-hidden font-semibold text-white transition-all duration-300 rounded-xl group/link"
                                    >
                                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-in-out bg-blue-800 transform-gpu"></span>
                                        <span className="absolute inset-0 w-full h-full transition-opacity duration-300 opacity-0 group-hover/link:opacity-100">
                                            <span className="absolute inset-0 w-0 h-full transition-all duration-500 ease-out bg-blue-600 group-hover/link:w-full"></span>
                                        </span>
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            Explore Service
                                            <svg
                                                className="w-5 h-5 transition-transform duration-300 group-hover/link:translate-x-1"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    </Link>
                                </div>
                                
                                {/* Creative Overlay Elements on Hover */}
                                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none group-hover:opacity-100">
                                    {/* Top left corner accent */}
                                    <div className="absolute w-12 h-12 transition-transform duration-300 ease-out transform -translate-x-full -translate-y-full border-t-4 border-l-4 border-blue-500 rounded-tl-lg -top-2 -left-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                                    
                                    {/* Bottom right corner accent */}
                                    <div className="absolute w-12 h-12 transition-transform duration-300 ease-out delay-75 transform translate-x-full translate-y-full border-b-4 border-r-4 border-blue-500 rounded-br-lg -bottom-2 -right-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                                    
                                    {/* Subtle glow effect */}
                                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-2xl shadow-glow"></div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Custom Animations and Styles */}
            <style>{`
                @keyframes orbit {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    100% { transform: translate(15px, 15px) rotate(360deg); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                
                .bg-grid-blue-100 {
                    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v1H0V0zm0 99h100v1H0v-1z' fill='%230ea5e9' fill-opacity='.1' fill-rule='evenodd'/%3E%3Cpath d='M0 0v100h1V0H0zm99 0v100h1V0h-1z' fill='%230ea5e9' fill-opacity='.1' fill-rule='evenodd'/%3E%3C/svg%3E");
                }
                
                .perspective-1000 {
                    perspective: 1000px;
                }
                
                .shadow-glow {
                    box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
                }
                
                /* Mouse follow effect for cards */
                .service-card {
                    transition: transform 0.2s ease;
                }
                
                .service-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1);
                }
                
                /* Add subtle pulse animation to icons on hover */
                .service-card:hover svg {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                
                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.1);
                    }
                }
            `}</style>
        </section>
    );
});

// Simple icon component
function ServiceIcon({ name }) {
    switch (name) {
        case "shield-check":
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            );
        case "mail-warning":
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            );
        case "virus":
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            );
        case "bell":
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9" />
                </svg>
            );
        case "users":
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            );
        case "graduation-cap":
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
            );
        default:
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
    }
}

// Add display name for better debugging
Services.displayName = "Services";

export default Services;