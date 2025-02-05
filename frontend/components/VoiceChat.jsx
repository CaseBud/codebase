import React, { useState, useRef } from 'react';
import { fetchWithToken } from '../utils/api';

const VoiceChat = ({ onVoiceInput, disabled, onSubmit }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            });
            mediaRecorder.current = new MediaRecorder(stream);
            audioChunks.current = [];

            mediaRecorder.current.ondataavailable = (event) => {
                audioChunks.current.push(event.data);
            };

            mediaRecorder.current.onstop = async () => {
                const audioBlob = new Blob(audioChunks.current, {
                    type: 'audio/webm'
                });
                await handleTranscription(audioBlob);
            };

            mediaRecorder.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder.current?.state === 'recording') {
            mediaRecorder.current.stop();
            setIsRecording(false);
            mediaRecorder.current.stream
                .getTracks()
                .forEach((track) => track.stop());
        }
    };

    const handleTranscription = async (audioBlob) => {
        setIsProcessing(true);
        try {
            const formData = new FormData();
            formData.append('file', audioBlob);
            console.log(audioBlob);

            const response = await fetchWithToken(
                '/api/transcribe',
                {
                    method: 'POST',
                    body: formData
                },
                true // Skip content-type header for file upload
            );

            if (response.status === 'success' && response.data?.transcript) {
                // Update input field and trigger chat submission
                onVoiceInput({ target: { value: response.data.transcript } });
                onSubmit(response.data.transcript);
            }
        } catch (error) {
            console.error('Transcription error:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={disabled || isProcessing}
            className={`relative p-1.5 md:p-2 rounded-lg transition-all duration-200 ${
                isRecording
                    ? 'text-red-400'
                    : isProcessing
                      ? 'text-slate-500'
                      : 'text-slate-400 hover:text-white'
            }`}
            title={isRecording ? 'Stop recording' : 'Start voice input'}
        >
            {/* Microphone Icon */}
            <svg
                className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 ${
                    isRecording ? 'scale-110' : ''
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
            </svg>

            {/* Recording Animation */}
            {isRecording && (
                <div className="absolute -top-1 -right-1 flex space-x-0.5">
                    <div
                        className="w-1 h-1 bg-red-400 rounded-full animate-pulse"
                        style={{ animationDelay: '0ms' }}
                    />
                    <div
                        className="w-1 h-1 bg-red-400 rounded-full animate-pulse"
                        style={{ animationDelay: '150ms' }}
                    />
                    <div
                        className="w-1 h-1 bg-red-400 rounded-full animate-pulse"
                        style={{ animationDelay: '300ms' }}
                    />
                </div>
            )}

            {/* Processing Animation */}
            {isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-0.5">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="w-0.5 h-3 bg-slate-400 rounded-full animate-synthesizer"
                                style={{
                                    animationDelay: `${i * 100}ms`,
                                    animationDuration: '600ms'
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </button>
    );
};

export default VoiceChat;
