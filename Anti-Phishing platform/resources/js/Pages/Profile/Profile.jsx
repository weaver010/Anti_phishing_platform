import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { ShieldCheckIcon, ChartBarIcon, ClockIcon, AcademicCapIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function Profile({ auth }) { // auth هو البيانات اللي بتيجي من Inertia
    const { props } = usePage(); // نجيب البيانات كلها من الصفحة
    const user = auth.user; // بيانات المستخدم من الـ auth

    // البيانات دي المفروض تيجي من الـ Backend، لكن لو مش موجودة هنستخدم افتراضي
    const [userData, setUserData] = useState({
        name: user.name || "Sarah Johnson",
        role: props.role || "Security Analyst",
        email: user.email || "s.johnson@cybersec.org",
        lastLogin: props.lastLogin || "2024-02-15 14:30 UTC",
        twoFactorEnabled: props.twoFactorEnabled || true,
        phishingStats: props.phishingStats || {
            detected: 42,
            reported: 35,
            trainingCompleted: 8,
            simulationsParticipated: 5,
            successRate: "85%"
        },
        recentActivity: props.recentActivity || [
            { date: "2024-02-15", action: "Password changed", location: "New York, US" },
            { date: "2024-02-14", action: "2FA enabled", location: "London, UK" }
        ],
        profilePhoto: props.profilePhoto || "assets/person.jpg",
        securityScore: props.securityScore || 92,
        trainingProgress: props.trainingProgress || 75,
        recentThreats: props.recentThreats || [
            { type: "Phishing Email", date: "2024-02-15", status: "Blocked" },
            { type: "Suspicious Link", date: "2024-02-14", status: "Reported" }
        ]
    });

    const [startAnimations, setStartAnimations] = useState(false);

    useEffect(() => {
        setStartAnimations(true);
    }, []);

    const handlePhotoUpdate = () => {
        alert("Feature to update photo coming soon!");
    };

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className={`p-4 rounded-lg bg-gradient-to-br from-${color}-50 to-${color}-100 border border-${color}-200`}>
            <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-${color}-100`}>
                    <Icon className={`w-6 h-6 text-${color}-600`} />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    );

    return (
        <AuthenticatedLayout
            user={auth.user} // بنجيب بيانات المستخدم من الـ auth
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Security Profile
                </h2>
            }
        >
            <Head title="Security Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Profile Header */}
                    <div className="overflow-hidden bg-white shadow-xl sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center space-x-6">
                                <div className="relative">
                                    <img
                                        src={userData.profilePhoto}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full border-4 border-blue-100"
                                        onClick={handlePhotoUpdate}
                                    />
                                    <div className="absolute bottom-0 right-0 p-1 bg-green-500 rounded-full">
                                        <ShieldCheckIcon className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
                                    <p className="text-gray-600">{userData.role}</p>
                                    <p className="text-sm text-gray-500">Last login: {userData.lastLogin}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard
                            title="Security Score"
                            value={`${userData.securityScore}%`}
                            icon={ShieldCheckIcon}
                            color="green"
                        />
                        <StatCard
                            title="Phishing Detected"
                            value={userData.phishingStats.detected}
                            icon={ExclamationTriangleIcon}
                            color="red"
                        />
                        <StatCard
                            title="Training Progress"
                            value={`${userData.trainingProgress}%`}
                            icon={AcademicCapIcon}
                            color="blue"
                        />
                        <StatCard
                            title="Success Rate"
                            value={userData.phishingStats.successRate}
                            icon={ChartBarIcon}
                            color="purple"
                        />
                    </div>

                    {/* Recent Activity and Threats */}
                    <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-2">
                        {/* Recent Activity */}
                        <div className="overflow-hidden bg-white shadow-xl sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                                <div className="mt-4 space-y-4">
                                    {userData.recentActivity.map((activity, index) => (
                                        <div key={index} className="flex items-center space-x-4">
                                            <ClockIcon className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                                <p className="text-xs text-gray-500">
                                                    {activity.date} • {activity.location}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recent Threats */}
                        <div className="overflow-hidden bg-white shadow-xl sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900">Recent Threats</h3>
                                <div className="mt-4 space-y-4">
                                    {userData.recentThreats.map((threat, index) => (
                                        <div key={index} className="flex items-center space-x-4">
                                            <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{threat.type}</p>
                                                <p className="text-xs text-gray-500">
                                                    {threat.date} • Status: {threat.status}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}