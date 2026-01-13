import applicantService from "../../services/applicantService";
import countryService from "../../services/countryService";
import { useEffect, useState } from "react";

const useProfileLayout = (applicantId) => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await countryService.getCountries();
        setCountries(data || []);
      } catch (err) {
        console.error("Failed to fetch countries:", err);
      }
    };
    fetchCountries();
  }, []);

  // Fetch applicant profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!applicantId) return;
      setLoading(true);
      setError(null);
      try {
        const data = await applicantService.getFullProfile(applicantId);
        setProfile(data);

        // Fetch skills if skillCategories exist
        if (data.skillCategories?.length > 0) {
          const fetchedSkills = await applicantService.getSkillsByIds(
            data.skillCategories
          );
          setSkills(fetchedSkills);
        }
      } catch (err) {
        console.error("Failed to fetch applicant profile:", err);
        setError("Failed to load applicant profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [applicantId]);

  // Get country name from code
  const getCountryName = (code) => {
    const country = countries.find((c) => c.code === code || c.value === code);
    return country?.name || country?.label || code;
  };

  // Get highest education display
  const getHighestEducation = () => {
    if (!profile?.education?.length) return "Not specified";
    // Find the education that matches highestEducation ID, or just show the first one
    const highest = profile.education.find(
      (e) => e.id === profile.highestEducation
    );
    if (highest) {
      return `${highest.levelStudy} in ${highest.major}`;
    }
    // Fallback to first education entry
    const first = profile.education[0];
    return first ? `${first.levelStudy} in ${first.major}` : "Not specified";
  };

  // Format date range
  const formatDateRange = (startDate, endDate) => {
    const start = startDate
      ? new Date(startDate).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "";
    const end = endDate
      ? new Date(endDate).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "Present";
    return `${start} - ${end}`;
  };

  return {
    getCountryName,
    formatDateRange,
    getHighestEducation,
    profile,
    skills,
    loading,
    error,
    countries,
  };
};
export default useProfileLayout;
