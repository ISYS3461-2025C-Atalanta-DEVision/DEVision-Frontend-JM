import { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import authService from "../services/authService";
import useAuthLoginStore from "../store/auth.login.store";
import useProfile from "./useProfile";

export const useAuth = () => {
  const {
    accessToken,
    refreshToken,
    loading,
    error,
    setUser,
    setLoading,
    setError,
    setAccessToken,
    setRefreshToken,
  } = useAuthLoginStore();

  const { fechCompanyProfile } = useProfile();

  const checkExpiredToken = useCallback((expireAt) => {
    try {
      const now = Date.now();
      return now >= expireAt;
    } catch {
      return true;
    }
  });

  // Initialize auth state from localStorage
  // Dont need to decode the token here, just check its presence
  // Backend will validate tokens on each request
  useEffect(() => {
    const initAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const accessExpiresAt = localStorage.getItem("accessExpiresAt");

      if (accessToken && !checkExpiredToken(parseInt(accessExpiresAt))) {
        try {
          setAccessToken(accessToken);

          try {
            await fechCompanyProfile();
          } catch (err) {
            console.error("Failed to fetch profile: ", err);
          }
        } catch (err) {
          console.error("Failed to parse ACCESS TOKEN: ", err);
          logout();
        }
      } else if (accessToken) {
        const refreshToken = localStorage.getItem("refreshToken");
        const refreshExpiresAt = localStorage.getItem("refreshExpiresAt");
        if (refreshToken && !checkExpiredToken(parseInt(refreshExpiresAt))) {
          try {
            const response = await authService.refreshToken(refreshToken);
            const {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
              expireAt: newExpireAt,
              refreshExpireAt: newRefreshExpireAt,
            } = response.data;
            const now = Date.now();
            const newAccessExpiresAt = now + newExpireAt * 1000;
            const newRefreshExpiresAt = now + newRefreshExpireAt * 1000;

            localStorage.setItem("accessToken", newAccessToken);
            localStorage.setItem("refreshToken", newRefreshToken);

            localStorage.setItem(
              "accessExpiresAt",
              newAccessExpiresAt.toString()
            );
            localStorage.setItem(
              "refreshExpiresAt",
              newRefreshExpiresAt.toString()
            );
            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);

            try {
              await fechCompanyProfile();
            } catch (err) {
              console.error("Failed to fetch profile: ", err);
            }
          } catch {
            logout();
          }
        } else {
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password);
      const { accessToken, refreshToken, expiresIn, refreshExpiresIn } =
        response;

      // Store tokens first
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setAccessToken(accessToken);

      const now = Date.now();
      const accessExpiresAt = now + expiresIn * 1000;
      const refreshExpiresAt = now + refreshExpiresIn * 1000;

      localStorage.setItem("accessExpiresAt", accessExpiresAt.toString());
      localStorage.setItem("refreshExpiresAt", refreshExpiresAt.toString());

      try {
        await fechCompanyProfile();
      } catch (err) {
        console.error("Failed to fetch profile: ", err);
      }

      return { success: true };
    } catch (err) {
      console.log("Login error:", err);
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const adminLogin = async (email, password) => {
    setError(null);
    try {
      const response = await authService.adminLogin(email, password);
      const { accessToken, refreshToken, expiresIn, refreshExpiresIn } =
        response;

      // Store tokens first
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setAccessToken(accessToken);

      const now = Date.now();
      const accessExpiresAt = now + expiresIn * 1000;
      const refreshExpiresAt = now + refreshExpiresIn * 1000;

      localStorage.setItem("accessExpiresAt", accessExpiresAt.toString());
      localStorage.setItem("refreshExpiresAt", refreshExpiresAt.toString());

      // Fetch user profile after storing tokens
      const userData = await authService.getProfile();
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      return { success: true, data: userData };
    } catch (err) {
      const message = err.response?.data?.message || "Admin login failed";
      setError(message);
      return { success: false, error: message };
    }
  };

  const register = async (data) => {
    setError(null);
    try {
      const response = await authService.register(data);
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
      setError(message);
      return { success: false, error: message };
    }
  };

  const logout = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setUser(null);
      setAccessToken(null);
    }
  }, []);

  return {
    loading,
    error,
    isAuthenticated: !!accessToken,
    setError,
    setLoading,
    setUser,
    login,
    adminLogin,
    register,
    logout,
  };
};

export default useAuth;
