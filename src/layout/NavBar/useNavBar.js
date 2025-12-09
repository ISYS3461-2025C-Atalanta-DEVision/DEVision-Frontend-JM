import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import companyServices from "../../services/companyServices";
import useAuth from "../../hooks/useAuth";

export const useNavbar = (activepage, companyId) => {
  const { logout } = useAuth();
  const [companyName, setCompanyName] = useState("");
  const [ loading, setLoading ] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyName = async () => {
      try {
        setLoading(true);
        const name = await companyServices.getCompanyProfile(companyId);
        setCompanyName(name.name);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch company name:", error);
      }
    };

    fetchCompanyName();
  }, []);

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
