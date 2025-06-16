import { useState, Fragment } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import {
    Bars3Icon,
    XMarkIcon,
    HomeIcon,
    UserGroupIcon,
    LinkIcon,
    DocumentTextIcon,
    BellIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';
import { Transition } from '@headlessui/react';
import Logo from '@/Components/Logo';

export default function AdminLayout({ children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const { auth } = usePage().props;

    const navigation = [
        {
            name: 'Dashboard',
            href: route('admin.dashboard'),
            current: route().current('admin.dashboard'),
            icon: HomeIcon
        },
        {
            name: 'Users',
            href: route('admin.users.index'),
            current: route().current('admin.users.*'),
            icon: UserGroupIcon
        },
        {
            name: 'URL Scans',
            href: route('admin.scans.urls'),
            current: route().current('admin.scans.urls'),
            icon: LinkIcon
        },
        {
            name: 'Malware Scans',
            href: route('admin.scans.malware'),
            current: route().current('admin.scans.malware'),
            icon: DocumentTextIcon
        },
        {
            name: 'Reports',
            href: route('admin.reports.contacts'),
            current: route().current('admin.reports.*'),
            icon: ChartBarIcon
        }
    ];

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Top Navigation Bar */}
            <nav className="bg-gray-800 border-b border-gray-700">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            {/* Logo */}
                            <div className="flex items-center space-x-2 shrink-0">
                                <Link href="/" className="flex items-center space-x-2 group">
                                    <Logo/>
                                </Link>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden space-x-4 sm:ml-10 sm:flex">
                                {navigation.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        href={item.href}
                                        active={item.current}
                                        className={`px-3 py-2 text-sm font-medium rounded-md flex items-center transition duration-150 ease-in-out ${
                                            item.current 
                                                ? 'bg-gray-700 text-white' 
                                                : 'text-gray-300 hover:text-white hover:bg-gray-700'
                                        }`}
                                    >
                                        <item.icon className="w-5 h-5 mr-2" aria-hidden="true" />
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>

                        {/* Right side navigation - Desktop */}
                        <div className="hidden sm:flex sm:items-center sm:gap-4">
                            {/* Notifications Button */}
                            <div className="relative">
                                <button className="p-2 text-gray-400 transition duration-150 rounded-full hover:text-white hover:bg-gray-700">
                                    <span className="absolute flex w-4 h-4 -top-1 -right-1">
                                        <span className="relative inline-flex w-3 h-3 rounded-full bg-cyan-400"></span>
                                        <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-cyan-400"></span>
                                    </span>
                                    <BellIcon className="w-6 h-6" />
                                    <span className="sr-only">View notifications</span>
                                </button>
                            </div>

                            {/* User Dropdown */}
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className="flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-300 transition duration-150 ease-in-out bg-gray-800 border border-gray-700 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <img
                                                className="w-8 h-8 mr-2 rounded-full object-cover"
                                                src={auth?.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(auth?.user?.name || 'Guest')}&background=0D8ABC&color=fff`}
                                                alt={auth?.user?.name || 'Guest'}
                                            />
                                            <span>{auth?.user?.name || 'Guest'}</span>
                                            <svg
                                                className="ml-2 -mr-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content align="right" width="48" contentClasses="bg-gray-800 border border-gray-700">
                                        <Dropdown.Link href={route('profile.edit')} className="flex items-center px-4 py-2 text-sm text-gray-300 transition duration-150 hover:bg-gray-700 hover:text-white">
                                            <Cog6ToothIcon className="w-5 h-5 mr-2" />
                                            Profile Settings
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-300 transition duration-150 hover:bg-gray-700 hover:text-white"
                                        >
                                            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                aria-expanded={showingNavigationDropdown}
                            >
                                <span className="sr-only">{showingNavigationDropdown ? 'Close menu' : 'Open menu'}</span>
                                {showingNavigationDropdown ? (
                                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                                ) : (
                                    <Bars3Icon className="w-6 h-6" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <Transition
                    show={showingNavigationDropdown}
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-150"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <div className="sm:hidden">
                        <div className="px-4 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <ResponsiveNavLink
                                    key={item.name}
                                    href={item.href}
                                    active={item.current}
                                    className={`flex items-center px-3 py-2 text-base font-medium rounded-md ${
                                        item.current 
                                            ? 'bg-gray-700 text-white' 
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`}
                                >
                                    <item.icon className="w-5 h-5 mr-3" aria-hidden="true" />
                                    {item.name}
                                </ResponsiveNavLink>
                            ))}
                        </div>

                        <div className="pt-4 pb-3 border-t border-gray-700">
                            <div className="flex items-center px-4">
                                <div className="flex-shrink-0">
                                    <img
                                        className="w-10 h-10 rounded-full object-cover"
                                        src={auth?.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(auth?.user?.name || 'Guest')}&background=0D8ABC&color=fff`}
                                        alt={auth?.user?.name || 'Guest'}
                                    />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-white">
                                        {auth?.user?.name || 'Guest'}
                                    </div>
                                    <div className="text-sm font-medium text-gray-400">
                                        {auth?.user?.email || ''}
                                    </div>
                                </div>
                                <button className="p-2 ml-auto text-gray-400 rounded-full hover:text-white hover:bg-gray-700">
                                    <BellIcon className="w-6 h-6" />
                                    <span className="sr-only">View notifications</span>
                                </button>
                            </div>

                            <div className="px-4 mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')} className="flex items-center px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
                                    <Cog6ToothIcon className="w-5 h-5 mr-3" aria-hidden="true" />
                                    Profile Settings
                                </ResponsiveNavLink>
                                <ResponsiveNavLink 
                                    method="post" 
                                    href={route('logout')} 
                                    as="button" 
                                    className="flex items-center w-full px-3 py-2 text-base font-medium text-left text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                                >
                                    <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" aria-hidden="true" />
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </Transition>
            </nav>

            {/* Main Content */}
            <main className="py-10">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}