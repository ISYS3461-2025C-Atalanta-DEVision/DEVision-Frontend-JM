import React, { useState, useEffect, useCallback, use } from "react";

function useSearchApplicantForm(
  values,
  SearchCriteriaApi,
  validateAll,
  reset,
  onSearchCriteriaCreated,
  setValues
) {
  const [currentCriteria, setCurrentCriteria] = useState(null);
  const [msg, setMSG] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    getCurrentCriteria();
  }, []);

  const getCurrentCriteria = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await SearchCriteriaApi.getCompanySearchProfile();
      console.log("RES", response);

      setCurrentCriteria(response);
      
      await new Promise((resolve) => setTimeout(resolve, 800));
    } catch (error) {
      if (error.status === 404) {
        setCurrentCriteria(null);
      } else {
        console.error("Error fetch criteria", error);
        setMSG({
          type: "error",
          message: "Failed to get search criteria. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const openEditMode = () => {
    setEditFormReady(true);
    const formReady = setEditFormReady(currentCriteria);
    setValues(formReady);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateAll();
    if (!isValid) {
      return;
    }

    try {
      setIsLoading(true);
      setMSG(null);
      const cleanedPayload = cleanPayload(values);
      const response = await SearchCriteriaApi.createSearchProfile(
        cleanedPayload
      );
      await new Promise((resolve) => setTimeout(resolve, 800));
      setMSG({
        type: "success",
        message: "Search criteria created successfully!",
      });

      setCurrentCriteria(response);

      await new Promise((resolve) => setTimeout(resolve, 800));
      reset();
    } catch (error) {
      console.error("Error during form submission:", error);
      setMSG({
        type: "error",
        message: "Failed to create search criteria. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cleanPayload = useCallback((payload) => {
    if (!payload) return {};

    const employmentTypeMap = {
      "Full-time": "FULL_TIME",
      "Part-time": "PART_TIME",
    };

    const additional = (payload.additionalEmploymentType || []).map((type) =>
      String(type).toUpperCase()
    );

    const statusArray = [
      ...additional,
      employmentTypeMap[payload.employmentTypes],
      payload.isFresherFriendly ? "FRESHER" : undefined,
    ].filter(Boolean);

    const cleaned = {
      name: payload.name,
      desiredRoles: ["SE", "IT"],
      technicalSkills: payload.technicalSkills,
      countries: [payload.country],
      expectedSalary: {
        min: payload.salaryMin,
        max: payload.salaryMax,
        currency: payload.currency,
      },
      employmentStatus: statusArray,
      isActive: true,
      desiredRoles: [
        ...payload.desiredRoles
          .split(";")
          .map((role) => role.trim())
          .filter((role) => role !== ""),
      ],
    };

    return cleaned;
  }, []);

  const setEditFormReady = useCallback((res) => {
    if (!res) {
      return;
    }

    const forType = normalizeEmployment(res.employmentStatus);

    const forForm = {
      name: res.name,
      technicalSkills: [...res.technicalSkills],
      country: res.countries[0],
      salaryMin: res.expectedSalary.min,
      salaryMax: res.expectedSalary.max,
      currency: res.expectedSalary.currency,

      isFresherFriendly: forType.isFresherFriendly,

      additionalEmploymentType: forType.additionalEmploymentType,
      employmentTypes: forType.employmentTypes,

      desiredRoles: res.desiredRoles.join(";"),
    };

    return forForm;
  }, []);

  const additionalTypeMap = {
    CONTRACT: "Contract",
    INTERNSHIP: "Internship",
  };

  const normalizeEmployment = useCallback((employmentStatus) => {
    const isFresherFriendly = employmentStatus.includes("FRESHER");

    let employmentTypes = "";
    if (employmentStatus.includes("FULL_TIME")) {
      employmentTypes = "Full-time";
    } else if (employmentStatus.includes("PART_TIME")) {
      employmentTypes = "Part-time";
    }

    const additionalEmploymentType = employmentStatus
      .filter((type) => additionalTypeMap[type])
      .map((type) => additionalTypeMap[type]);

    return {
      isFresherFriendly,
      employmentTypes,
      additionalEmploymentType,
    };
  }, []);

  return {
    handleSubmit,
    isLoading,
    msg,
    setIsFormOpen,
    isFormOpen,
    currentCriteria,
    openEditMode,
  };
}
export default useSearchApplicantForm;
