import { setAuthToken, checkToken, getAuthToken } from '../utils/auth';

const BASE_URL =
    'https://case-bud-backend-bzgqfka6daeracaj.centralus-01.azurewebsites.net/';

const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

class AuthService {
    login = async (credentials) => {
        try {
            console.log('Attempting login with:', {
                url: `${BASE_URL}/api/auth/login`,
                credentials: { email: credentials.email, password: '***' }
            });

            const response = await fetch(`${BASE_URL}/api/auth/login`, {
                // Update endpoint path to match backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Origin: window.location.origin
                },
                mode: 'cors',
                credentials: 'omit', // Change from 'include' to 'omit' since we're using token-based auth
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                })
            });

            const responseText = await response.text();
            console.log('Raw response:', responseText);

            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                console.error('Failed to parse response:', e);
                throw new Error('Invalid server response');
            }

            if (!response.ok) {
                throw new Error(
                    data.message ||
                        `Login failed with status ${response.status}`
                );
            }

            // Extract token and user from nested response
            const token = data.data?.token;
            const user = data.data?.user;

            if (!token) {
                throw new Error('No authentication token received');
            }

            // Store auth data
            setAuthToken(token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('lastActivity', Date.now().toString());

            return {
                token,
                user
            };
        } catch (error) {
            console.error('Login error:', {
                message: error.message,
                stack: error.stack
            });
            // Cleanup on error
            setAuthToken(null);
            localStorage.removeItem('user');
            localStorage.removeItem('lastActivity');
            throw error;
        }
    };

    register = async (userData) => {
        const response = await fetch(`${BASE_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        return data;
    };

    verifyEmail = async (verificationData) => {
        const response = await fetch(`${BASE_URL}/api/auth/verify-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(verificationData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Verification failed');
        }

        return data;
    };

    resendVerification = async (email) => {
        const response = await fetch(
            `${BASE_URL}/api/auth/resend-verification`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            }
        );

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to resend verification');
        }
        return data;
    };

    forgotPassword = async (email) => {
        const response = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(
                data.message || 'Failed to initiate password reset'
            );
        }
        return data;
    };

    resetPassword = async (resetData) => {
        const response = await fetch(`${BASE_URL}/api/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(resetData)
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Password reset failed');
        }
        return data;
    };

    logout = () => {
        setAuthToken(null);
        localStorage.removeItem('user');
    };

    getCurrentUser = () => {
        try {
            return JSON.parse(localStorage.getItem('user'));
        } catch {
            return null;
        }
    };

    getToken = () => getAuthToken();

    isAuthenticated = () => {
        const token = this.getToken();
        if (!token) return false;

        try {
            // Check if token is expired
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        } catch (error) {
            return false;
        }
    };

    updateActivity = () => {};
}

export const authService = new AuthService();
