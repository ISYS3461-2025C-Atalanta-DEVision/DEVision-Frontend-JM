import { useState, useEffect, useCallback } from "react";
import useJobPostStore from "../../store/jobpost.store";

function usePostList(fetchItemAPI, company_Id) {
  const {
    items,
    setItems,
    loading,
    setLoading,
    error,
    setError,
    filter,
    setFilter,
  } = useJobPostStore();

  // Fetch all items
  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchItemAPI();
      setItems(result);
    } catch (err) {
      setError(err.message || "Failed to fetch job posts");
    } finally {
      setLoading(false);
    }
  }, [fetchItemAPI, company_Id, setItems, setLoading, setError]);

  // Filter only PUBLIC posts
  const filterPublic = useCallback(() => {
    return items?.filter((item) => item.status === "PUBLIC") || [];
  }, [items]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    publicItems: filterPublic(),
    refetch: fetchItems,
    loading,
    error,
  };
}

export default usePostList;
