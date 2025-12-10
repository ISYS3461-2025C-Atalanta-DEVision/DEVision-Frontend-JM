import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthRegisterStore from "../../store/auth.register.store";

function useRegistrationForm(validateAll, values, registerApi, getCountryApi) {
  const navigate = useNavigate();

  const {
    user,
    loading,
    error,
    success,
    setUser,
    setLoading,
    setError,
    setSuccess,
    countries,
    loadingCountries,
    setCountries,
    setLoadingCountries,
  } = useAuthRegisterStore();

  useEffect(() => {
    const fetchCountries = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      try {
        const response = await getCountryApi();
        setCountries(response);
      } catch (err) {
        console.error("Failed to fetch countries:", err);
        setCountries([
          "Vietnam",
          "Singapore",
          "Thailand",
          "United States",
          "Australia",
        ]);
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateAll()) {
      return;
    }

    setLoading(true);
    const result = await registerApi({
      email: values.email,
      password: values.password,
      companyName: values.companyName,
      country: values.country,
      phoneNumber: values.phoneNumber || undefined,
      streetAddress: values.streetAddress || undefined,
      city: values.city || undefined,
    });
    setLoading(false);

    if (result.success) {
      setSuccess(
        "Registration successful! Please check your email to activate your account."
      );
      setTimeout(() => navigate("/login"), 3000);
    } else {
      setError(result.error);
    }
  };

  return {
    user,
    loading,
    error,
    success,
    setUser,
    setLoading,
    setError,
    setSuccess,
    countries,
    loadingCountries,
    setCountries,
    setLoadingCountries,
    handleRegisterSubmit,
  };
}

export default useRegistrationForm;
