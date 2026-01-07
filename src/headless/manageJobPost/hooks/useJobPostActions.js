import { useCallback } from "react";
import jobPostService from "../../../services/jobPostService";

export default function useJobPostActions({ setPosts, setError }) {
  const handleDeletePost = useCallback(
    async (jobId) => {
      try {
        await jobPostService.deleteJobPost(jobId);
        setPosts((prev) => prev.filter((p) => p.jobId !== jobId));
      } catch (err) {
        console.error("Failed to delete job post", err);
        setError?.("Failed to delete job post");
      }
    },
    [setPosts, setError]
  );

  const handlePublishPost = useCallback(
    async (jobId) => {
      try {
        await jobPostService.publishJobPost(jobId);
        setPosts((prev) =>
          prev.map((p) =>
            p.jobId === jobId ? { ...p, status: "PUBLIC" } : p
          )
        );
      } catch (err) {
        console.error("Failed to publish job post", err);
        setError?.("Failed to publish job post");
      }
    },
    [setPosts, setError]
  );

  const handleUnpublishPost = useCallback(
    async (jobId) => {
      try {
        await jobPostService.unpublishJobPost(jobId);
        setPosts((prev) =>
          prev.map((p) =>
            p.jobId === jobId ? { ...p, status: "PRIVATE" } : p
          )
        );
      } catch (err) {
        console.error("Failed to unpublish job post", err);
        setError?.("Failed to unpublish job post");
      }
    },
    [setPosts, setError]
  );

  return {
    handleDeletePost,
    handlePublishPost,
    handleUnpublishPost,
  };
}