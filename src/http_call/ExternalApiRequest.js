import axios from 'axios';

// External API Key for third-party services
const EXTERNAL_API_KEY = import.meta.env.VITE_EXTERNAL_API_KEY || "wrgY4eM0rE/66kMz0ubiVMfev36SxUlENNU2k9dytXc=";

// Create axios instance for external API calls
const externalApi = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'accept': '*/*',
    'X-API-Key': EXTERNAL_API_KEY,
  },
});

// Request interceptor for external API
externalApi.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for external API
externalApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('External API Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default externalApi;
