import { authService } from '../services/authService';
import { getAuthToken } from './auth';

const BASE_URL =
    'https://case-bud-backend-bzgqfka6daeracaj.centralus-01.azurewebsites.net'; // Ensure this URL is correct

export class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchWithToken = async (
    endpoint,
    options = {},
    docUpload = false
) => {
    const token = getAuthToken();

    if (!token) {
        throw new ApiError('Authentication required', 401);
    }

    const defaultHeaders = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
    };

    if (!docUpload) {
        defaultHeaders['Content-Type'] = 'application/json';
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers
            },
            mode: 'cors', // Ensure this is set to 'cors'
            credentials: 'omit' // Changed from 'include' to 'omit'
        });

        // Handle preflight response
        if (response.status === 204) {
            return null;
        }

        return handleResponse(response);
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
};

const handleResponse = async (response) => {
    let data;
    try {
        data = await response.json();
    } catch (error) {
        throw new ApiError('Invalid JSON response from server', 500);
    }

    if (!response.ok) {
        const errorMessage =
            data?.message || data?.error || 'Something went wrong';
        const error = new ApiError(errorMessage, response.status);
        error.data = data;
        throw error;
    }

    return data;
};

const retryWithDelay = async (fn, retries = MAX_RETRIES) => {
    try {
        return await fn();
    } catch (error) {
        if (retries > 0 && (error.status === 502 || error.status === 504)) {
            await wait(RETRY_DELAY);
            return retryWithDelay(fn, retries - 1);
        }
        throw error;
    }
};

export const chatApi = {
    sendMessage: async (content, options = {}) => {
        const makeRequest = async () => {
            // Format request body with context
            const requestBody = {
                query: content,
                conversationId: options.conversationId,
                webSearch: options.webSearch || false
                // context: options.context || null // Include context in request
                // NIGGA i thought you said you didnt push any context stuff 💀
            };

            const response = await fetchWithToken(
                '/api/chat/standard-conversation',
                {
                    method: 'POST',
                    body: JSON.stringify(requestBody)
                }
            );

            if (!response) {
                throw new ApiError('No response from server', 500);
            }

            return response;
        };

        try {
            const response = await retryWithDelay(makeRequest);

            return {
                response: response.response || response.message,
                message: response.message,
                conversationId: response.conversationId,
                responseId: response.responseId,
                title: response.title,
                isWebSearch: response.webSearch
                // webSources: response.webSources
                // context: response.context // Return context from response
            };
        } catch (error) {
            console.error('Send message failed:', {
                status: error.status,
                message: error.message,
                data: error.data,
                content,
                options
            });
            throw error;
        }
    },

    getConversations: async () => {
        try {
            const response = await fetchWithToken('/api/chat/');

            // Check if response exists
            if (!response?.conversations) {
                console.warn('No data in response');
                return [];
            }

            return response;
        } catch (error) {
            console.error('Failed to fetch conversations:', error);
            throw error;
        }
    },

    getConversationById: async (conversationId) => {
        try {
            const response = await fetchWithToken(
                `/api/chat/${conversationId}/`
            );

            if (!response?.conversation) {
                throw new Error('No conversation data found');
            }

            return {
                ...response.conversation,
                messages: response.messages.map((msg) => ({
                    id: msg._id,
                    content: {
                        query: msg.query,
                        response: msg.response
                    },
                    documents:
                        msg.documentIds && msg.documentIds.length > 0
                            ? msg.documentIds.map((doc) => ({
                                  name: doc.name,
                                  type: doc.type
                              }))
                            : [],
                    isWebSearch: msg.webSearch,
                    // {
                    //   query: msg.query,
                    //   response: msg.response
                    // },
                    timestamp: msg.createdAt
                }))
            };
        } catch (error) {
            console.error(
                `Failed to fetch conversation ${conversationId}:`,
                error
            );
            throw error;
        }
    },

    getConversation: () => Promise.resolve({ messages: [] }),
    deleteConversation: () => Promise.resolve(),
    updateConversationTitle: () => Promise.resolve(),
    uploadDocument: () => Promise.resolve({ id: Date.now() }),
    sendDocumentAnalysis: (query) => chatApi.sendMessage(query),

    sendDocumentAnalysis: async (query, documentIds, conversationId = null) => {
        try {
            const response = await fetchWithToken(
                '/api/chat/document-analysis',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        query,
                        documentIds: documentIds,
                        conversationId: conversationId
                    })
                }
            );

            if (!response) {
                throw new Error('No response from server');
            }

            // Ensure consistent response format
            return {
                response: response.response || response.message,
                message: response.message,
                conversationId: response.conversationId,
                title: response.title
                // webSources: [] // Empty array for document analysis mode
                // context: response.context || null
            };
        } catch (error) {
            console.error('Document analysis failed:', {
                error,
                query,
                documentIds,
                conversationId
            });
            throw error;
        }
    }
    //this endpoint doesn't even exist 💀
};

export const documentsApi = {
    uploadDocument: async (file, name) => {
        // Log request details for debugging
        console.log('Uploading document:', {
            fileName: name,
            fileSize: file.size,
            fileType: file.type
        });

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);

        try {
            const response = await fetchWithToken(
                '/api/documents',
                {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${getAuthToken()}`
                    }
                },
                true
            );

            // Log successful response
            console.log('Upload response:', response);
            return response;
        } catch (error) {
            // Log error details
            console.error('Upload error details:', {
                status: error.status,
                message: error.message,
                response: error.response
            });
            throw error;
        }
    }
};

export const api = {
    login: async (credentials) => {
        const response = await fetch(`${BASE_URL}/api/auth/login`, {
            // Update endpoint path
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Origin: window.location.origin
            },
            mode: 'cors',
            credentials: 'omit',
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }

        return response.json();
    }

    // Add other API methods here...
};
