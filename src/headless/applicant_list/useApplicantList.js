import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const EDUCATION_LEVELS = [
  { value: "", label: "All Education Levels" },
  { value: "Bachelor", label: "Bachelor's Degree" },
  { value: "Master", label: "Master's Degree" },
  { value: "PhD", label: "PhD" },
];

const useApplicantList = (countryService, applicantService) => {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFilterMode, setIsFilterMode] = useState(false);

  // Filter states
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedEducation, setSelectedEducation] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);

  const loaderRef = useRef(null);

  // Load countries for dropdown
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await countryService.getCountries();
        setCountries(data || []);
      } catch (err) {
        console.error("Failed to load countries:", err);
      } finally {
        setCountriesLoading(false);
      }
    };
    loadCountries();
  }, []);

  // Fetch all applicants (no filter)
  const fetchAllApplicants = useCallback(
    async (pageNum, append = false) => {
      if (loading) return;

      setLoading(true);
      setError(null);

      try {
        const result = await applicantService.getAllApplicants(pageNum, 12);
        const data = result.data || result || [];

        if (append) {
          setApplicants((prev) => [...prev, ...data]);
        } else {
          setApplicants(data);
        }

        setHasMore(data.length === 12);
        setPage(pageNum);
      } catch (err) {
        console.error("Failed to fetch applicants:", err);
        setError(err.message || "Failed to fetch applicants");
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [loading]
  );

  // Check if any filters are active
  const hasActiveFilters = useCallback(() => {
    return searchQuery.trim() || selectedCountry || selectedEducation;
  }, [searchQuery, selectedCountry, selectedEducation]);

  // Search applicants with filters
  const searchApplicantsWithFilters = useCallback(
    async (pageNum, append = false) => {
      if (!hasActiveFilters()) {
        setIsFilterMode(false);
        setPage(1);
        fetchAllApplicants(1, false);
        return;
      }

      if (loading) return;

      setLoading(true);
      setError(null);
      setIsFilterMode(true);

      try {
        const result = await applicantService.searchApplicantsWithFilters(
          {
            name: searchQuery,
            country: selectedCountry,
            educationLevel: selectedEducation,
          },
          pageNum,
          12
        );
        const data = result.data || result || [];

        if (append) {
          setApplicants((prev) => [...prev, ...data]);
        } else {
          setApplicants(data);
        }

        setHasMore(data.length === 12);
        setPage(pageNum);
      } catch (err) {
        console.error("Failed to search applicants:", err);
        setError(err.message || "Failed to search applicants");
      } finally {
        setLoading(false);
      }
    },
    [
      loading,
      fetchAllApplicants,
      hasActiveFilters,
      searchQuery,
      selectedCountry,
      selectedEducation,
    ]
  );

  // Load applicants on mount
  useEffect(() => {
    fetchAllApplicants(1, false);
  }, []);

  // Infinite scroll with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !loading && !initialLoading) {
          const nextPage = page + 1;
          if (isFilterMode) {
            searchApplicantsWithFilters(nextPage, true);
          } else {
            fetchAllApplicants(nextPage, true);
          }
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [
    hasMore,
    loading,
    initialLoading,
    page,
    isFilterMode,
    fetchAllApplicants,
    searchApplicantsWithFilters,
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    searchApplicantsWithFilters(1, false);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCountry("");
    setSelectedEducation("");
    setIsFilterMode(false);
    setPage(1);
    setApplicants([]);
    setInitialLoading(true);
    fetchAllApplicants(1, false);
  };

  // Get active filter labels for display
  const getActiveFilterLabels = () => {
    const labels = [];
    if (searchQuery.trim()) labels.push(`Name: "${searchQuery}"`);
    if (selectedCountry) {
      const country = countries.find((c) => c.code === selectedCountry);
      labels.push(`Country: ${country?.name || selectedCountry}`);
    }
    if (selectedEducation) {
      const edu = EDUCATION_LEVELS.find((e) => e.value === selectedEducation);
      labels.push(`Education: ${edu?.label || selectedEducation}`);
    }
    return labels;
  };

  const handleApplicantClick = (applicantId) => {
    navigate(`/applicants/${applicantId}`);
  };

  return {
    applicants,
    loading,
    initialLoading,
    error,
    searchQuery,
    setSearchQuery,
    page,
    hasMore,
    isFilterMode,
    selectedCountry,
    setSelectedCountry,
    selectedEducation,
    setSelectedEducation,
    countries,
    countriesLoading,
    handleSearch,
    handleClearFilters,
    getActiveFilterLabels,
    handleApplicantClick,
    loaderRef,
  };
};

export default useApplicantList;
