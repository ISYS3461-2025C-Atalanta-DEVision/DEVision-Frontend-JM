import { useState } from "react";
import useAuthStore from "../../../store/auth.store";
import { useNavigate } from "react-router-dom";

function useLoginForm(loginAPI) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login_user  ,credentials, updateCredentials, resetCredentials } = useAuthStore();

  async function login(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await loginAPI(credentials.email, credentials.password);

      if (response.error === "Server Error") {
        setError("Server error occurred. Please try again later.");
      } else if (response.error === "Client Error") {
        setError("Invalid credentials. Please check your input.");
      } else {
        const { user } = response.data.data;
        login_user(user);
        resetCredentials();
        navigate("/feed");
        console.log("Login successful:", user);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (field) => (event) =>
    updateCredentials(field, event.target.value);

  const goToRegister = () => {
    navigate("/register");
  }

   return {error, loading, login, credentials, handleInputChange, goToRegister };
}

export default useLoginForm;
