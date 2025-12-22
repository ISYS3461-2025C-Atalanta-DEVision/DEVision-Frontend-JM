import { useEffect } from "react";
import useProfileStore from "../store/profile.store";
import profileService from "../services/profileService";

export const useProfile = () => {
  const { profile, loading, error, setLoading, setError, setProfile, reset } =
    useProfileStore();

  const fetchCompanyProfile = async () => {
    setError(null);
    try {
      const profileData = await profileService.getProfile();
      setProfile(profileData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    fetchCompanyProfile,
  };
};

export default useProfile;
