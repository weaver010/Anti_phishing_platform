import { useState, useEffect, useRef } from "react";
import { Link, usePage, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Logo from '@/Components/Logo';
import { useAuthStore, useUiStore } from '@/stores';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const mobileMenuRef = useRef();
    const { props } = usePage(); // Access Inertia page props

    // Zustand stores
    const {
        user,
        isAuthenticated,
        showingNavigationDropdown,
        setShowingNavigationDropdown,
        setUser,
        logout: logoutFromStore
    } = useAuthStore();

    const {
        sidebarOpen,
        setSidebarOpen,
        addNotification
    } = useUiStore();

    // Use Zustand state for mobile menu and user menu
    const isOpen = sidebarOpen;
    const setIsOpen = setSidebarOpen;
    const userMenuOpen = showingNavigationDropdown;
    const setUserMenuOpen = setShowingNavigationDropdown;

    // Sync Inertia auth with Zustand store
    useEffect(() => {
        if (props.auth?.user && (!user || user.id !== props.auth.user.id)) {
            setUser(props.auth.user);
        } else if (!props.auth?.user && user) {
            logoutFromStore();
        }
    }, [props.auth?.user, user, setUser, logoutFromStore]);

    // Extract user name from store or props
    const userName = user?.name || props.auth?.user?.name || "Guest";
    const isLoggedIn = isAuthenticated || props.auth?.user !== null;

    // Logout handler
    const handleLogout = () => {
        router.post(route('logout'), {}, {
            onSuccess: () => {
                logoutFromStore(); // Clear Zustand store
                setSidebarOpen(false); // Close mobile menu
                setShowingNavigationDropdown(false); // Close user menu
                addNotification({
                    type: 'success',
                    message: 'Logged out successfully'
                });
            },
        });
    };

    // Smooth scroll function for section navigation
    const handleSmoothScroll = (e, sectionId) => {
        e.preventDefault();
        
        // Check if we're on the home page by looking at the current path
        const isHomePage = window.location.pathname === '/' || window.location.pathname === '';
        
        // If clicking home link and not on home page, navigate to home
        if (sectionId === 'home' && !isHomePage) {
            window.location.href = '/';
            return;
        }
        
        // If it's the home link and we're already on the home page, just scroll to top
        if (sectionId === 'home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            setIsOpen(false);
            return;
        }
        
        // Find the section element to scroll to
        const section = document.getElementById(sectionId);
        
        if (section) {
            // Scroll to the section
            section.scrollIntoView({ behavior: 'smooth' });
            
            // Close mobile menu if open
            setIsOpen(false);
        } else {
            // If section not found on current page, navigate to home page with hash
            window.location.href = `/#${sectionId}`;
        }
    };

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!isOpen) setUserMenuOpen(false);
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Animation Variants
    const navVariants = {
        initial: { y: -50, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const linkVariants = {
        hover: { scale: 1.05, color: "#7dd3fc", transition: { duration: 0.3 } },
    };

    const menuVariants = {
        open: { opacity: 1, height: "auto", transition: { duration: 0.4, ease: "easeOut" } },
        closed: { opacity: 0, height: 0, transition: { duration: 0.4, ease: "easeIn" } },
    };

    // Navigation links - now all point to sections on homepage
    const navLinks = ["Home", "About", "Services", "Contact"];

    return (
        <motion.nav
            className={`fixed w-full z-50 top-0 ${isScrolled
                ? "bg-gray-900/95 shadow-lg backdrop-blur-md"
                : "bg-gray-900/90 backdrop-blur-sm"
                } transition-all duration-300`}
            initial="initial"
            animate="animate"
            variants={navVariants}
        >
            <div className="px-4 py-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo Section */}
                    <Logo 
                        size="medium" 
                        showText={false} 
                        onClick={(e) => handleSmoothScroll(e, 'home')}
                    />

                    {/* Desktop Navigation */}
                    <div className="items-center hidden space-x-8 md:flex">
                        {navLinks.map((item, index) => (
                            <motion.div key={index} whileHover="hover" variants={linkVariants}>
                                <a
                                    href={item === "Home" ? "/" : `/#${item.toLowerCase()}`}
                                    onClick={(e) => handleSmoothScroll(e, item === "Home" ? "home" : item.toLowerCase())}
                                    className="relative text-blue-100 transition-colors duration-300 cursor-pointer hover:text-cyan-300 group"
                                >
                                    {item}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-300 group-hover:w-full transition-all duration-300 ease-out" />
                                </a>
                            </motion.div>
                        ))}
                    </div>

                    {/* Desktop Auth Section */}
                    {isLoggedIn ? (
                        /* Desktop User Menu - Show when logged in */
                        <div
                            className="relative items-center hidden md:flex"
                            onMouseEnter={() => setUserMenuOpen(true)}
                            onMouseLeave={() => setUserMenuOpen(false)}
                        >
                            <motion.button
                                className="relative w-10 h-10 transition-all duration-300 border-2 rounded-full border-cyan-400/50 hover:border-cyan-300"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="w-full h-full overflow-hidden rounded-full">
                                    {props.auth?.user?.avatar ? (
                                        <img
                                            src={props.auth.user.avatar}
                                            alt={props.auth.user.name}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <svg
                                            className="w-full h-full p-1 text-blue-100"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    )}
                                </div>
                                {/* Status indicator - positioned outside the image container */}
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 rounded-full border-blue-800" />
                            </motion.button>

                            <motion.div
                                className="absolute right-0 w-48 overflow-hidden border rounded-lg shadow-xl top-12 bg-gray-900/95 border-cyan-400/20 backdrop-blur-md"
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{
                                    opacity: userMenuOpen ? 1 : 0,
                                    y: userMenuOpen ? 0 : 10,
                                    scale: userMenuOpen ? 1 : 0.95,
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="p-2 space-y-1">
                                    <UserMenuItem href={route("dashboard")} icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                        Profile
                                    </UserMenuItem>
                                    <UserMenuItem href="/settings" icon="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z">
                                        Settings
                                    </UserMenuItem>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center w-full px-4 py-2 text-left text-blue-100 transition-colors rounded-lg hover:bg-cyan-400/20 hover:text-cyan-300"
                                    >
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Log Out
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    ) : (
                        /* Desktop Sign In/Sign Up Buttons - Show when not logged in */
                        <div className="items-center hidden space-x-4 md:flex">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    href={route('login')}
                                    className="px-4 py-2 text-sm font-medium text-blue-100 transition-colors duration-300 rounded-lg hover:text-cyan-300 hover:bg-cyan-400/20"
                                >
                                    Sign In
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    href={route('register')}
                                    className="px-4 py-2 text-sm font-medium text-white transition-colors duration-300 border-2 rounded-lg bg-cyan-600 border-cyan-600 hover:bg-cyan-700 hover:border-cyan-700"
                                >
                                    Sign Up
                                </Link>
                            </motion.div>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 text-blue-100 rounded-md hover:text-cyan-300 hover:bg-cyan-800/20 focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <motion.div
                className={`md:hidden overflow-hidden ${isScrolled ? "bg-gray-900/90" : "bg-gray-900/80"}`}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={menuVariants}
                ref={mobileMenuRef}
            >
                <div className="px-4 pt-2 pb-4 space-y-2">
                    {navLinks.map((item, index) => (
                        <a
                            key={index}
                            href={item === "Home" ? "/" : `/#${item.toLowerCase()}`}
                            onClick={(e) => handleSmoothScroll(e, item === "Home" ? "home" : item.toLowerCase())}
                            className="block px-4 py-2 text-blue-100 transition-colors rounded-lg cursor-pointer hover:bg-cyan-400/20 hover:text-cyan-300"
                        >
                            {item}
                        </a>
                    ))}

                    <div className="pt-4 border-t border-blue-700">
                        {isLoggedIn ? (
                            /* Mobile User Menu - Show when logged in */
                            <>
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center w-full p-3 space-x-3 text-left transition-colors rounded-lg hover:bg-cyan-400/20"
                                >
                                    <div className="relative w-8 h-8 border-2 rounded-full border-cyan-400/50">
                                        <div className="w-full h-full overflow-hidden rounded-full">
                                            {props.auth?.user?.avatar ? (
                                                <img
                                                    src={props.auth.user.avatar}
                                                    alt={props.auth.user.name}
                                                    className="object-cover w-full h-full"
                                                />
                                            ) : (
                                                <svg
                                                    className="w-full h-full p-1 text-blue-100"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        {/* Status indicator - positioned outside the image container */}
                                        <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 border-2 rounded-full border-blue-800" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{userName}</p>
                                        <p className="text-xs text-blue-200">Verified Account</p>
                                    </div>
                                </button>

                                <motion.div
                                    className="pl-4 ml-2 space-y-2 overflow-hidden"
                                    variants={menuVariants}
                                    animate={userMenuOpen ? "open" : "closed"}
                                >
                                    <UserMenuItem href="/dashboard" icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                        Profile
                                    </UserMenuItem>
                                    <UserMenuItem href="/settings" icon="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z">
                                        Settings
                                    </UserMenuItem>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center w-full px-4 py-2 text-left text-blue-100 transition-colors rounded-lg hover:bg-cyan-400/20 hover:text-cyan-300"
                                    >
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Logout
                                    </button>
                                </motion.div>
                            </>
                        ) : (
                            /* Mobile Sign In/Sign Up Buttons - Show when not logged in */
                            <div className="space-y-3">
                                <Link
                                    href={route('login')}
                                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-blue-100 transition-colors duration-300 rounded-lg hover:text-cyan-300 hover:bg-cyan-400/20"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    Sign In
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition-colors duration-300 border-2 rounded-lg bg-cyan-600 border-cyan-600 hover:bg-cyan-700 hover:border-cyan-700"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.nav>
    );
};

const UserMenuItem = ({ href, icon, children }) => (
    <Link
        href={href}
        className="flex items-center px-4 py-2 text-blue-100 transition-colors rounded-lg hover:bg-cyan-400/20 hover:text-cyan-300"
    >
        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
        </svg>
        {children}
    </Link>
);

export default Navbar;