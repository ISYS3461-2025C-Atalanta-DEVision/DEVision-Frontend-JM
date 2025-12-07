import api from './api';

const AUTH_BASE = '/auth-service/api/v1/auth';

export const authService = {
  // Register a new company
  register: async (data) => {
    const response = await api.post(`${AUTH_BASE}/register`, data);
    return response.data;
  },

  // Login
  login: async (email, password, deviceInfo = navigator.userAgent) => {
    const response = await api.post(`${AUTH_BASE}/login`, {
      email,
      password,
      deviceInfo,
    });
    return response.data;
  },

  // Admin login
  adminLogin: async (email, password) => {
    const response = await api.post(`${AUTH_BASE}/admin/login`, {
      email,
      password,
    });
    return response.data;
  },

  // Logout
  logout: async (refreshToken) => {
    const response = await api.post(`${AUTH_BASE}/logout`, { refreshToken });
    return response.data;
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    const response = await api.post(`${AUTH_BASE}/refresh`, { refreshToken });
    return response.data;
  },

  // Activate account
  activateAccount: async (token) => {
    const response = await api.get(`${AUTH_BASE}/activate/${token}`);
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await api.post(`${AUTH_BASE}/forgot-password?email=${encodeURIComponent(email)}`);
    return response.data;
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    const response = await api.post(`${AUTH_BASE}/reset-password/${token}?newPassword=${encodeURIComponent(newPassword)}`);
    return response.data;
  },

  // Change password
  changePassword: async (currentPassword, newPassword, confirmPassword) => {
    const response = await api.post(`${AUTH_BASE}/change-password`, {
      currentPassword,
      newPassword,
      confirmPassword,
    });
    return response.data;
  },

  // Validate token
  validateToken: async () => {
    const response = await api.get(`${AUTH_BASE}/validate`);
    return response.data;
  },

  // Get countries list
  getCountries: async () => {
    const response = await api.get(`${AUTH_BASE}/countries`);
    return response.data;
  },
};

export default authService;
