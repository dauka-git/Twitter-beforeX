import axios from 'axios';

// In development, Vite proxy handles the API routes
// In production, set VITE_API_URL environment variable
const baseURL = import.meta.env.VITE_API_URL || '';

if (baseURL) {
  axios.defaults.baseURL = baseURL;
}

axios.interceptors.request.use((config) => {
  config.headers['token'] = window.localStorage.getItem('token');
  return config;
});

export { axios };