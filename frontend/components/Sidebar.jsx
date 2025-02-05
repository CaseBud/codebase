import React from 'react';
import {
    GiScales,
    GiHandcuffs,
    GiHouse,
    GiPublicSpeaker
} from 'react-icons/gi';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ user, onSelectPrompt }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleLogout = () => {
        authService.logout();
        navigate('/login', { replace: true });
    };

    return (
        <div className="hidden md:flex w-64 flex-shrink-0 bg-slate-800/50 backdrop-blur-sm h-screen">
            <div className="flex flex-col w-full relative h-full">
                <div className="p-4 border-t border-transparent">
                    <h2 className="text-lg font-semibold text-white">
                        CaseBud AI
                    </h2>
                    <p className="text-sm text-slate-400">Legal Assistant</p>
                </div>

                <div className="flex-1 p-4 pb-24 overflow-y-auto">
                    <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">
                        Quick Prompts
                    </h3>
                    <div className="space-y-2">
                        <button
                            onClick={() =>
                                onSelectPrompt(
                                    'What are my rights in a criminal case?'
                                )
                            }
                            className="w-full p-3 text-left rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
                        >
                            <div className="flex items-center">
                                <GiHandcuffs className="mr-3 text-slate-400" />
                                <span className="text-sm text-slate-200">
                                    Criminal Rights
                                </span>
                            </div>
                        </button>

                        <button
                            onClick={() =>
                                onSelectPrompt(
                                    'Help with tenant rights and housing laws'
                                )
                            }
                            className="w-full p-3 text-left rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
                        >
                            <div className="flex items-center">
                                <GiHouse className="mr-3 text-slate-400" />
                                <span className="text-sm text-slate-200">
                                    Housing Laws
                                </span>
                            </div>
                        </button>

                        <button
                            onClick={() =>
                                onSelectPrompt(
                                    'Explain contract terms and obligations'
                                )
                            }
                            className="w-full p-3 text-left rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
                        >
                            <div className="flex items-center">
                                <GiScales className="mr-3 text-slate-400" />
                                <span className="text-sm text-slate-200">
                                    Contract Law
                                </span>
                            </div>
                        </button>

                        <button
                            onClick={() =>
                                onSelectPrompt(
                                    'Help analyze this legal document'
                                )
                            }
                            className="w-full p-3 text-left rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
                        >
                            <div className="flex items-center">
                                <GiPublicSpeaker className="mr-3 text-slate-400" />
                                <span className="text-sm text-slate-200">
                                    Document Analysis
                                </span>
                            </div>
                        </button>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                            Tips
                        </h3>
                        <div className="space-y-2 text-sm text-slate-300">
                            <p>• Ask specific legal questions</p>
                            <p>• Provide context when needed</p>
                            <p>• Request case law citations</p>
                        </div>
                    </div>
                </div>

                {!isAuthenticated && (
                    <div className="p-4">
                        <Link
                            to="/register"
                            className="block w-full text-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Register
                        </Link>
                    </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-800/50 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
                                <span className="text-sm font-medium text-white">
                                    {user?.fullName?.[0]?.toUpperCase() || 'U'}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                    {user?.fullName || 'User'}
                                </p>
                                <p className="text-xs text-slate-400 truncate">
                                    {user?.email || 'user@example.com'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/50 transition-colors"
                            title="Logout"
                        >
                            <FiLogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
