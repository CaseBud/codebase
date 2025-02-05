import React, { useEffect } from 'react';

const NotificationIcon = ({ type }) => {
    switch (type) {
        case 'error':
            return (
                <svg
                    className="w-5 h-5 text-red-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M15 9l-6 6" />
                    <path d="M9 9l6 6" />
                </svg>
            );
        case 'success':
            return (
                <svg
                    className="w-5 h-5 text-green-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9 12l2 2 4-4" />
                </svg>
            );
        default:
            return null;
    }
};

const Notification = ({
    message,
    type = 'error',
    onClose,
    duration = 5000
}) => {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    return (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
            <div
                className={`flex items-center space-x-3 p-4 rounded-lg shadow-lg ${
                    type === 'error'
                        ? 'bg-red-500/10 border border-red-500/20'
                        : 'bg-green-500/10 border border-green-500/20'
                }`}
            >
                <NotificationIcon type={type} />
                <p
                    className={`text-sm ${type === 'error' ? 'text-red-400' : 'text-green-400'}`}
                >
                    {message}
                </p>
                <button
                    onClick={onClose}
                    className="ml-2 text-slate-400 hover:text-white transition-colors"
                >
                    <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M18 6L6 18" />
                        <path d="M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

// Add this line to fix the export error
export default Notification;
