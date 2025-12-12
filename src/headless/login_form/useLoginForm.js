import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useAuthLoginStore from "../../store/auth.login.store";

function useLoginForm(validateAll, values, loginApi) {
  const navigate = useNavigate();

  const { loading, accessToken, setError, setLoading, error } =
    useAuthLoginStore();
    
  useEffect(() => {
    if (!loading && accessToken) {
      navigate("/dashboard");
    }
  }, [loading, accessToken]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateAll()) {
      return;
    }

    setLoading(true);
    const result = await loginApi(values.email, values.password);
    setLoading(false);

    await new Promise((resolve) => setTimeout(resolve, 800));
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error);
    }
  };

  const toSignUp = () => {
    navigate("/register");
  };

  return {
    toSignUp,
    handleLoginSubmit,
    error,
    loading,
  };
}

export default useLoginForm;
