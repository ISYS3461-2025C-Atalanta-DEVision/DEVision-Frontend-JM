// headless/job_post/useJobPost.jsx
import { useEffect, useState } from "react";
import jobPostService from "../services/jobPostService";

export default function useJobPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load all posts for the current company
  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await jobPostService.getJobPostsByCompany();
      // assume data is an array
      setPosts(data || []);
    } catch (err) {
      console.error("Failed to fetch job posts", err);
      setError("Failed to load job posts");
    } finally {
      setLoading(false);
    }
  };

  // Delete a post by id and update local state
  const deletePost = async (jobId) => {
    try {
      await jobPostService.deleteJobPost(jobId);
      setPosts((prev) => prev.filter((p) => p.id !== jobId));
    } catch (err) {
      console.error("Failed to delete job post", err);
      // optionally surface error to UI
      setError("Failed to delete job post");
    }
  };

  // You can also add publish/unpublish here later
  // const publishPost = async (jobId) => { ... }
  // const unpublishPost = async (jobId) => { ... }

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    deletePost,
    setPosts,  // exposed in case you need manual updates
    setError,
  };
}