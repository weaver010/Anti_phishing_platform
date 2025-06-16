import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function CreateUser() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        is_admin: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.users.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AdminLayout>
            <Head title="Create User" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-800 overflow-hidden shadow-xl sm:rounded-xl border border-gray-700">
                        <div className="p-6 text-gray-300">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-4">
                                    <Link
                                        href={route('admin.users.index')}
                                        className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                                    >
                                        <ArrowLeftIcon className="h-6 w-6" />
                                    </Link>
                                    <h2 className="text-2xl font-bold text-white">Create New User</h2>
                                </div>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="name" value="Name" className="text-gray-300" />
                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full bg-gray-700 border-gray-600 text-white focus:border-cyan-500 focus:ring-cyan-500"
                                            autoComplete="name"
                                            isFocused={true}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="email" value="Email" className="text-gray-300" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full bg-gray-700 border-gray-600 text-white focus:border-cyan-500 focus:ring-cyan-500"
                                            autoComplete="username"
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="password" value="Password" className="text-gray-300" />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full bg-gray-700 border-gray-600 text-white focus:border-cyan-500 focus:ring-cyan-500"
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-gray-300" />
                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full bg-gray-700 border-gray-600 text-white focus:border-cyan-500 focus:ring-cyan-500"
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.password_confirmation} className="mt-2" />
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <Checkbox
                                        id="is_admin"
                                        name="is_admin"
                                        checked={data.is_admin}
                                        onChange={(e) => setData('is_admin', e.target.checked)}
                                        className="text-cyan-600 focus:ring-cyan-500 focus:ring-offset-gray-800"
                                    />
                                    <InputLabel htmlFor="is_admin" value="Admin User" className="ml-2 text-gray-300" />
                                </div>
                                <InputError message={errors.is_admin} className="mt-2" />

                                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-700">
                                    <SecondaryButton
                                        type="button"
                                        onClick={() => window.history.back()}
                                        className="bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    >
                                        Cancel
                                    </SecondaryButton>
                                    <PrimaryButton 
                                        className="bg-cyan-600 hover:bg-cyan-700 focus:bg-cyan-700 active:bg-cyan-900" 
                                        disabled={processing}
                                    >
                                        {processing ? 'Creating...' : 'Create User'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
