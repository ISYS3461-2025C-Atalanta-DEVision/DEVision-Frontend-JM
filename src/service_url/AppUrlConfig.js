const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // Default to localhost in development, Render URL in production
  return import.meta.env.PROD
    ? 'https://jm-gateway.onrender.com'
    : 'http://localhost:8080';
};

export default getApiUrl;