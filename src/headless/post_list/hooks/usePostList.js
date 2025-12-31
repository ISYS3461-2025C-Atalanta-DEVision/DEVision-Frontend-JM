// hooks/usePostList.js
import { useEffect, useState, useCallback } from "react";
import useJobPostStore from "../../../store/jobpost.store";

const PAGE_SIZE = 5; // adjust as needed

function usePostList(fetchItemAPI, companyId) {
  const {
    allItems,
    setAllItems,
    items,
    setItems,
    loading,
    setLoading,
    error,
    setError,
  } = useJobPostStore();

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const initialFetch = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);

      const result = await fetchItemAPI(companyId); // full array from backend

      setAllItems(result);                          // keep full list in store
      const firstSlice = result.slice(0, PAGE_SIZE);
      setItems(firstSlice);                         // show first page

      setPage(1);
      setHasMore(result.length > PAGE_SIZE);
    } catch (err) {
      setError(err.message || "Failed to fetch job posts");
    } finally {
      setLoading(false);
    }
  }, [companyId, fetchItemAPI, setAllItems, setItems, setError, setLoading]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    const nextSlice = allItems.slice(0, (page + 1) * PAGE_SIZE);
    setItems(nextSlice);
    setPage((prev) => prev + 1);
    setHasMore(allItems.length > nextSlice.length);
  }, [allItems, hasMore, loading, page, setItems]);

  useEffect(() => {
    initialFetch();
  }, [initialFetch]);

  return { items, loading, error, loadMore, hasMore };
}

export default usePostList;