import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import profileServices from "../../services/profileService";
import useAuth from "../../hooks/useAuth";
import useProfileStore from "../../store/profile.store";
import { p } from "framer-motion/client";

export const useNavbar = (activepage) => {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isActive = (page) =>
    activepage && activepage.toLowerCase() === page.toLowerCase();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return {
    loading,
    isActive,
    handleLogout,
    handleNavigate,
  };
};
export default useNavbar;
