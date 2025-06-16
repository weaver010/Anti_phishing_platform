// import { Link } from '@inertiajs/react';

// function Header({ auth }) {
//     return (
//         <div id="header" className="mx-auto lg:w-[90%] py-8 bg-gradient-to-b  min-h-screen flex items-center">
//             <div className="container grid items-center grid-cols-1 gap-10 px-6 mx-auto md:grid-cols-2 md:px-12">
//                 {/* Image Section */}
//                 <div className="flex justify-center order-first md:justify-end md:order-last">
//                     <div className="relative">
//                         <img
//                             src="/assets/header1.webp"
//                             alt="Security Header"
//                             className="object-cover h-auto max-w-full rounded-2xl"
//                         />
//                         {/* <div className="absolute w-20 h-20 bg-blue-600 rounded-full -bottom-4 -right-4 opacity-20 blur-xl"></div> */}
//                     </div>
//                 </div>

//                 {/* Text Section */}
//                 <div className="flex flex-col items-center order-last space-y-6 text-center header-info md:text-left md:items-start md:order-first">
//                     <h1 className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
//                         Stay <span className="text-blue-600">Safe</span>,<br />
//                         Stay <span className="text-blue-600">Secure</span>
//                     </h1>
//                     <p className="max-w-md text-lg text-gray-600">
//                         Protect yourself from phishing and cyber threats with our advanced security platform.
//                     </p>

//                     {/* Buttons */}
//                     <div className="flex flex-col justify-center w-full gap-4 sm:flex-row md:justify-start">
//                         <Link
//                             href={route('login')}
//                             className="inline-flex items-center justify-center gap-2 px-8 py-3 text-lg font-semibold text-white transition-all duration-300 transform bg-blue-600 shadow-md rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 hover:scale-105"
//                         >
//                             <svg
//                                 className="w-5 h-5"
//                                 fill="currentColor"
//                                 viewBox="0 0 20 20"
//                                 xmlns="http://www.w3.org/2000/svg"
//                             >
//                                 <path
//                                     fillRule="evenodd"
//                                     d="M10 2a8 8 0 00-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8a8 8 0 00-8-8zm0 12a4 4 0 100-8 4 4 0 000 8zm-1-5a1 1 0 112 0v2a1 1 0 11-2 0V9z"
//                                     clipRule="evenodd"
//                                 />
//                             </svg>
//                             Login Now
//                         </Link>
//                         <Link
//                             href={route('register')}
//                             className="inline-flex items-center justify-center gap-2 px-8 py-3 text-lg font-semibold text-blue-600 transition-all duration-300 transform bg-white border-2 border-blue-600 shadow-md rounded-xl hover:bg-blue-50 focus:ring-4 focus:ring-blue-300 hover:scale-105"
//                         >
//                             <svg
//                                 className="w-5 h-5"
//                                 fill="currentColor"
//                                 viewBox="0 0 20 20"
//                                 xmlns="http://www.w3.org/2000/svg"
//                             >
//                                 <path
//                                     fillRule="evenodd"
//                                     d="M10 2a8 8 0 00-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8a8 8 0 00-8-8zm0 12a4 4 0 100-8 4 4 0 000 8zm-1-5a1 1 0 112 0v2a1 1 0 11-2 0V9z"
//                                     clipRule="evenodd"
//                                 />
//                             </svg>
//                             Register
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Header;






import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/stores';
import { useEffect } from 'react';

