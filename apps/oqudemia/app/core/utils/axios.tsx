import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const api = axios.create({
  baseURL: API_URL, 
});

api.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('[Axios] Sending token:', token, 'Full header:', config.headers);
    } else {
      console.log('[Axios] No token found for request:', config.url);
    }
    return config;
  },
  (error) => Promise.reject(error)
);
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid — log out user or refresh token
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);



export default api;
