import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import profileServices from "../../services/profileService";
import useAuth from "../../hooks/useAuth";
import useProfileStore from "../../store/profile.store";
import { p } from "framer-motion/client";
import useNotification from "../../hooks/useNotification";

export const useNavbar = (activepage) => {
  const { notification, markAsRead, markAllAsRead } = useNotification();

  const { logout } = useAuth();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };

    if (isNotificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationOpen]);

  const toggleNotificationDropdown = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const isActive = (page) =>
    activepage && activepage.toLowerCase() === page.toLowerCase();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return {
    notification,
    loading,
    isActive,
    handleLogout,
    handleNavigate,
    markAsRead,
    markAllAsRead,
    isNotificationOpen,
    notificationRef,
    toggleNotificationDropdown,
  };
};
export default useNavbar;
