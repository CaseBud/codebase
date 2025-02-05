import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <div className="relative">
                <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-slate-600"></div>
                <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-blue-500 border-t-transparent"></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
