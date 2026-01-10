import { useState } from "react";

function useEditJobPostForm(
  updateJobPostApi,
  editedValues,
  validateAll,
  setSearchParams,
  setPosts,
  jobId
) {
  const [isSaving, setSaving] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  const handleSubmit = async () => {
    setConfirmationMessage(null);

    if (!validateAll()) {
      setConfirmationMessage({
        type: "error",
        message: "Please fill all the fields correctly",
      });
      return;
    }

    setSaving(true);

    try {
      // Transform the data to match backend expectations
      const updatePayload = {
        title: editedValues.title,
        description: editedValues.description,
        location: editedValues.location,
        // Combine primary employment type + additional types into single array
        employmentTypes: [
          editedValues.employmentTypes,
          ...(editedValues.additionalEmploymentType || []),
        ].filter(Boolean),
        skills: editedValues.skills,
        salaryType: editedValues.salaryType,
        salaryMin: editedValues.salaryMin ? parseInt(editedValues.salaryMin) : null,
        salaryMax: editedValues.salaryMax ? parseInt(editedValues.salaryMax) : null,
        salaryCurrency: editedValues.salaryCurrency || null,
        salaryAmount: editedValues.salaryAmount ? parseInt(editedValues.salaryAmount) : null,
        salaryEstimationType: editedValues.salaryEstimationType || null,
        expireDate: editedValues.expireDate,
      };

      const response = await updateJobPostApi(jobId, updatePayload);

      // Update the posts list with the new data
      setPosts((prev) =>
        prev.map((post) => (post.jobId === jobId ? response : post))
      );

      await new Promise((r) => setTimeout(r, 2000));
      setConfirmationMessage({
        type: "success",
        message: "Job post updated successfully",
      });

      await new Promise((r) => setTimeout(r, 2000));

      // Remove the edit query param to exit edit mode
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.delete("edit");
        return next;
      });
    } catch (err) {
      setConfirmationMessage({
        type: "error",
        message: err.message || "Failed to update job post",
      });
    } finally {
      setSaving(false);
    }
  };

  return {
    isSaving,
    confirmationMessage,
    handleSubmit,
  };
}

export default useEditJobPostForm;
