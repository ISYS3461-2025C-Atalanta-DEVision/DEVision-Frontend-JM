import { useEffect, useCallback } from "react";
import useProfileStore from "../store/profile.store";
import profileService from "../services/profileService";

export const useProfile = () => {
  const { profile, loading, error, setLoading, setError, setProfile, reset } =
    useProfileStore();

  const fetchCompanyProfile = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const profileData = await profileService.getProfile();
      setProfile(profileData);
    } catch (err) {
      setError(err?.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setProfile]);

  return {
    profile,
    loading,
    error,
    setProfile,
    fetchCompanyProfile,
  };
};

export default useProfile;