function Header({ auth }) {
    // Zustand store
    const { user, isAuthenticated, setUser } = useAuthStore();

    // Sync Inertia auth with Zustand store
    useEffect(() => {
        if (auth?.user && (!user || user.id !== auth.user.id)) {
            setUser(auth.user);
        }
    }, [auth?.user, user, setUser]);

    // Use store data with fallback to props
    const currentUser = user || auth?.user;
    const fullName = currentUser?.name || "Guest";
    const userName = fullName.split(" ").slice(0, 2).join(" ");
    const isLoggedIn = isAuthenticated || auth?.user !== null;

    // Simplified Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const buttonVariants = {
        tap: { scale: 0.95 },
    };

    return (
        <motion.div
            id="header"
            className="relative flex items-center justify-center w-full min-h-screen py-16 overflow-hidden md:py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-blue-950"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Background Overlay for Depth */}
            <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />

            <div className="container relative z-10 px-6 mx-auto text-center md:px-12">

                {/* Welcome Message for Logged In Users */}
                {isLoggedIn && (
                    <div className="mb-8">
                        <p className="pt-8 text-lg font-medium text-cyan-300 md:pt-0">
                            Welcome back, <span className="font-semibold text-white">{userName}</span>
                        </p>
                    </div>
                )}

                {/* Header Content */}
                <div className="space-y-10">
                    {/* Subheading */}
                    <p className="pt-8 text-sm font-medium tracking-widest uppercase md:pt-0 md:text-lg text-cyan-400">
                        Advanced Cybersecurity Solutions
                    </p>

                    {/* Main Heading */}
                    <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                        Defend Your <span className="text-cyan-300">Digital Life</span><br />
                        With <span className="text-cyan-300">Secura</span>
                    </h1>

                    {/* Description */}
                    <p className="max-w-3xl mx-auto text-lg font-light leading-relaxed text-gray-300 md:text-xl">
                        Safeguard against phishing, malware, and cyber threats with our cutting-edge platform. Access expert-led training to stay ahead of attackers.
                    </p>

                    {/* Buttons - Show sign-in/up for guests, scan tools for logged in users */}
                    {!isLoggedIn ? (
                        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
                            <motion.div
                                variants={buttonVariants}
                                whileTap="tap"
                                className="w-full sm:w-auto"
                            >
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center justify-center w-full gap-3 px-12 py-4 text-lg font-semibold text-white transition-colors duration-300 rounded-full group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 sm:w-auto"
                                >
                                    <svg
                                        className="w-6 h-6 shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
                                        />
                                    </svg>
                                    <span>Sign In</span>
                                </Link>
                            </motion.div>
                            <motion.div
                                variants={buttonVariants}
                                whileTap="tap"
                                className="w-full sm:w-auto"
                            >
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center justify-center w-full gap-3 px-12 py-4 text-lg font-semibold transition-colors duration-300 bg-transparent border-2 rounded-full group text-cyan-300 border-cyan-300 hover:bg-cyan-300/20 sm:w-auto"
                                >
                                    <svg
                                        className="w-6 h-6 shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M18 9v3m0 0v3m0-3h-3m-3 0H9m3-3V6m0 12v-3"
                                        />
                                    </svg>
                                    <span>Sign Up</span>
                                </Link>
                            </motion.div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
                            {/* Quick URL Scan Button */}
                            <motion.div
                                variants={buttonVariants}
                                whileTap="tap"
                                className="w-full sm:w-auto"
                            >
                                <Link
                                    href={route('url.check')}
                                    className="inline-flex items-center justify-center w-full gap-3 px-12 py-4 text-lg font-semibold text-white transition-colors duration-300 rounded-full group bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 sm:w-auto"
                                >
                                    <svg
                                        className="w-6 h-6 shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                    <span>Quick URL Scan</span>
                                </Link>
                            </motion.div>

                            {/* Profile Button */}
                            <motion.div
                                variants={buttonVariants}
                                whileTap="tap"
                                className="w-full sm:w-auto"
                            >
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center justify-center w-full gap-3 px-12 py-4 text-lg font-semibold transition-colors duration-300 bg-transparent border-2 rounded-full group text-cyan-300 border-cyan-300 hover:bg-cyan-300/20 sm:w-auto"
                                >
                                    <svg
                                        className="w-6 h-6 shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                    <span>Profile</span>
                                </Link>
                            </motion.div>
                        </div>
                    )}

                    {/* Additional Text for Training */}
                    <p className="max-w-2xl mx-auto text-base italic text-gray-400 md:text-lg">
                        "Master cybersecurity with our expert-led training programs—available to all users."
                    </p>

                    {/* Trust Indicators */}
                    <div className="flex flex-col justify-center gap-6 mt-8 text-sm text-gray-400 sm:flex-row md:text-base">

                        <span className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 2a8 8 0 00-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8a8 8 0 00-8-8zm-1 11l-3-3 1.5-1.5L9 10l4-4 1.5 1.5L9 13z" />
                            </svg>
                            Trusted by 10,000+ Users
                        </span>
                        <span className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 2a8 8 0 00-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8a8 8 0 00-8-8zm-1 11l-3-3 1.5-1.5L9 10l4-4 1.5 1.5L9 13z" />
                            </svg>
                            99.9% Uptime Guarantee
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none bg-gradient-to-t from-gray-900 to-transparent" />
        </motion.div>
    );
}

export default Header;