import { useEffect, useCallback, useState } from "react";
import useProfileStore from "../store/profile.store";
import profileService from "../services/profileService";
import usePayment from "./usePayment";
import { useSearchParams, useNavigate } from "react-router-dom";

export const useProfile = () => {
  const { profile, loading, error, setLoading, setError, setProfile, reset } =
    useProfileStore();

  const {
    cancelSubscription,
    loading: cancelLoading,
    cfCancel,
    setCF,
  } = usePayment();

  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const handleCancelSubscription = async () => {
    setPaymentProcessing(true);
    try {
      await cancelSubscription(profile?.userId, true);
      await new Promise((r) => setTimeout(r, 1000));
      await fetchCompanyProfile();
    } catch (err) {
      console.log("Error cancel subscription", err);
    }
    finally{
      setPaymentProcessing(false)
    }
  };


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
    paymentProcessing,
    handleCancelSubscription,
    cancelLoading,
    cfCancel,
    setCF,
  };
};

export default useProfile;
