import { useEffect } from "react";
import useDashboardStore from "../store/dashboard.store";

export const useDashboard = (dashboardAPI, comapanyId) => {
  const { companyData, loading, error,setLoading, setError, setProfile, reset } = useDashboardStore();

  const fetchDashboardProfile = async (companyId) => {
    setLoading(true);
    setError(null);
    try {
      const profileData = await dashboardAPI.getCompanyProfile(companyId);
      setProfile(profileData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardProfile(comapanyId);
  }, []);

  return {
    companyData,
    loading,
    error,
  };
};

export default useDashboard;
