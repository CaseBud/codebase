import React from 'react';

const MobileBottomBar = ({
    onNewChat,
    onToggleHistory,
    isHistoryOpen,
    onToggleMenu,
    isWebMode,
    onToggleWebMode
}) => {
    return (
        <div
            className="fixed bottom-0 left-0 right-0 bg-slate-800/95 backdrop-blur-sm border-t 
                    border-slate-700/50 lg:hidden z-10 h-12"
        >
            {' '}
            {/* Added h-12 for fixed height */}
            <div className="flex items-center justify-around h-full">
                {' '}
                {/* Added h-full */}
                <button
                    onClick={onToggleMenu}
                    className="p-3 rounded-lg hover:bg-slate-700/50 transition-colors flex flex-col 
                    items-center space-y-1"
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
                            d="M4 6h16M4 12h16M4 18h7"
                        />
                    </svg>
                    <span className="text-xs text-slate-400">Menu</span>
                </button>
                <button
                    onClick={onToggleWebMode}
                    className={`p-3 rounded-lg transition-colors flex flex-col items-center space-y-1
                    ${isWebMode ? 'text-blue-400' : 'text-slate-400'}`}
                >
                    <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    <span className="text-xs">Web Search</span>
                </button>
                <button
                    onClick={onNewChat}
                    className="p-3 rounded-lg hover:bg-slate-700/50 transition-colors flex flex-col 
                    items-center space-y-1"
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
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    <span className="text-xs text-slate-400">New Chat</span>
                </button>
                <button
                    onClick={onToggleHistory}
                    className={`p-3 rounded-lg transition-colors flex flex-col items-center space-y-1
                    ${isHistoryOpen ? 'text-blue-400' : 'text-slate-400'}`}
                >
                    <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span className="text-xs">History</span>
                </button>
            </div>
        </div>
    );
};

export default MobileBottomBar;
