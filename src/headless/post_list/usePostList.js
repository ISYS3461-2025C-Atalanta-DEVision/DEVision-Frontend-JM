import { useState, useEffect } from "react";
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

  async function fetchItems() {
    try {
      setError(null);
      setLoading(true);
      const result = await fetchItemAPI(company_Id);
      setItems(result);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return { items, loading, error };
}

export default usePostList;
