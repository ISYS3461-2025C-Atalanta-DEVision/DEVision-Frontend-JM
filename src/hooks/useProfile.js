import { useEffect } from "react";
import useProfileStore from "../store/profile.store";
import profileService from "../services/profileService";

export const useProfile = () => {
  const { profile, loading, error, setLoading, setError, setProfile, reset } =
    useProfileStore();

  const fechCompanyProfile = async () => {
    setLoading(true);
    console.log("Fetching company profile...", loading);
    setError(null);
    try {
      const profileData = await profileService.getProfile();
      setProfile(profileData);
      setLoading(false);
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
    fechCompanyProfile
  };
};

export default useProfile;
