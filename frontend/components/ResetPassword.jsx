import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        email:
            location.state?.email || localStorage.getItem('resetEmail') || '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!formData.email) {
            navigate('/forgot-password');
        }
    }, [formData.email, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await authService.resetPassword({
                email: formData.email,
                otp: formData.otp,
                newPassword: formData.newPassword
            });

            // Clear stored email
            localStorage.removeItem('resetEmail');

            // Navigate to login with success message
            navigate('/login', {
                state: {
                    message:
                        'Password reset successful. Please login with your new password.'
                }
            });
        } catch (err) {
            setError(err.message || 'Failed to reset password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <div className="w-full max-w-md p-6">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white">
                        Reset Your Password
                    </h2>
                    <p className="mt-2 text-slate-400">
                        Enter the verification code and your new password
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-500/10 text-red-400 p-3 rounded text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                disabled
                                className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-slate-800/50 text-slate-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-slate-400 mb-2">
                                Reset Code
                            </label>
                            <input
                                type="text"
                                value={formData.otp}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        otp: e.target.value
                                    })
                                }
                                placeholder="Enter verification code"
                                className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-slate-800/50 text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-slate-400 mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={formData.newPassword}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        newPassword: e.target.value
                                    })
                                }
                                placeholder="Enter new password"
                                className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-slate-800/50 text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-slate-400 mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        confirmPassword: e.target.value
                                    })
                                }
                                placeholder="Confirm new password"
                                className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-slate-800/50 text-white"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    >
                        {isLoading ? 'Resetting Password...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
