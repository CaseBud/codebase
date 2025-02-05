import React, { useState, useRef, useEffect } from 'react';
import { chatApi } from '../utils/api';
import { authService } from '../services/authService';
import Sidebar from './Sidebar';
import ChatHistory from './ChatHistory';
import TypingAnimation from './TypingAnimation'; // Ensure this import is correct
import DocumentUploader from './DocumentUploader';
import DocumentPreview from './DocumentPreview';
import VoiceChat from './VoiceChat';
import { useLocation, useNavigate } from 'react-router-dom';
import MobileNav from './MobileNav';
import MobileBottomBar from './MobileBottomBar'; // Ensure this import is correct

// Replace lucide-react imports with SVG components
const IconComponents = {
    MessageCircle: (props) => (
        <svg
            className="h-6 w-6 text-black-600"
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
    ),
    System: (props) => (
        <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13 10V3L4 14h7v7l9-11h-7z"
            />
        </svg>
    ),
    Send: (props) => (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
    ),
    User: (props) => (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    ),
    Loader2: (props) => (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    ),
    Globe: (props) => (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    ),
    ChevronRight: (props) => (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M9 18l6-6-6-6" />
        </svg>
    ),
    Tools: (props) => (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 7 L12 3 L21 7 L12 11 Z" fill="none" />
            <path d="M3 7 L3 17 L12 21 L12 11 Z" fill="none" />
            <path d="M21 7 L21 17 L12 21 L12 11 Z" fill="none" />

            <circle cx="7" cy="14" r="1.5" />
            <circle cx="12" cy="16" r="1.5" />
            <circle cx="17" cy="14" r="1.5" />

            <line
                x1="12"
                y1="11"
                x2="12"
                y2="21"
                stroke="currentColor"
                opacity="0.3"
            />
            <line
                x1="3"
                y1="7"
                x2="12"
                y2="11"
                stroke="currentColor"
                opacity="0.3"
            />
            <line
                x1="21"
                y1="7"
                x2="12"
                y2="11"
                stroke="currentColor"
                opacity="0.3"
            />
        </svg>
    ),
    Wikipedia: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.09 13.119c-.936 1.932-2.217 4.548-2.853 5.728-.616 1.074-1.127.931-1.532.029-1.406-3.321-4.293-9.144-5.651-12.409-.251-.601-.441-.987-.619-1.139-.181-.15-.554-.24-1.122-.271C.103 5.033 0 4.982 0 4.898v-.455l.052-.045c.924-.005 5.401 0 5.401 0l.051.045v.434c0 .119-.075.176-.225.176l-.564.031c-.485.029-.727.164-.727.436 0 .135.053.33.166.601 1.082 2.646 4.818 10.521 4.818 10.521l.136.046 2.411-4.81-.482-1.067-1.658-3.264s-.318-.654-.428-.872c-.728-1.443-.712-1.518-1.447-1.617-.207-.023-.313-.05-.313-.149v-.468l.06-.045h4.292l.113.037v.451c0 .105-.076.15-.227.15l-.308.047c-.792.061-.661.381-.136 1.422l1.582 3.252 1.758-3.504c.293-.64.233-.801.111-.947-.07-.084-.305-.22-.812-.24l-.201-.021c-.052 0-.098-.015-.145-.051-.045-.031-.067-.076-.067-.129v-.427l.061-.045c1.247-.008 4.043 0 4.043 0l.059.045v.436c0 .121-.059.178-.193.178-.646.03-1.023.095-1.023.439-.12.186-.375.589-.646 1.039l-2.301 4.273-.065.135 2.792 5.712.17.048 4.396-10.438c.154-.422.129-.722-.064-.895-.197-.174-.346-.277-.857-.277l-.423-.015c-.061 0-.105-.014-.152-.045-.043-.029-.072-.075-.072-.119v-.436l.059-.045h4.961l.041.045v.437c0 .119-.074.18-.209.18-.648.03-1.127.18-1.443.421-.314.255-.557.616-.736 1.067 0 0-4.043 9.258-5.426 12.339-.525 1.007-1.053.917-1.503-.031-.571-1.171-1.773-3.786-2.646-5.71l.053-.036z" />
        </svg>
    ),
    Google: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8c1.93 0 3.68.68 5.07 1.81L14.1 9.9c-.56-.56-1.32-.9-2.1-.9-1.66 0-3 1.34-3 3s1.34 3 3 3c1.38 0 2.54-.93 2.87-2.18H12v-2.82h5.64c.09.5.14 1.01.14 1.54 0 4.41-3.59 8-8 8z" />
        </svg>
    ),
    Facebook: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.324V1.325C24 .593 23.407 0 22.675 0z" />
        </svg>
    ),
    Default: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
        </svg>
    )
};

