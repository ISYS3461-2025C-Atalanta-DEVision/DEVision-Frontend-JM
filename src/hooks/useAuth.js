import { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import authService from "../services/authService";
import useAuthLoginStore from "../store/auth.login.store";

export const useAuth = () => {
  const { user, loading, error, setUser, setLoading, setError } =
    useAuthLoginStore();


  // Initialize auth state from localStorage
  // Dont need to decode the token here, just check its presence
  // Backend will validate tokens on each request
  useEffect(() => {
    const initAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const storedUser = localStorage.getItem("user");

      if (accessToken) {
        try {
          const userData = JSON.parse(storedUser)
          setUser(userData);
        } catch (err) {
          console.error("Failed to parse user data:", err);
          logout();
        }
      } else if (accessToken) {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          try {
            const response = await authService.refreshToken(refreshToken);
            const {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
              user: userData,
            } = response.data;
            localStorage.setItem("accessToken", newAccessToken);
            localStorage.setItem("refreshToken", newRefreshToken);
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
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
    setError(null);
    try {
      const response = await authService.login(email, password);
      const { accessToken, refreshToken, user: userData } = response;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return { success: true, data: userData };
    } catch (err) {
      console.log("Login error:", err);
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      return { success: false, error: message };
    }
  };

  const adminLogin = async (email, password) => {
    setError(null);
    try {
      const response = await authService.adminLogin(email, password);
      const { accessToken, refreshToken, user: userData } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
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
    }
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
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
