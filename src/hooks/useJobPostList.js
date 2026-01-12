import { useEffect, useState, useCallback } from "react";
import jobPostService from "../services/jobPostService";

export const useJobPostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await jobPostService.getJobPostsByCompany();
      setPosts(data || []);
    } catch (err) {
      console.error("Failed to fetch job posts", err);
      setError("Failed to load job posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    setPosts,
    loading,
    error,
    setError,
    fetchPosts,
  };
};

export default useJobPostList;