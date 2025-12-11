export const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // Default to localhost in development, Render URL in production
  return import.meta.env.PROD
    ? 'https://api-gateway-khhr.onrender.com'
    : 'http://localhost:8080';
};

// OAuth2 Google login URL
export const getGoogleOAuthUrl = () => {
  return `${getApiUrl()}/auth-service/oauth2/authorization/google`;
};

export default getApiUrl;