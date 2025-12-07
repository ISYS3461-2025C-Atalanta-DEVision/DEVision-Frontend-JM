import api from "../http_call/HttpRequest";
import {
  LOGIN_SERVICE_URL,
  REGISTER_SERVICE_URL,
  ADMIN_LOGIN_SERVICE_URL,
  REFRESH_TOKEN_URL,
  LOGOUT_URL,
  FORGOT_PASSWORD_URL,
  RESET_PASSWORD_URL,
  ACTIVATE_ACCOUNT_URL,
  CHANGE_PASSWORD_URL,
  VALIDATE_TOKEN_URL,
  COUNTRIES_URL,
} from "../service_url/AuthUrlConfig";

export const authService = {
  // Register a new company
  register: async (data) => {
    const response = await api.post(`${REGISTER_SERVICE_URL}`, data);
    return response.data;
  },

  // Login
  login: async (email, password, deviceInfo = navigator.userAgent) => {
    const response = await api.post(`${LOGIN_SERVICE_URL}`, {
      email,
      password,
      deviceInfo,
    });
    return response.data;
  },

  // Admin login
  adminLogin: async (email, password) => {
    const response = await api.post(`${ADMIN_LOGIN_SERVICE_URL}`, {
      email,
      password,
    });
    return response.data;
  },

  // Logout
  logout: async (refreshToken) => {
    const response = await api.post(`${LOGOUT_URL}`, { refreshToken });
    return response.data;
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    const response = await api.post(`${REFRESH_TOKEN_URL}`, { refreshToken });
    return response.data;
  },

  // Activate account
  activateAccount: async (token) => {
    const response = await api.get(`${ACTIVATE_ACCOUNT_URL}/${token}`);
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await api.post(
      `${FORGOT_PASSWORD_URL}?email=${encodeURIComponent(email)}`
    );
    return response.data;
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    const response = await api.post(
      `${RESET_PASSWORD_URL}/${token}?newPassword=${encodeURIComponent(
        newPassword
      )}`
    );
    return response.data;
  },

  // Change password
  changePassword: async (currentPassword, newPassword, confirmPassword) => {
    const response = await api.post(`${CHANGE_PASSWORD_URL}`, {
      currentPassword,
      newPassword,
      confirmPassword,
    });
    return response.data;
  },

  // Validate token
  validateToken: async () => {
    const response = await api.get(`${VALIDATE_TOKEN_URL}`);
    return response.data;
  },

  // Get countries list
  getCountries: async () => {
    const response = await api.get(`${COUNTRIES_URL}`);
    return response.data;
  },
};

export default authService;
