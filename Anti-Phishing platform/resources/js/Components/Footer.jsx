import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Logo from '@/Components/Logo';

const Footer = () => {
    return (
        <footer className="py-6 text-sm text-white bg-gray-800 shadow-inner">
            <div className="container flex flex-col items-center justify-between px-4 mx-auto lg:flex-row">
                {/* Mobile Layout: Logo at the Top */}
                <div className="flex mb-4 lg:hidden">
                    <Logo 
                        size="medium" 
                        showText={false}
                        direction="row"
                        className="items-center"
                    />
                </div>

                {/* Desktop Layout: Logo + Copyright on the Left */}
                <div className="items-center hidden mb-4 space-x-4 lg:flex lg:mb-0">
                    <Logo 
                        size="medium" 
                        showText={false} 
                        onClick={(e) => handleSmoothScroll(e, 'home')}
                    />
                    <p className="text-gray-300">
                        © {new Date().getFullYear()} Secura. All rights reserved.
                    </p>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-wrap justify-center mb-4 space-x-6 lg:mb-0">
                    <Link
                        href="/"
                        className="text-gray-300 transition-colors duration-200 hover:text-cyan-400"
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className="text-gray-300 transition-colors duration-200 hover:text-cyan-400"
                    >
                        About
                    </Link>
                    <Link
                        href="/services"
                        className="text-gray-300 transition-colors duration-200 hover:text-cyan-400"
                    >
                        Services
                    </Link>
                    <Link
                        href="/contact"
                        className="text-gray-300 transition-colors duration-200 hover:text-cyan-400"
                    >
                        Contact
                    </Link>
                </nav>

                {/* Mobile Layout: Copyright and Privacy/Terms at the Bottom */}
                <div className="flex flex-col items-center mb-4 space-y-2 lg:hidden">
                    <p className="text-gray-300">
                        © {new Date().getFullYear()} AntiPhishing. All rights reserved.
                    </p>
                    <div className="flex space-x-4">
                        <Link
                            href="/privacy"
                            className="text-gray-300 transition-colors duration-200 hover:text-cyan-400"
                        >
                            Privacy Policy
                        </Link>
                        <span className="text-gray-500">|</span>
                        <Link
                            href="/terms"
                            className="text-gray-300 transition-colors duration-200 hover:text-cyan-400"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>

                {/* Desktop Layout: Privacy and Terms on the Right */}
                <div className="hidden space-x-4 lg:flex">
                    <Link
                        href="/privacy"
                        className="text-gray-300 transition-colors duration-200 hover:text-cyan-400"
                    >
                        Privacy Policy
                    </Link>
                    <span className="text-gray-500">|</span>
                    <Link
                        href="/terms"
                        className="text-gray-300 transition-colors duration-200 hover:text-cyan-400"
                    >
                        Terms of Service
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;