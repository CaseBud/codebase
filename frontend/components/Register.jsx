import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [validationErrors, setValidationErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const checkPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        setPasswordStrength(strength);
    };

    const validateField = (name, value) => {
        const errors = { ...validationErrors };

        switch (name) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                errors.email = !emailRegex.test(value)
                    ? 'Invalid email address'
                    : '';
                break;
            case 'password':
                checkPasswordStrength(value);
                errors.password =
                    value.length < 8
                        ? 'Password must be at least 8 characters'
                        : '';
                break;
            // Add more validations as needed
        }

        setValidationErrors(errors);
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.fullName) errors.fullName = 'Full name is required';
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.password) errors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setError('');

        try {
            localStorage.removeItem('lastConversationId');
            localStorage.removeItem('currentChatMessages');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('lastActivity');
            // Register the user
            const response = await authService.register({
                email: formData.email,
                fullName: formData.fullName,
                password: formData.password
            });

            // Store verification data in localStorage
            localStorage.setItem('verificationEmail', formData.email);
            localStorage.setItem('registrationTime', Date.now().toString());

            // Navigate to OTP verification
            navigate('/verify-otp', {
                state: {
                    email: formData.email,
                    isNewRegistration: true
                },
                replace: true
            });
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-900">
            {/* Left Column - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-[2px]" />
                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center">
                            <svg
                                className="h-6 w-6 text-blue-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white">
                            CaseBud
                        </h2>
                    </div>

                    <div className="mt-auto">
                        <h1 className="text-4xl font-bold text-white leading-tight">
                            Join the Future of Legal Practice
                        </h1>
                        <p className="mt-4 text-lg text-blue-100">
                            Get started with AI-powered legal assistance and
                            transform your practice today.
                        </p>
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="bg-blue-900/20 backdrop-blur-sm p-4 rounded-lg">
                                <h3 className="text-white font-semibold">
                                    Easy Setup
                                </h3>
                                <p className="text-blue-100 text-sm mt-1">
                                    Start using in minutes
                                </p>
                            </div>
                            <div className="bg-blue-900/20 backdrop-blur-sm p-4 rounded-lg">
                                <h3 className="text-white font-semibold">
                                    Secure Platform
                                </h3>
                                <p className="text-blue-100 text-sm mt-1">
                                    Enterprise-grade security
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Registration Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white">
                            Create your account
                        </h2>
                        <p className="mt-2 text-sm text-slate-400">
                            Start your journey with CaseBud
                        </p>
                    </div>

                    {error && (
                        <div className="animate-fadeIn rounded-lg bg-red-500/10 p-4 text-sm text-red-400 border border-red-500/20">
                            <div className="flex items-center">
                                <svg
                                    className="mr-2 h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {error}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-5">
                            {/* Form fields with labels */}
                            <div>
                                <label
                                    htmlFor="fullName"
                                    className="block text-sm font-medium text-slate-300 mb-2"
                                >
                                    Full Name
                                </label>
                                <input
                                    id="fullName"
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-slate-800/50 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            fullName: e.target.value
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-slate-300 mb-2"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-slate-800/50 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            email: e.target.value
                                        });
                                        validateField('email', e.target.value);
                                    }}
                                    required
                                />
                                {validationErrors.email && (
                                    <p className="mt-1 text-xs text-red-400">
                                        {validationErrors.email}
                                    </p>
                                )}
                            </div>
                            <div>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder=" "
                                        className={`peer w-full px-4 py-3 rounded-lg border bg-slate-800/50 text-white transition-all duration-200
                              ${validationErrors.password ? 'border-red-500' : 'border-slate-600'}`}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                password: e.target.value
                                            });
                                            validateField(
                                                'password',
                                                e.target.value
                                            );
                                        }}
                                        required
                                    />
                                    <label
                                        className="absolute left-2 -top-2.5 bg-slate-900 px-2 text-sm transition-all
                                  peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4
                                  peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-blue-500"
                                    >
                                        Password
                                    </label>
                                </div>

                                {/* Password strength indicator */}
                                <div className="mt-2">
                                    <div className="flex gap-1 h-1">
                                        {[...Array(4)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`h-full w-full rounded-full transition-all duration-300
                                 ${
                                     i < passwordStrength
                                         ? passwordStrength === 1
                                             ? 'bg-red-500'
                                             : passwordStrength === 2
                                               ? 'bg-yellow-500'
                                               : passwordStrength === 3
                                                 ? 'bg-green-500'
                                                 : 'bg-blue-500'
                                         : 'bg-slate-700'
                                 }`}
                                            />
                                        ))}
                                    </div>
                                    {validationErrors.password && (
                                        <p className="mt-1 text-xs text-red-400">
                                            {validationErrors.password}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium text-slate-300 mb-2"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-slate-800/50 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            confirmPassword: e.target.value
                                        })
                                    }
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Creating Account...
                                    </span>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-sm text-slate-400">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                        >
                            Sign in instead
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
