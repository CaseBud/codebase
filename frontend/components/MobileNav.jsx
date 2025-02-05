import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const MobileNav = ({ user, onSelectPrompt, isTempUser, isOpen, onClose }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        navigate('/login', { replace: true });
    };

    return (
        <div
            className={`fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-50 lg:hidden transition-all duration-300 
                  ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div
                className={`w-[280px] h-full bg-slate-800 transform transition-transform duration-300 
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="p-4 border-b border-slate-700/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div
                                className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg 
                            flex items-center justify-center"
                            >
                                <svg
                                    className="h-5 w-5 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-lg font-semibold text-white">
                                CaseBud
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                        >
                            <svg
                                className="w-5 h-5 text-slate-400"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">
                        Quick Prompts
                    </h3>
                    <div className="space-y-2">
                        {[
                            {
                                title: 'Criminal Rights',
                                prompt: 'What are my rights in a criminal case?',
                                icon: '⚖️'
                            },
                            {
                                title: 'Housing Laws',
                                prompt: 'Help with tenant rights and housing laws',
                                icon: '🏠'
                            },
                            {
                                title: 'Contract Law',
                                prompt: 'Explain contract terms and obligations',
                                icon: '📄'
                            }
                        ].map((item) => (
                            <button
                                key={item.title}
                                onClick={() => {
                                    onSelectPrompt(item.prompt);
                                    onClose();
                                }}
                                className="w-full p-3 text-left rounded-lg bg-slate-700/30 hover:bg-slate-700/50 
                          transition-colors flex items-center space-x-3"
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="text-sm text-slate-200">
                                    {item.title}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {user && (
                    <div className="absolute bottom-[72px] left-0 right-0 p-4 border-t border-slate-700/50">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-lg 
                       hover:bg-slate-700/50 text-red-400 hover:text-red-300 transition-colors"
                        >
                            <span>Logout</span>
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                        </button>
                    </div>
                )}

                {user && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
                                <span className="text-sm font-medium text-white">
                                    {user.fullName?.[0]?.toUpperCase() || 'U'}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                    {user.fullName || 'User'}
                                </p>
                                <p className="text-xs text-slate-400 truncate">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MobileNav;
