import jobPostCreateStore from "../../store/jobpost.create.store";
import jobPostStore from "../../store/jobpost.store";
import { useEffect } from "react";

function useCreatePostForm(values, createPostApi, validateAll, reset) {
  const {
    success,
    error,
    isCreating,
    setIsCreating,
    setSuccess,
    setError,
    isFormOpen,
    setFormOpen,
    confirmBoxOpen,
    setConfirmBoxOpen,
  } = jobPostCreateStore();

  useEffect(() => {
    if (!isFormOpen) {
      reset();
      setError(null);
      setSuccess(null);
    }
  }, [isFormOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess(null);
    try {
      setError("");

      const isValid = validateAll();

      if (!isValid) {
        setError("Please fill all the fields correctly.");
        return;
      }

      if (!values.published) {
        setConfirmBoxOpen(true);
        return;
      }

      setIsCreating(true);
      await createPostApi(values);

      console.log("Submitting post data:", values);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsCreating(false);
      setSuccess("Your post has been created successfully!");

      await new Promise((resolve) => setTimeout(resolve, 1200));
      setFormOpen(false);
      setSuccess(null);
      reset();
    } catch (err) {
      console.error("Failed to create post:", err);
      setError(err.message || "Failed to create post");
      return { success: false, error: err.message };
    } finally {
      setIsCreating(false);
    }
  };

  return {
    isCreating,
    success,
    error,
    handleSubmit,
    isFormOpen,
    setFormOpen,
    confirmBoxOpen,
    setConfirmBoxOpen,
  };
}

export default useCreatePostForm;
