import React, { useEffect, useState } from "react";

function useEditProfile(
  editProfileApi,
  editAvatarApi,
  getCountryApi,
  editedValues,
  validateAll,
  setNewProfile,
  fetchCompanyProfile,
  setValues,
  setSearchParams
) {
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  const [avatarModal, setAvatarModal] = useState(null);

  const [isSaving, setSaving] = useState(false);
  const [isSavingAvatar, setSavingAvatar] = useState(false);

  const [avatarMessage, setAvatarMessage] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

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
  }, [getCountryApi]);

  const handleSubmit = async () => {
    setConfirmationMessage(null);

    if (!validateAll()) {
      setConfirmationMessage({
        type: "error",
        message: "Please fill all the fields correctly",
      });
      return;
    }

    setSaving(true);

    try {
      const response = await editProfileApi(editedValues);
      setNewProfile(response);

      await new Promise((r) => setTimeout(r, 2000));
      setConfirmationMessage({
        type: "success",
        message: "Saved information successfully",
      });

      await new Promise((r) => setTimeout(r, 2000));

      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.delete("edit");
        return next;
      });
    } catch (err) {
      setConfirmationMessage({
        type: "error",
        message: err.message || "Failed to save changes",
      });
    } finally {
      setSaving(false); // safety net
    }
  };

  const handleAvatarSave = async (croppedFile) => {
    setSavingAvatar(true);
    setAvatarMessage(null);
    try {
      const updatedProfile = await editAvatarApi(croppedFile);

      if (updatedProfile) {
        await new Promise((r) => setTimeout(r, 2000));

        setAvatarModal(null);
        setAvatarMessage({
          type: "success",
          message: "Avatar updated successfully",
        });

        await new Promise((r) => setTimeout(r, 3000));

        const response = fetchCompanyProfile?.();
      }
    } catch (err) {
      if (err.status === 413) {
        setAvatarMessage({
          type: "error",
          message: "Image too large. Please choose a smaller image.",
        });
      } else if (err.status === 415) {
        setAvatarMessage({
          type: "error",
          message: "Unsupported file type. Please choose a valid image file.",
        });
      } else {
        setAvatarMessage({
          type: "error",
          message: err.message || "Failed to update avatar",
        });
      }
    } finally {
      setAvatarModal(null);
      setSavingAvatar(false);
    }
  };

  return {
    avatarModal,
    setAvatarModal,
    countries,
    loadingCountries,
    isSaving,
    confirmationMessage,
    handleSubmit,
    handleAvatarSave,
    isSavingAvatar,
    avatarMessage,
  };
}

export default useEditProfile;
