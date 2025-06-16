import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Typewriter effect states
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
    const phrases = [
        "Stay safe... Stay here...",
        "Outsmart phishing attempts.",
        "Your shield against scams.",
        "Security made simple.",
        "Real-time threat detection."
    ];

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % phrases.length;
            const fullText = phrases[i];

            setText(isDeleting 
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 30 : 150);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 1000);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, phrases, typingSpeed]);

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (!isLogin) {
            if (formData.username.length < 3) {
                newErrors.username = 'Username must be at least 3 characters';
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            // Simulated API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            localStorage.setItem('authToken', 'demo-token');
            navigate('/dashboard');
        } catch (error) {
            setErrors({ general: error.message || 'Authentication failed' });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
        if (errors[e.target.id]) {
            setErrors({ ...errors, [e.target.id]: null });
        }
    };

    return (
        <>
        <div className="flex h-screen bg-gray-50">
            <div className="flex flex-col md:flex-row w-full h-full">
                {/* Centered Form Section */}
                <div className="w-full md:w-1/2 bg-white px-4 py-8 md:p-12 flex flex-col justify-center items-center min-h-screen md:min-h-0">
                    <div className="w-full max-w-md mx-auto">
                        <div className="flex justify-center mb-8">
                            <div className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                        </div>

                        {errors.general && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
                                {errors.general}
                            </div>
                        )}

                        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
                            {isLogin ? "Welcome Back" : "Create Account"}
                        </h2>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500`}
                                    placeholder="name@company.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className={`w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500`}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>

                            {!isLogin && (
                                <>
                                    <div>
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                                        <input
                                            type="text"
                                            id="username"
                                            className={`w-full px-4 py-3 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500`}
                                            placeholder="Enter username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            disabled={loading}
                                        />
                                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            className={`w-full px-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500`}
                                            placeholder="••••••••"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            disabled={loading}
                                        />
                                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                                    </div>
                                </>
                            )}

                            <button
                                type="submit"
                                className="w-full py-3.5 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    </div>
                                ) : isLogin ? "Secure Login" : "Start Protection"}
                            </button>
                        </form>

                        <div className="mt-6 text-center text-sm">
                            <span className="text-gray-600">
                                {isLogin ? "New to AntiPhish? " : "Already protected? "}
                                <button
                                    onClick={() => {
                                        setIsLogin(!isLogin);
                                        setErrors({});
                                    }}
                                    className="font-medium text-blue-600 hover:text-blue-800"
                                    disabled={loading}
                                >
                                    {isLogin ? "Begin Safety Journey" : "Access Account"}
                                </button>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Typewriter Section (Hidden on mobile) */}
                <div className="hidden md:flex w-full md:w-1/2 bg-blue-900 p-6 md:p-12 items-center justify-center">
                    <div className="text-center max-w-xl w-full">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100">
                            AntiPhishing
                        </h1>
                        <p className="text-xl md:text-2xl font-medium text-blue-100 mb-8 min-h-[96px]">
                            {text}
                            <span className="ml-1.5 inline-block w-1.5 h-8 bg-blue-300 animate-blink"></span>
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <div className="flex items-center justify-center text-blue-200">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm md:text-base">AI Threat Detection</span>
                            </div>
                            <div className="flex items-center justify-center text-blue-200">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm md:text-base">24/7 Monitoring</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default AuthPage;