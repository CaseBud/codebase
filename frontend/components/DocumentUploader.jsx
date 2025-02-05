import React, { useState, useRef } from 'react';
import { documentsApi } from '../utils/api';
import Notification from './Notification';

const DocumentIcon = () => (
    <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
    >
        <path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v16.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h12.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V7L15.5 2z" />
        <path d="M15 2v5h5" />
        <path d="M10 13h8" />
        <path d="M10 17h8" />
        <path d="M10 9h2" />
    </svg>
);

const ProgressRing = ({ progress }) => {
    const radius = 10;
    const strokeWidth = 1;
    const normalizedRadius = radius - strokeWidth;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative w-6 h-6 transform transition-transform duration-300 scale-110">
            <svg className="transform -rotate-90 w-full h-full">
                {/* Background circle */}
                <circle
                    stroke="currentColor"
                    className="text-slate-600"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                {/* Progress circle */}
                <circle
                    stroke="currentColor"
                    className="text-blue-500 transition-all duration-300 ease-in-out"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    r={normalizedRadius}
                    cx={radius + 2}
                    cy={radius + 2}
                />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-slate-200">
                {progress}%
            </span>
        </div>
    );
};

const UploadingAnimation = ({ progress }) => (
    <div className="relative transform transition-all duration-300 ease-out">
        <div className="absolute inset-0 bg-blue-500/20 animate-pulse rounded-full" />
        <ProgressRing progress={progress} />
    </div>
);

const DocumentUploader = ({ onUploadComplete }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [notification, setNotification] = useState(null);
    const fileInputRef = useRef(null);

    const simulateProgress = (callback) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 90) {
                clearInterval(interval);
                return;
            }
            setUploadProgress(Math.min(Math.round(progress), 90));
        }, 200);

        return () => clearInterval(interval);
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsUploading(true);
        setUploadProgress(0);

        try {
            // Start progress simulation
            const stopProgress = simulateProgress();

            // Log file details for debugging
            console.log('File details:', {
                name: file.name,
                size: file.size,
                type: file.type,
                sizeInMB: file.size / (1024 * 1024)
            });

            // File type validation
            const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
            const fileExt = '.' + file.name.split('.').pop().toLowerCase();
            if (!allowedTypes.includes(fileExt)) {
                throw new Error(
                    `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`
                );
            }

            const response = await documentsApi.uploadDocument(file, file.name);

            // Complete the progress animation
            stopProgress();
            setUploadProgress(100);

            // Show success with a slight delay for smooth animation
            setTimeout(() => {
                onUploadComplete?.(response);
                showNotification('Document uploaded successfully', 'success');
                event.target.value = '';
            }, 300);

            // Reset after animation completes
            setTimeout(() => {
                setUploadProgress(0);
                setIsUploading(false);
            }, 800);
        } catch (error) {
            console.error('Failed to upload document:', error);
            let errorMessage = error.message;

            // Handle specific error cases
            if (error.status === 413) {
                errorMessage =
                    'File size too large. Please try a smaller file.';
            } else if (error.status === 415) {
                errorMessage = 'Invalid file type. Please try another format.';
            }

            showNotification(
                errorMessage || 'Failed to upload document. Please try again.'
            );
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const showNotification = (message, type = 'error') => {
        setNotification({ message, type });
    };

    return (
        <>
            <div className="relative group">
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 rounded-md text-slate-400 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
                    title="Click to upload a document"
                >
                    {isUploading ? (
                        <UploadingAnimation progress={uploadProgress} />
                    ) : (
                        <DocumentIcon />
                    )}
                </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt"
                />

                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-xs text-slate-200 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Upload document
                </div>
            </div>

            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
        </>
    );
};

export default DocumentUploader;
