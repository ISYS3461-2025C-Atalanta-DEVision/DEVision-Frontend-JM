import { useState, useEffect, useCallback } from "react";
import useAuthStore from "../../../store/auth.login";
import { useNavigate } from "react-router-dom";

function useLoginForm(loginAPI, validateAll) {
  const navigate = useNavigate();
  const { user, loading, error, setUser, setLoading, setError } =
    useAuthStore();

  // Check if token is expired
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const storedUser = localStorage.getItem("user");

      if (accessToken && !isTokenExpired(accessToken)) {
        try {
          const userData = storedUser
            ? JSON.parse(storedUser)
            : jwtDecode(accessToken);
          setUser(userData);
        } catch (err) {
          console.error("Failed to parse user data:", err);
          logout();
        }
      } else if (accessToken) {
        // Token expired, try to refresh
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken && !isTokenExpired(refreshToken)) {
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

  const login =  useCallback(async (email, password) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await authService.loginAPI(email, password);
      const { accessToken, refreshToken, user: userData } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      return { success: true, data: userData };
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      return { success: false, error: message };
    }
  },[]);

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

  //Callback logout function
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


   const handleLoginSubmit = async (e) => {
      e.preventDefault();
      setError('');

      if (!validateAll()) {
        return;
      }

      setLoading(true);
      const result = await login(values.email, values.password);
      setLoading(false);

      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    };
  return {
    //states
    user,
    loading,
    error,
    //actions
    handleLoginSubmit,
    adminLogin,
    logout,
    //checking
    isAuthenticated: !!user,
  };
}

export default useLoginForm;
