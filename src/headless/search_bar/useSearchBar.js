import { useState, useCallback } from "react";
import { applicantService } from "../../services/applicantService";

export default function useSearchBar(initialValue = "") {
  const [query, setQuery] = useState(initialValue);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const clearQuery = useCallback(() => {
    setQuery("");
    setResults(null);
    setError(null);
  }, []);

  const searchApplicants = useCallback(async (searchQuery, page = 1, limit = 10) => {
    if (!searchQuery.trim()) {
      setResults(null);
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await applicantService.searchApplicants(searchQuery, page, limit);
      console.log(data.data)
      setResults(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    query,
    setQuery,
    handleChange,
    clearQuery,
    searchApplicants,
    results,
    loading,
    error,
  };
}
