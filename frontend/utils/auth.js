const BASE_URL =
    'https://case-bud-backend-bzgqfka6daeracaj.centralus-01.azurewebsites.net/';
const TOKEN_REFRESH_URL =
    'https://case-bud-backend.onrender.com/api/auth/refresh';

export const refreshToken = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No refresh token available');
    }

    const response = await fetch(TOKEN_REFRESH_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Token refresh failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data.token;
};

export const isTokenExpired = (token) => {
    if (!token) return true;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 < Date.now();
    } catch (e) {
        return true;
    }
};

export const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
        try {
            return {
                isLoggedIn: true,
                user: JSON.parse(user),
                token
            };
        } catch (e) {
            console.error('Failed to parse stored user data');
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }

    return { isLoggedIn: false };
};

export const checkToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 > Date.now();
    } catch (e) {
        return false;
    }
};

export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
};

export const getAuthToken = () => localStorage.getItem('token');
