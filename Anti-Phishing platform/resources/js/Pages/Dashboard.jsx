// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head } from '@inertiajs/react';

// export default function Dashboard() {
//     return (
//         <AuthenticatedLayout>
//             <Head title="Dashboard" />

//             {/* Custom Animations - حطيت fadeIn بس */}
//             <style>{`
//                 @keyframes fadeIn {
//                     0% { opacity: 0; transform: translateY(20px); }
//                     100% { opacity: 1; transform: translateY(0); }
//                 }
//             `}</style>

//             <div className="min-h-screen py-12 bg-gradient-to-br from-gray-50 to-blue-50">
//                 <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
//                     <div className="overflow-hidden bg-white/90 backdrop-blur-lg shadow-xl sm:rounded-xl border border-cyan-200/50 animate-[fadeIn_0.8s_ease-out]">
//                         <div className="p-8 text-gray-900">
//                             <div className="flex items-center space-x-4">
//                                 <div className="relative">
//                                     <svg 
//                                         className="w-12 h-12 text-cyan-500" 
//                                         fill="none" 
//                                         stroke="currentColor" 
//                                         viewBox="0 0 24 24"
//                                     >
//                                         <path 
//                                             strokeLinecap="round" 
//                                             strokeLinejoin="round" 
//                                             strokeWidth={2} 
//                                             d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
//                                         />
//                                     </svg>
//                                 </div>
//                                 <div>
//                                     <h3 className="text-2xl font-semibold text-gray-800">
//                                         Welcome Back!
//                                     </h3>
//                                     <p className="mt-1 text-gray-600">
//                                         You're logged in successfully. Enjoy your secure experience!
//                                     </p>
//                                 </div>
//                             </div>

//                             {/* Dashboard Stats */}
//                             <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2">
//                                 <div className="p-4 transition-all duration-300 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:scale-105">
//                                     <p className="text-sm text-cyan-600">Status</p>
//                                     <p className="text-lg font-medium text-gray-800">Active</p>
//                                 </div>
//                                 <div className="p-4 transition-all duration-300 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:scale-105">
//                                     <p className="text-sm text-cyan-600">Last Login</p>
//                                     <p className="text-lg font-medium text-gray-800">
//                                         {new Date().toLocaleDateString()}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }


import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Profile() {
    const { auth } = usePage().props;
    const user = auth.user;
    const [isHovered, setIsHovered] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Simulate loading animation
    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 300);
    }, []);

    // Enhanced profile picture handler
    const handleProfilePictureClick = () => {
        alert("Profile picture upload coming soon! Preview and crop functionality will be included.");
    };

    return (
        <AuthenticatedLayout>
            <Head title="Profile | Anti-Phishing Command Center" />

            {/* Advanced Animations */}
            <style>{`
                @keyframes fadeInScale {
                    0% { opacity: 0; transform: scale(0.95) translateY(20px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-fadeInScale {
                    animation: fadeInScale 0.6s ease-out forwards;
                }
            `}</style>

            {/* Main container with cyberpunk-inspired background */}
            <div className="relative min-h-screen py-12 overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950 to-cyan-900">
                {/* Background particle effect */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute rounded-full w-72 h-72 bg-cyan-500/10 top-10 left-10 blur-3xl animate-pulse"></div>
                    <div className="absolute delay-1000 rounded-full w-96 h-96 bg-blue-500/10 bottom-20 right-20 blur-3xl animate-pulse"></div>
                </div>

                <div className="relative z-10 max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
                    <div className={`bg-gray-800/90 backdrop-blur-md shadow-2xl rounded-2xl border border-cyan-500/20 overflow-hidden transition-all duration-500 ${isLoaded ? 'animate-fadeInScale' : 'opacity-0'}`}>
                        {/* Header with static logo */}
                        <div className="relative p-6 bg-gradient-to-r from-cyan-600 to-blue-700">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCwwIEwxMDAsMTAwIEwyMDAsMCBaIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-10"></div>
                            <div className="flex items-center space-x-6">
                                <div className="relative">
                                    <img 
                                        src="/assets/darkEye.png" 
                                        alt="Eye Logo" 
                                        className="object-contain w-14 h-14"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-extrabold tracking-tight text-white">
                                        Secura Command Center
                                    </h3>
                                    <p className="mt-2 font-mono text-sm text-cyan-200">
                                        Agent {user.name}, your secure profile is active.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Main content */}
                        <div className="p-6 md:p-8">
                            {/* Profile Picture with futuristic overlay */}
                            <div className="flex justify-center mt-6">
                                <div
                                    className={`w-28 h-28 rounded-full bg-gray-700 border-4 border-cyan-400/30 flex items-center justify-center cursor-pointer relative overflow-hidden transition-all duration-300 ${isHovered ? 'scale-110 shadow-xl' : ''}`}
                                    onClick={handleProfilePictureClick}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    title="Upload your agent avatar"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent"></div>
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="z-10 object-cover w-full h-full transition-transform duration-300 rounded-full"
                                        />
                                    ) : (
                                        <img
                                            src="/assets/Eye.png"
                                            alt="Eye Logo"
                                            className="z-10 object-contain transition-transform duration-300 w-14 h-14"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* User Details with cyber grid */}
                            <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
                                {[
                                    { label: 'Agent Name', value: user.name },
                                    { label: 'Email Signature', value: user.email, breakAll: true },
                                    { label: 'Activation Date', value: new Date(user.created_at || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
                                    { label: 'Status', value: 'Active', status: true },
                                    { label: 'Last Transmission', value: new Date().toLocaleString() },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="p-5 transition-all duration-300 border shadow-lg bg-gray-700/50 rounded-xl border-cyan-500/20 hover:shadow-cyan-500/20 hover:-translate-y-1"
                                    >
                                        <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400">{item.label}</p>
                                        <p className={`mt-2 text-lg font-bold text-white ${item.breakAll ? 'break-all' : ''}`}>
                                            {item.status ? (
                                                <span className="flex items-center">
                                                    <span className="w-3 h-3 mr-2 bg-green-400 rounded-full animate-pulse"></span>
                                                    {item.value}
                                                </span>
                                            ) : (
                                                item.value
                                            )}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col justify-end gap-4 mt-10 sm:flex-row">
                                <button
                                    className="px-6 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-lg shadow-md bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                                    onClick={() => alert('Advanced security protocols coming soon!')}
                                >
                                    Security Protocols
                                </button>
                                <a
                                    href={route('profile.edit')}
                                    className="px-6 py-3 text-sm font-semibold text-center text-white transition-all duration-300 rounded-lg shadow-md bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                                >
                                    Modify Profile
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}