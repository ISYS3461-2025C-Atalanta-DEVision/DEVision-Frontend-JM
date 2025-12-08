import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useNavbar = (logout) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return {
    handleLogout
  };
};
export default useNavbar;