import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import companyServices from "../../services/profileService";
import useAuth from "../../hooks/useAuth";
import useProfileStore from "../../store/profile.store";

export const useNavbar = (activepage) => {
  const { logout } = useAuth();
  const { profile } = useProfileStore();
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setCompanyName(profile.companyName);
  }, [profile.companyName]);

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
    companyName,
    handleNavigate,
  };
};
export default useNavbar;
