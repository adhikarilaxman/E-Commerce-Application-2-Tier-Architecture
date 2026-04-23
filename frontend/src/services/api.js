import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.DEV ? 'http://localhost:3000' : '/api',
    withCredentials: true, // Important for sending/receiving session cookies
});

export default api;
