import api from './api';

export const login = async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
};

export const register = async (username, password) => {
    const response = await api.post('/auth/register', { username, password });
    return response.data;
};

export const logout = async () => {
    const response = await api.get('/auth/logout');
    return response.data;
};

export const checkAuth = async () => {
    const response = await api.get('/auth/login');
    return response.data;
};