const Chat = () => {
    const user = authService.getCurrentUser();
    // Create greeting with user's name - update this line
    const defaultGreeting = `Hello ${user?.fullName || user?.name || 'there'}! How can I help you today?`;
    const location = useLocation();
    const navigate = useNavigate();
    const isTempUser = location.state?.tempUser || false;

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            type: 'assistant',
            content: {
                response: defaultGreeting,
                query: null
            },
            timestamp: new Date()
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const chatContainerRef = useRef(null);
    const inputRef = useRef(null);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [currentconversationId, setCurrentconversationId] = useState(null);
    const [selectedDocuments, setSelectedDocuments] = useState([]);
    const [uploadedDocuments, setUploadedDocuments] = useState([]);
    const [isNewConversation, setIsNewConversation] = useState(true);
    const [isDocumentAnalysis, setIsDocumentAnalysis] = useState(false);
    const [documentAnalysisId, setDocumentAnalysisId] = useState(null);
    const [isIncognito, setIsIncognito] = useState(false); // Add incognito mode state
    const [activeDocuments, setActiveDocuments] = useState([]); // Add this new state
    const [isWebMode, setIsWebMode] = useState(false); // Add new state for web browsing mode
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isToolsOpen, setIsToolsOpen] = useState(false);
    const historyRef = useRef(null);

    useEffect(() => {
        if (!isIncognito && isHistoryOpen) {
            fetchConversations();
        }
    }, [isIncognito, isHistoryOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Only handle outside clicks on desktop
            if (window.innerWidth >= 768) {
                if (
                    historyRef.current &&
                    !historyRef.current.contains(event.target)
                ) {
                    setIsHistoryOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const fetchConversations = async () => {
        try {
            const response = await chatApi.getConversations();

            // Check if response exists
            if (!response?.conversations) {
                console.warn('No data in response');
                return [];
            }

            const conversations = response.conversations.map((conv) => ({
                _id: conv._id, // Keep the original _id
                id: conv._id, // Add id for compatibility
                title: conv.title,
                created_at: conv.createdAt,
                updated_at: conv.updatedAt
            }));
            setConversations(conversations);
        } catch (error) {
            console.error('Failed to fetch conversations:', error);
            throw error;
        }
    };

    const handleDeleteChat = async (conversationId) => {
        if (isIncognito) return; // Disable chat deletion in incognito mode

        try {
            await fetch(
                `https://case-bud-backend-bzgqfka6daeracaj.centralus-01.azurewebsites.net/api/chat/${conversationId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${authService.getToken()}`
                    }
                }
            );
            setConversations((prev) =>
                prev.filter((chat) => chat.id !== conversationId)
            );
            if (currentconversationId === conversationId) {
                setMessages([]);
                setCurrentconversationId(null);
            }
        } catch (error) {
            console.error('Failed to delete chat:', error);
        }
    };

    const handleEditTitle = async (conversationId, newTitle) => {
        if (isIncognito) return; // Disable chat title editing in incognito mode

        try {
            await fetch(
                `https://case-bud-backend-bzgqfka6daeracaj.centralus-01.azurewebsites.net/api/chat/${conversationId}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${authService.getToken()}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title: newTitle })
                }
            );
            fetchConversations(); // Refresh the conversation list
        } catch (error) {
            console.error('Failed to update chat title:', error);
        }
    };

    // Helper function to simulate typing and show response gradually
    const showResponseGradually = async (response) => {
        setIsTyping(true);
        const characters = response.split('');
        let currentText = '';
        const charDelay = 5;
        const variation = 7;
        const maxTypingTime = 10000; // 10 seconds
        const startTime = Date.now();

        try {
            if (isWebMode) {
                return;
            }
            for (let i = 0; i < characters.length; i++) {
                if (i == 0) {
                    setIsTyping(false);
                }
                const elapsedTime = Date.now() - startTime;
                if (elapsedTime > maxTypingTime) {
                    currentText = response;
                    break;
                }
                
                await new Promise((resolve) => setTimeout(resolve, charDelay));
                await new Promise((resolve) =>
                    setTimeout(resolve, Math.random() * variation)
                );
                
                currentText += characters[i];
                setMessages((prev) => {
                    const newMessages = [...prev];
                    const lastIndex = newMessages.length - 1;
                    if (
                        lastIndex >= 0 &&
                        newMessages[lastIndex].type === 'assistant'
                    ) {
                        newMessages[lastIndex] = {
                            ...newMessages[lastIndex],
                            content: {
                                ...newMessages[lastIndex].content,
                                response: currentText
                            }
                        };
                    }
                    return newMessages;
                });
                
                if (['.', '?', '!', ',', ';'].includes(characters[i])) {
                    await new Promise((resolve) => setTimeout(resolve, 75));
                }
            }
        } finally {
            setMessages((prev) => {
                const newMessages = [...prev];
                const lastIndex = newMessages.length - 1;
                if (
                    lastIndex >= 0 &&
                    newMessages[lastIndex].type === 'assistant'
                ) {
                    newMessages[lastIndex] = {
                        ...newMessages[lastIndex],
                        content: {
                            ...newMessages[lastIndex].content,
                            response: response
                        }
                    };
                }
                return newMessages;
            });
            setIsTyping(false);
        }
    };

    const handleDocumentSelect = (docId) => {
        if (isIncognito) return; // Disable document selection in incognito mode

        setSelectedDocuments((prev) => {
            const isSelected = prev.includes(docId);
            return isSelected
                ? prev.filter((id) => id !== docId)
                : [...prev, docId];
        });
    };

    const handleUploadComplete = (response) => {
        if (isIncognito) return;
        const document = response.data.document;
        console.log('Uploaded document details:', {
            id: document._id,
            name: document.name,
            type: document.type,
            size: document.size
        });

        setUploadedDocuments((prev) => [...prev, document]);
        setActiveDocuments((prev) => {
            const newActiveDocuments = [...prev, document._id];
            return newActiveDocuments;
        });
        if (!isDocumentAnalysis) {
            setMessages((prev) => [
                ...prev,
                {
                    type: 'system',
                    content: {
                        response: 'Switched to document analysis chat'
                    },
                    documents: [],
                    timestamp: new Date()
                }
            ]);
        }
        setIsWebMode(false);
        setIsDocumentAnalysis(true);

        setMessages((prev) => [
            ...prev,
            {
                type: 'system',
                content: {
                    response:
                        'Document uploaded and ready for analysis. You can now ask questions about this document.'
                },
                documents: [document],
                timestamp: new Date()
            }
        ]);
    };

    // Ensure document analysis chat sets conversationId to null when starting a new document chat
    const handleDocumentAnalysis = async (query, documentIds) => {
        if (isIncognito) return; // Disable document analysis in incognito mode

        try {
            setCurrentconversationId(null); // Reset conversationId for new document chat
            const response = await chatApi.sendDocumentAnalysis(
                query,
                documentIds,
                documentAnalysisId
            );
            await showResponseGradually(
                response.response || 'No response received'
            );
        } catch (error) {
            console.error('Document analysis error:', error);
            setMessages((prev) => [
                ...prev,
                {
                    type: 'error',
                    content:
                        error.message ||
                        'Failed to analyze document. Please try again.',
                    timestamp: new Date()
                }
            ]);
        }
    };

    const sendMessage = async (content) => {
        if (!content?.trim() || isTyping) return;

        const newUserMessage = {
            type: 'user',
            content: {
                query: content,
                response: null
            },
            timestamp: new Date()
        };

        try {
            setMessages((prev) => [...prev, newUserMessage]);
            setMessage('');
            setIsTyping(true);

            let response;

            if (isDocumentAnalysis) {
                try {
                    localStorage.removeItem('lastConversationId');
                    localStorage.removeItem('currentChatMessages');
                    response = await chatApi.sendDocumentAnalysis(
                        content.trim(),
                        activeDocuments.length > 0 ? activeDocuments : null,
                        documentAnalysisId
                    );

                    if (!response) {
                        throw new Error('No response from document analysis');
                    }
                    setActiveDocuments([]); // Clear documents
                    setDocumentAnalysisId(response.conversationId);
                    setIsDocumentAnalysis(true);

                    // Update: Don't add empty assistant message here
                    // Instead, wait for the actual response
                    const assistantMessage = {
                        type: 'assistant',
                        content: {
                            query: content,
                            response: response.response || response.message
                        },
                        documents: [],
                        timestamp: new Date()
                    };

                    setMessages((prev) => [...prev, assistantMessage]);
                    await showResponseGradually(
                        response.response || response.message
                    );
                } catch (docError) {
                    console.error('Document analysis error details:', docError);
                    setMessages((prev) => [
                        ...prev,
                        {
                            type: 'error',
                            content: {
                                response:
                                    'Document analysis failed. Please try again.'
                            },
                            timestamp: new Date()
                        }
                    ]);
                }
            } else {
                if (
                    documentAnalysisId ||
                    localStorage.getItem('lastConversationId')
                ) {
                    if (
                        documentAnalysisId &&
                        localStorage.getItem('lastConversationId', null) !==
                            documentAnalysisId
                    ) {
                        setMessages((prev) => [
                            ...prev,
                            {
                                type: 'system',
                                content: {
                                    response:
                                        'Switched to general conversation mode'
                                },
                                documents: [],
                                timestamp: new Date()
                            }
                        ]);
                    }
                    if (isWebMode) {
                        setMessages((prev) => [
                            ...prev,
                            {
                                type: 'system',
                                content: {
                                    response:
                                        'Switched to web browsing mode (beta)'
                                },
                                documents: [],
                                timestamp: new Date()
                            }
                        ]);
                    }
                }
                setDocumentAnalysisId(null);
                setIsDocumentAnalysis(false);
                response = await chatApi.sendMessage(content.trim(), {
                    conversationId: currentconversationId,
                    webSearch: isWebMode
                });
                setCurrentconversationId(response.conversationId);
                if (isWebMode) {
                    setMessages((prev) => [
                        ...prev,
                        {
                            type: 'system',
                            content: {
                                response:
                                    'Searching the web for relevant sources...'
                            },
                            timestamp: new Date()
                        }
                    ]);
                    // await showResponseGradually(
                    //     messages[messages.length - 1].content.response
                    // );
                }

                const assistantMessage = {
                    type: isWebMode ? 'system' : 'assistant',
                    content: {
                        response: response.response || response.message
                    },
                    isWebSearch: isWebMode,
                    timestamp: new Date()
                };

                // if (isWebMode) {
                //     // Update: Don't add empty assistant message here
                //     // Instead, wait for the actual response
                // }

                setMessages((prev) => [...prev, assistantMessage]);

                await showResponseGradually(
                    response.response || response.message
                );
            }

            localStorage.setItem('lastConversationId', response.conversationId);
            localStorage.setItem(
                'currentChatMessages',
                JSON.stringify(messages)
            );
        } catch (error) {
            console.error('Chat error:', error);
            setIsTyping(false);
            setMessages((prev) => [
                ...prev,
                {
                    type: 'error',
                    content: error.message || 'Failed to process your request.',
                    timestamp: new Date()
                }
            ]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(message);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleSelectPrompt = (promptText) => {
        setMessage(promptText);
        inputRef.current?.focus();
    };

    const createNewChat = async () => {
        if (isIncognito) return; // Disable new chat creation in incognito mode

        try {
            await fetchConversations(); // Refresh the conversation list
            // Reset current chat state
            setMessages([
                {
                    type: 'assistant',
                    content: {
                        response: defaultGreeting,
                        query: null
                    },
                    timestamp: new Date()
                }
            ]);
            setCurrentconversationId(null);
            setIsNewConversation(true);
            setMessage('');
            setSelectedDocuments([]);
            setDocumentAnalysisId(null);
            setIsDocumentAnalysis(false);
            localStorage.removeItem('lastConversationId');
            localStorage.removeItem('currentChatMessages');

            if (window.innerWidth < 768) {
                setIsHistoryOpen(false);
            }

            // Scroll to bottom after creating a new chat
            chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('Failed to create new chat:', error);
        }
    };

    // Replace the existing handleNewChat with createNewChat
    const handleNewChat = createNewChat;

    const handleVoiceInput = (text) => {
        if (typeof text === 'string') {
            setMessage(text);
            // Auto submit after voice transcription
            sendMessage(text);
        } else {
            setMessage(text.target.value);
        }
    };

    const toggleIncognitoMode = () => {
        setIsIncognito(!isIncognito);
        if (!isIncognito) {
            // Clear current chat state when entering incognito mode
            setMessages([
                {
                    type: 'assistant',
                    content: {
                        response: defaultGreeting,
                        query: null
                    },
                    timestamp: new Date()
                }
            ]);
            setCurrentconversationId(null);
            setIsNewConversation(true);
            setMessage('');
            setSelectedDocuments([]);
            setUploadedDocuments([]);
            setDocumentAnalysisId(null);
            setIsDocumentAnalysis(false);
        }
    };

    const clearActiveDocuments = () => {
        setActiveDocuments([]);
        setMessages((prev) => [
            ...prev,
            {
                type: 'system',
                content: 'Switched to general conversation mode',
                timestamp: new Date()
            }
        ]);
    };

    const handleRegister = () => {
        navigate('/register');
    };

    const isMobile = () => window.innerWidth < 768;

    const MessageBubble = ({ message }) => {
        const [isCopied, setIsCopied] = useState(false);
        const timeoutRef = useRef(null);

        const handleCopy = async () => {
            try {
                await navigator.clipboard.writeText(message.content.response);
                setIsCopied(true);

                // Reset the "Copied!" message after 2 seconds
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => setIsCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        };

        const isUser = message.type === 'user';
        const isError = message.type === 'error';
        const isSystem = message.type === 'system';

        // Updated message type classes
        const messageTypeClasses = isUser
            ? 'bg-blue-600 text-white ml-auto rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl'
            : isError
              ? 'bg-red-500/10 text-red-400 border border-red-500/20 rounded-2xl'
              : isSystem
                ? 'bg-slate-600/50 text-slate-200 rounded-2xl mx-auto'
                : 'bg-slate-700/50 backdrop-blur-sm text-slate-100 mr-auto rounded-tr-2xl rounded-br-2xl rounded-tl-2xl';

        const getSiteIcon = (url) => {
            try {
                const hostname = new URL(url).hostname.toLowerCase();
                if (hostname.includes('wikipedia.org')) return 'Wikipedia';
                if (hostname.includes('google.com')) return 'Google';
                if (hostname.includes('facebook.com')) return 'Facebook';
                return 'Default';
            } catch {
                return 'Default';
            }
        };

        return (
            <div
                className={`group flex items-end gap-2 px-2 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
                {/* Assistant/System Avatar - Adjusted size */}
                {(message.type === 'assistant' ||
                    message.type === 'system') && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mb-1">
                        {message.type === 'system' ? (
                            <IconComponents.System className="w-5 h-5 text-white" />
                        ) : (
                            <IconComponents.MessageCircle className="w-5 h-5 text-white" />
                        )}
                    </div>
                )}

                <div
                    className={`flex flex-col max-w-[75%] md:max-w-[65%] space-y-1 ${
                        message.type === 'user' ? 'ml-auto' : ''
                    }`}
                >
                    <div
                        className={`px-3 py-2 ${
                            message.type === 'user'
                                ? 'bg-blue-600 text-white ml-auto rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl'
                                : message.type === 'system'
                                  ? 'bg-slate-600/50 text-slate-200 rounded-2xl mx-auto'
                                  : 'bg-slate-700/50 backdrop-blur-sm text-slate-100 mr-auto rounded-tr-2xl rounded-br-2xl rounded-tl-2xl'
                        }`}
                    >
                        {/* Show typing animation only if message is empty and isTyping is true */}
                        {message.content.response === '' && isTyping ? (
                            <TypingAnimation />
                        ) : (
                            <p className="whitespace-pre-wrap text-sm">
                                {message.type === 'user'
                                    ? message.content.query
                                    : message.content.response}
                            </p>
                        )}

                        {/* Document Preview - Inside the message bubble */}
                        {message.documents && message.documents.length > 0 && (
                            <div className="mt-3 border-t border-slate-500/30 pt-3">
                                {message.documents.map((doc, index) => (
                                    <DocumentPreview
                                        key={index}
                                        document={doc}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {!(message.type === 'user') &&
                        (message.type === 'system' ||
                            message.type === 'assistant') && (
                            <div className="mt-2 space-y-2">
                                {/* Show web sources if they exist */}
                                {message.isWebSearch && (
                                    <>
                                        <div className="flex items-center gap-1.5 px-1">
                                            <IconComponents.Globe className="w-3.5 h-3.5 text-blue-400" />
                                            <span className="text-xs font-medium text-blue-400">
                                                Web References
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            {[
                                                {
                                                    url: 'https://www.google.com/',
                                                    title: 'Google Search Results'
                                                },
                                                {
                                                    url: 'https://wikipedia.org/',
                                                    title: 'Wikipedia Reference'
                                                },
                                                {
                                                    url: 'https://facebook.com/',
                                                    title: 'Public Information'
                                                }
                                            ].map((source, index) => {
                                                const SiteIcon =
                                                    IconComponents[
                                                        getSiteIcon(source.url)
                                                    ];
                                                return (
                                                    <a
                                                        key={index}
                                                        href={source.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 
                                   hover:bg-slate-700/50 transition-colors"
                                                    >
                                                        <div className="flex items-start gap-2">
                                                            <div className="flex-shrink-0 w-4 h-4 mt-0.5 text-slate-400">
                                                                <SiteIcon className="w-full h-full" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="text-sm text-blue-400 font-medium truncate mb-0.5">
                                                                    {source.title ||
                                                                        'Web Source'}
                                                                </h4>
                                                                <p className="text-xs text-slate-400 truncate">
                                                                    {source.url}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                    {/* Timestamp */}
                    <div
                        className={`flex items-center gap-2 text-xs text-slate-400 ${
                            message.type === 'user'
                                ? 'justify-end'
                                : 'justify-start'
                        }`}
                    >
                        <span className="opacity-60">
                            {new Date(message.timestamp).toLocaleTimeString(
                                [],
                                {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }
                            )}
                        </span>
                    </div>
                </div>

                {/* User Avatar - Also adjusted size for consistency */}
                {message.type === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center mb-1">
                        <IconComponents.User className="w-5 h-5 text-white" />
                    </div>
                )}
            </div>
        );
    };

    // Add toggle function for history
    const toggleHistory = () => {
        if (!isHistoryOpen) {
            fetchConversations();
        }
        setIsHistoryOpen(!isHistoryOpen);
    };

    // Add new function to handle textarea height
    const adjustTextareaHeight = (element) => {
        element.style.height = 'auto'; // Reset height to recalculate
        const newHeight = Math.min(element.scrollHeight, 120); // Max height of 120px
        element.style.height = !element.value ? '44px' : `${newHeight}px`; // Default height when empty
    };

    // Update message state handler to include height adjustment
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
        adjustTextareaHeight(e.target);
    };

    // Add new effect to handle page reload
    useEffect(() => {
        const restoreChat = async () => {
            // Try to get last conversation from localStorage
            const lastConversationId =
                localStorage.getItem('lastConversationId');
            const savedMessages = JSON.parse(
                localStorage.getItem('currentChatMessages') || '[]'
            );

            if (savedMessages.length > 0) {
                setMessages(savedMessages);
            }

            if (lastConversationId) {
                try {
                    await handleSelectChat(lastConversationId);
                } catch (error) {
                    console.error('Failed to restore chat:', error);
                    // If chat restoration fails, start a new chat
                    createNewChat();
                }
            }

            // Scroll to bottom after restoring chat
            chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
        };

        restoreChat();
    }, []);

    // Add effect to save current chat state
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem(
                'currentChatMessages',
                JSON.stringify(messages)
            );
        }
        if (currentconversationId) {
            localStorage.setItem('lastConversationId', currentconversationId);
        }
    }, [messages, currentconversationId]);

    // Modify handleSelectChat to close history on desktop
    const handleSelectChat = async (conversationId) => {
        if (isIncognito) return;

        try {
            const conversation =
                await chatApi.getConversationById(conversationId);
            if (!conversation) {
                throw new Error('Chat not found');
            }

            // Transform messages to match the new structure
            const formattedMessages = [];
            if (conversation.type === 'document-analysis') {
                const documents = [];

                conversation.messages.forEach((msg) => {
                    documents.push(...msg.documents);
                });

                formattedMessages.push({
                    type: 'system',
                    content: {
                        response: 'Uploaded documents:'
                    },
                    documents,
                    timestamp: new Date()
                });
            }
            conversation.messages.forEach((msg) => {
                // First add the user message if it exists
                if (msg.content.query) {
                    formattedMessages.push({
                        type: 'user',
                        content: {
                            query: msg.content.query
                        },
                        timestamp: msg.timestamp
                    });
                }

                // Then add web search indicator before the response if it's a web search
                if (msg.isWebSearch) {
                    formattedMessages.push({
                        type: 'system',
                        content: {
                            response: 'Sources:'
                        },
                        isWebSearch: true,
                        timestamp: msg.timestamp
                    });
                }

                // Finally add the assistant response
                formattedMessages.push({
                    type: msg.isWebSearch ? 'system' : 'assistant',
                    content: {
                        response: msg.content.response
                    },
                    isWebSearch: msg.isWebSearch,
                    timestamp: msg.timestamp
                });
            });

            if (conversation.type === 'document-analysis') {
                setDocumentAnalysisId(conversation._id);
                setIsDocumentAnalysis(true);
                setCurrentconversationId(null);
                localStorage.setItem('lastConversationId', conversation._id);
            } else {
                setDocumentAnalysisId(null);
                setIsDocumentAnalysis(false);
                setCurrentconversationId(conversation._id);
                localStorage.setItem('lastConversationId', conversation._id);
            }

            localStorage.setItem('lastConversationId', conversation._id);
            localStorage.setItem(
                'currentChatMessages',
                JSON.stringify(formattedMessages)
            );
            setMessages(formattedMessages);
            setIsNewConversation(false);

            // Add this to close history on desktop after selecting chat
            if (window.innerWidth >= 768) {
                setIsHistoryOpen(false);
            }
        } catch (error) {
            console.error('Failed to fetch chat:', error);

            // Clear saved state if chat not found
            if (error.message === 'Chat not found') {
                localStorage.removeItem('lastConversationId');
                localStorage.removeItem('currentChatMessages');
                createNewChat();
            }

            if (isNewConversation) {
                return;
            }

            setMessages((prev) => [
                ...prev,
                {
                    type: 'error',
                    content:
                        'Failed to load conversation. Starting a new chat.',
                    timestamp: new Date()
                }
            ]);
            localStorage.removeItem('lastConversationId');
            localStorage.removeItem('currentChatMessages');
            createNewChat();
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-b from-slate-900 to-slate-800">
            {/* Left Sidebar - Fixed width */}
            <div className="hidden md:block w-64 flex-shrink-0">
                <Sidebar
                    user={user}
                    onSelectPrompt={handleSelectPrompt}
                    isTempUser={isTempUser}
                />
            </div>

            {/* Main Chat Area - More compact and fixed */}
            <div
                className={`flex-1 flex flex-col h-full min-w-0 transition-all duration-300
                    ${isHistoryOpen ? 'md:mr-72' : 'md:mr-0'}`}
            >
                {/* Header - More compact */}
                <div className="flex items-center h-14 px-4 border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
                    <div className="flex items-center space-x-4">
                        {/* Mobile menu button - Made visible */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden p-2 hover:bg-slate-700/50 rounded-lg"
                        >
                            <svg
                                className="w-5 h-5 text-slate-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>

                        <div className="flex items-center space-x-3">
                            <div
                                className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 
                           flex items-center justify-center"
                            >
                                <IconComponents.MessageCircle className="w-4 h-4 text-white" />
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-base font-semibold text-white leading-none">
                                    Legal Assistant
                                </h1>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    AI-powered legal research
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right side controls - Updated for mobile */}
                    <div className="flex-1 flex justify-end items-center space-x-2">
                        <button
                            onClick={toggleHistory}
                            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                            title={
                                isHistoryOpen ? 'Hide history' : 'Show history'
                            }
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
                                    d={
                                        isHistoryOpen
                                            ? 'M19 9l-7 7-7-7'
                                            : 'M19 9l-7 7-7-7'
                                    }
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Messages Container - Updated padding and spacing */}
                <div className="flex-1 overflow-y-auto bg-slate-900">
                    <div className="max-w-3xl mx-auto py-4 space-y-3">
                        {messages.map((message, index) => (
                            <MessageBubble key={index} message={message} />
                        ))}
                        {isTyping && (
                            <div className="flex items-start gap-2 px-2">
                                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                                    <IconComponents.MessageCircle className="w-4 h-4 text-white" />
                                </div>
                                <div className="rounded-2xl bg-slate-700/50 backdrop-blur-sm px-3 py-2 max-w-[75%] md:max-w-[65%]">
                                    <TypingAnimation />
                                </div>
                            </div>
                        )}
                        <div ref={chatContainerRef} />
                    </div>
                </div>

                {/* Input Area - Adjusted padding bottom */}
                <div className="border-t border-slate-700/50 bg-slate-800/95 backdrop-blur-sm pb-6 md:pb-0">
                    <div className="max-w-2xl mx-auto p-4">
                        <form
                            onSubmit={handleSubmit}
                            className="relative space-y-2"
                        >
                            <div className="relative mb-4">
                                <textarea
                                    ref={inputRef}
                                    value={message}
                                    onChange={handleMessageChange}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSubmit(e);
                                            // Reset height after sending
                                            e.target.style.height = '44px';
                                        }
                                    }}
                                    placeholder={
                                        isTempUser
                                            ? 'Register to chat...'
                                            : isWebMode
                                              ? 'Search the web for legal information...'
                                              : 'Ask any legal question...'
                                    }
                                    className={`w-full rounded-lg pl-3 pr-20 py-2 
                            bg-slate-700/50 border text-white placeholder-slate-400 
                            text-sm resize-none overflow-hidden leading-normal 
                            transition-all duration-200
                            ${
                                isWebMode
                                    ? 'border-blue-500/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                    : 'border-slate-600/50 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20'
                            }`}
                                    disabled={isTyping || isTempUser}
                                    rows="1"
                                    style={{ height: '44px' }} // Default height
                                />

                                {/* Action buttons container with adjusted spacing */}
                                <div className="absolute right-2 top-0 h-full flex items-center gap-1.5">
                                    <div className="relative">
                                        {/* Tools Menu Button */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setIsToolsOpen(!isToolsOpen)
                                            }
                                            className={`p-1.5 rounded-lg transition-all duration-200 flex items-center justify-center
                                ${isToolsOpen ? 'bg-slate-700/50 text-white' : 'text-slate-400 hover:text-white'}`}
                                            title="Show tools"
                                        >
                                            <IconComponents.Tools className="w-4 h-4" />
                                        </button>

                                        {/* Expandable Tools Menu */}
                                        <div
                                            className={`absolute bottom-full right-0 mb-2 transition-all duration-200 transform
                                    ${isToolsOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
                                    bg-slate-800 rounded-lg shadow-lg border border-slate-700/50 backdrop-blur-sm`}
                                        >
                                            <div className="p-2 flex items-center gap-2">
                                                <VoiceChat
                                                    onVoiceInput={
                                                        handleVoiceInput
                                                    }
                                                    disabled={
                                                        isTyping || isTempUser
                                                    }
                                                    onSubmit={sendMessage}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (!isWebMode) {
                                                            setDocumentAnalysisId(
                                                                null
                                                            );
                                                            setIsDocumentAnalysis(
                                                                false
                                                            );
                                                        }
                                                        setIsWebMode(
                                                            !isWebMode
                                                        );
                                                    }}
                                                    className={`p-1.5 md:p-2 rounded-lg transition-all duration-200
                                    ${
                                        isWebMode
                                            ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/50'
                                            : 'text-slate-400 hover:text-white'
                                    }`}
                                                    disabled={isTempUser}
                                                    title={
                                                        isWebMode
                                                            ? 'Web search enabled'
                                                            : 'Enable web search'
                                                    }
                                                >
                                                    <IconComponents.Globe className="w-4 h-4 md:w-5 md:h-5" />
                                                </button>
                                                <DocumentUploader
                                                    onDocumentSelect={
                                                        handleDocumentSelect
                                                    }
                                                    onUploadComplete={
                                                        handleUploadComplete
                                                    }
                                                    className="w-6 h-6 md:w-8 md:h-8 p-1 md:p-1.5"
                                                    disabled={isTempUser}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Send Button */}
                                    <button
                                        type="submit"
                                        disabled={
                                            isTyping ||
                                            !message.trim() ||
                                            isTempUser
                                        }
                                        className="p-1.5 rounded-lg transition-colors flex items-center justify-center
                              text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <IconComponents.Send className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Web Search Indicator - Update positioning */}
                                {isWebMode && (
                                    <div
                                        className="absolute -bottom-5 left-0 flex items-center gap-1.5 text-xs text-blue-400/90
                                  transform transition-all duration-300 ease-in-out opacity-100"
                                    >
                                        <IconComponents.Globe className="w-3 h-3" />
                                        <span className="flex items-center gap-1">
                                            Web search enabled
                                            <span
                                                className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] 
                                      bg-blue-500/10 border border-blue-500/20 text-blue-400"
                                            >
                                                beta
                                            </span>
                                        </span>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Update the ChatHistory wrapper div */}
            <div
                ref={historyRef}
                className={`
          fixed inset-y-0 right-0 
          md:block 
          transition-transform duration-300 ease-in-out
          ${isHistoryOpen ? 'translate-x-0' : 'translate-x-full'}
          ${isMobile() ? 'w-full md:w-72' : 'hidden w-72'}
          z-50
        `}
            >
                <ChatHistory
                    conversations={conversations}
                    onSelectChat={handleSelectChat}
                    onDeleteChat={handleDeleteChat}
                    onEditTitle={handleEditTitle}
                    onNewChat={handleNewChat}
                    isOpen={isHistoryOpen}
                    currentconversationId={currentconversationId}
                    onClose={toggleHistory}
                />
            </div>

            {/* Mobile Navigation */}
            <MobileNav
                user={user}
                onSelectPrompt={handleSelectPrompt}
                isTempUser={isTempUser}
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Bottom Bar - Added top border and spacing */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-800/95 backdrop-blur-sm border-t border-slate-700/50">
                <div className="flex items-center justify-around p-3">
                    <button
                        onClick={handleNewChat}
                        className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/50"
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
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                    </button>

                    <button
                        onClick={() => {
                            if (!isWebMode) {
                                setDocumentAnalysisId(null);
                                setIsDocumentAnalysis(false);
                            }
                            setIsWebMode(!isWebMode);
                        }}
                        className={`p-2 rounded-lg transition-colors ${
                            isWebMode ? 'text-blue-400' : 'text-slate-400'
                        }`}
                    >
                        <IconComponents.Globe className="w-5 h-5" />
                    </button>

                    <button
                        onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                        className={`p-2 rounded-lg transition-colors ${
                            isHistoryOpen ? 'text-blue-400' : 'text-slate-400'
                        }`}
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
                                d="M4 6h16M4 12h16M4 18h7"
                            />
                        </svg>
                    </button>

                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/50"
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
                                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
