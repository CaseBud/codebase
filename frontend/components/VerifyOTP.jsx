import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const VerifyOTP = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const [canResend, setCanResend] = useState(false);

    // Get email from navigation state or localStorage
    const email =
        location.state?.email ||
        localStorage.getItem('pendingVerificationEmail');

    useEffect(() => {
        if (!email) {
            navigate('/register');
        }

        // Countdown timer
        let timer;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        setCanResend(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [countdown, email, navigate]);

    const handleOtpChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
        setOtp(value);

        // Auto-submit when 6 digits are entered
        if (value.length === 6) {
            handleSubmit(e, value);
        }
    };

    const handleSubmit = async (e, autoOtp = null) => {
        e?.preventDefault();
        const otpToSubmit = autoOtp || otp;

        if (!email) {
            setError('Email not found. Please register again.');
            return;
        }

        if (!otpToSubmit || otpToSubmit.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(
                'https://case-bud-backend-bzgqfka6daeracaj.centralus-01.azurewebsites.net/api/auth/verify-email',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        otp: otpToSubmit
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                // Store authentication data immediately
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem(
                        'user',
                        JSON.stringify(data.user || {})
                    );
                }
                localStorage.removeItem('pendingVerificationEmail');
                // Navigate directly to chat
                navigate('/chat', { replace: true });
            } else {
                setError(data.message || 'Invalid OTP. Please try again.');
            }
        } catch (err) {
            setError(
                'Network error. Please check your connection and try again.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (!canResend) return;

        try {
            const response = await fetch(
                'https://case-bud-backend.onrender.com/api/auth/resend-verification',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                }
            );

            if (response.ok) {
                setCountdown(30);
                setCanResend(false);
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to resend OTP');
            }
        } catch (err) {
            setError('Network error. Please try again.');
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
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white">
                            CaseBud
                        </h2>
                    </div>

                    <div className="mt-auto">
                        <h1 className="text-4xl font-bold text-white leading-tight">
                            Verify Your Account
                        </h1>
                        <p className="mt-4 text-lg text-blue-100">
                            We're committed to protecting your account with
                            secure verification.
                        </p>
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="bg-blue-900/20 backdrop-blur-sm p-4 rounded-lg">
                                <h3 className="text-white font-semibold">
                                    Secure Process
                                </h3>
                                <p className="text-blue-100 text-sm mt-1">
                                    Two-factor authentication
                                </p>
                            </div>
                            <div className="bg-blue-900/20 backdrop-blur-sm p-4 rounded-lg">
                                <h3 className="text-white font-semibold">
                                    Quick & Easy
                                </h3>
                                <p className="text-blue-100 text-sm mt-1">
                                    Verify in seconds
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - OTP Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white">
                            Verify Your Email
                        </h2>
                        <p className="mt-4 text-slate-400">
                            We've sent a verification code to
                            <br />
                            <span className="text-white font-medium">
                                {email || 'your email'}
                            </span>
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
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                className="w-full px-4 py-3 text-center text-2xl tracking-[1em] rounded-lg border border-slate-600 bg-slate-800/50 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                                onChange={handleOtpChange}
                                value={otp}
                                maxLength="6"
                                required
                            />
                            <div className="flex justify-center mt-2">
                                <div className="flex gap-2">
                                    {[...Array(6)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`w-3 h-1 rounded-full transition-all duration-200 ${
                                                i < otp.length
                                                    ? 'bg-blue-500'
                                                    : 'bg-slate-600'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
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
                                    Verifying...
                                </span>
                            ) : (
                                'Verify Email'
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <button
                            onClick={handleResendOtp}
                            disabled={!canResend}
                            className={`text-sm transition-colors duration-200 ${
                                canResend
                                    ? 'text-blue-400 hover:text-blue-300'
                                    : 'text-slate-500 cursor-not-allowed'
                            }`}
                        >
                            {canResend
                                ? 'Resend verification code'
                                : `Resend available in ${countdown}s`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyOTP;
