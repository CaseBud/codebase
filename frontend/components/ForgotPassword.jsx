import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await authService.forgotPassword(email);
            setIsEmailSent(true);
            // Store email for reset password page
            localStorage.setItem('resetEmail', email);
            // Navigate to reset password after showing success message
            setTimeout(() => {
                navigate('/reset-password', {
                    state: {
                        email,
                        fromForgotPassword: true // Add this flag
                    }
                });
            }, 2000);
        } catch (err) {
            setError(err.message || 'Failed to send reset code');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <div className="w-full max-w-md p-6">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white">
                        Reset Password
                    </h2>
                    <p className="mt-2 text-slate-400">
                        Enter your email to receive a password reset code
                    </p>
                </div>

                {isEmailSent ? (
                    <div className="text-center">
                        <div className="mb-4 text-green-400">
                            <svg
                                className="w-16 h-16 mx-auto"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <p className="text-white mb-4">
                            Reset instructions sent!
                        </p>
                        <p className="text-slate-400">
                            Please check your email for the reset code.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 text-red-400 p-3 rounded text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-slate-800/50 text-white"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                        >
                            {isLoading
                                ? 'Sending...'
                                : 'Send Reset Instructions'}
                        </button>
                    </form>
                )}

                <div className="mt-6 text-center">
                    <Link
                        to="/login"
                        className="text-blue-400 hover:text-blue-300"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
