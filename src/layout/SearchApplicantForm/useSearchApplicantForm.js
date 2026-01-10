import React, { useState, useEffect, useCallback, use } from "react";

function useSearchApplicantForm(
  values,
  creteSearchCriteriaApi,
  validateAll,
  reset,
  onSearchCriteriaCreated
) {
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = () => {
    const isValid = validateAll();
    if (!isValid) {
      return;
    }

    const cleanedPayload = cleanPayload(values);
    console.log("Submitting search criteria:", cleanedPayload);
  };

  const cleanPayload = useCallback((payload) => {
    const cleaned = {
      name: payload.name,
      technicalSkills: payload.technicalSkills,
      country: payload.country,
      expectedSalary: {
        salaryMin: payload.salaryMin,
        salaryMax: payload.salaryMax,
        currency: payload.currency,
      },
      employmentStatus: [
        ...payload.additionalEmploymentType,
        payload.employmentTypes,
      ],
      isActive: true,
      isPremium: true,
    };

    return cleaned;
  }, []);

  
  return {
    handleSubmit,
  };
}
export default useSearchApplicantForm;
