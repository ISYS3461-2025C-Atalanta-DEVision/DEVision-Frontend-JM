import React, { useEffect, useState } from "react";

function useEditProfile(
  editProfileApi,
  getCountryApi,
  editedValues,
  validateAll,
  setSearchParams,
  setNewProfile
) {
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  const [isSaving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoadingCountries(true);
      try {
        const response = await getCountryApi();
        setCountries(response);

        await new Promise((resolve) => setTimeout(resolve, 800));
        setLoadingCountries(false);
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
  }, [setSearchParams]);

  const handleSubmit = async () => {
    setError(null);
    setConfirmationMessage(false);

    if (!validateAll()) {
      setError("Please fill all the fields correctly.");
      console.log("Validation failed");
      return;
    }

    setSaving(true);

    try {
      const response = await editProfileApi(editedValues);
      setNewProfile(response);
      console.log("Profile updated:", response);

      await new Promise((r) => setTimeout(r, 2000));
      setConfirmationMessage(true);

      await new Promise((r) => setTimeout(r, 2000));

      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.delete("edit");
        return next;
      });
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSaving(false); // safety net
    }
  };

  return {
    countries,
    loadingCountries,
    error,
    isSaving,
    confirmationMessage,
    handleSubmit,
  };
}

export default useEditProfile;
