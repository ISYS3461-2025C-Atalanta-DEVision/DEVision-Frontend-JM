import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function useLoginForm(validateAll) {
  const navigate = useNavigate();
  const { user, login, error, loading, setLoading, setError } = useAuth();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateAll()) {
      return;
    }

    setLoading(true);
    const result = await login(values.email, values.password);
    setLoading(false);

    await new Promise((resolve) => setTimeout(resolve, 800));
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error);
    }
  };

  return {
    handleLoginSubmit,
    error,
    loading,
  };
}

export default useLoginForm;
