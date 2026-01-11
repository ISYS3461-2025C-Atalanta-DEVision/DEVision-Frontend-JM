import jobPostCreateStore from "../../store/jobpost.create.store";
import jobPostStore from "../../store/jobpost.store";
import { useEffect, useCallback } from "react";

function useCreatePostForm(
  values,
  createPostApi,
  validateAll,
  reset,
  onPostCreated
) {
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
      setFormOpen(false);
  }, []);

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

      if (values.status !== "PUBLIC") {
        setConfirmBoxOpen(true);
        return;
      }

      const payload = cleanPayload();
      setIsCreating(true);
      await createPostApi(payload);

      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsCreating(false);
      setSuccess("Your post has been created successfully!");

      await new Promise((resolve) => setTimeout(resolve, 1200));
      setFormOpen(false);
      // Reload the page so PostList fetches fresh posts without manual refresh
      onPostCreated?.();
    } catch (err) {
      console.error("Failed to create post:", err);
      setError(err.message || "Failed to create post");
      return { success: false, error: err.message };
    } finally {
      setIsCreating(false);
    }
  };

  const cleanPayload = useCallback(() => {
    // 1️⃣ Merge employment types
    const employmentTypes = [
      values.employmentTypes,
      ...(values.additionalEmploymentType || []),
    ].filter(Boolean);

    const today = new Date().toISOString().slice(0, 10);

    const payload = {
      title: values.title,
      description: values.description,
      location: values.location,
      status: values.status,
      employmentTypes,
      salaryType: values.salaryType,
      skills: values.skills,
      postedDate: today,
      expireDate: values.expireDate,
      salaryCurrency: values.salaryCurrency,
      isFresherFriendly: values.isFresherFriendly || false,
    };

    switch (values.salaryType) {
      case "RANGE":
        payload.salaryMin = values.salaryMin ? Number(values.salaryMin) : null;
        payload.salaryMax = values.salaryMax ? Number(values.salaryMax) : null;
        break;

      case "ESTIMATION":
        payload.salaryAmount = values.salaryAmount
          ? Number(values.salaryAmount)
          : null;
        payload.salaryEstimationType = values.salaryEstimationType || null;
        break;

      case "NEGOTIABLE":
      default:
        // do NOTHING → no salary fields included
        break;
    }

    return payload;
  }, [values]);

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
