import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Logo from '@/Components/Logo';
import { useAuthStore, useUiStore } from '@/stores';

export default function Register() {
    const [agreedToTerms, setAgreedToTerms] = useState(false); // State لتتبع موافقة المستخدم

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    // Zustand stores
    const { setUser } = useAuthStore();
    const { addNotification } = useUiStore();

    const submit = (e) => {
        e.preventDefault();
        if (!agreedToTerms) {
            addNotification({
                type: 'warning',
                message: 'Please agree to the Terms of Use before registering.'
            });
            return;
        }
        post(route('register'), {
            onSuccess: (page) => {
                // Update Zustand store with user data
                if (page.props.auth?.user) {
                    setUser(page.props.auth.user);
                    addNotification({
                        type: 'success',
                        title: 'Welcome!',
                        message: `Account created successfully! Welcome to AntiPhishing, ${page.props.auth.user.name}!`
                    });
                }
            },
            onError: () => {
                addNotification({
                    type: 'error',
                    message: 'Registration failed. Please check your information and try again.'
                });
            },
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />
            <div className="flex flex-col min-h-screen bg-white">
                <div className="flex items-center justify-center flex-grow px-4 py-8 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md p-8 transition-all duration-300 transform bg-white rounded-xl">
                        {/* Logo Section */}
                        <div className="flex justify-center mb-10">
                            <Logo color='dark' size='medium' />
                        </div>
                        
                        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">Create your account</h2>

                        {/* Google Sign-Up Button */}
                        <div className="mb-6">
                            <a
                                href={route('auth.google')}
                                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-300 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                            >
                                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Sign up with Google
                            </a>
                        </div>

                        {/* Divider */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 text-gray-500 bg-white">Or sign up with email</span>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={submit} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Name"
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="block w-full px-4 py-3 text-gray-900 transition-all duration-300 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2 text-xs text-red-600" />
                            </div>

                            {/* Email Field */}
                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Email"
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="block w-full px-4 py-3 text-gray-900 transition-all duration-300 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2 text-xs text-red-600" />
                            </div>

                            {/* Password Field */}
                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="block w-full px-4 py-3 text-gray-900 transition-all duration-300 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-2 text-xs text-red-600" />
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="block w-full px-4 py-3 text-gray-900 transition-all duration-300 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="mt-2 text-xs text-red-600" />
                            </div>

                            {/* Terms of Use Checkbox */}
                            <div className="flex items-start space-x-3">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="w-5 h-5 mt-1 transition-all duration-200 border-gray-300 rounded text-cyan-600 focus:ring-cyan-500"
                                />
                                <label htmlFor="terms" className="text-sm text-gray-700">
                                    I agree to the{" "}
                                    <Link
                                        href="/terms-of-use"
                                        className="font-medium text-cyan-600 hover:text-cyan-800 hover:underline"
                                    >
                                        Terms of Use
                                    </Link>
                                    . By registering, I confirm that I have read and understood the terms governing the use of AntiPhishing services.
                                </label>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between">
                                <Link
                                    href={route('login')}
                                    className="text-sm text-cyan-600 hover:text-cyan-800 focus:outline-none focus:underline"
                                >
                                    Already registered?
                                </Link>
                                <PrimaryButton
                                    className={`ml-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300 ${
                                        processing || !agreedToTerms ? 'opacity-60 cursor-not-allowed' : ''
                                    }`}
                                    disabled={processing || !agreedToTerms}
                                >
                                    Register
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}