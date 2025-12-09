const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // Default to localhost in development, Render URL in production
  return import.meta.env.PROD;
};

export default getApiUrl;