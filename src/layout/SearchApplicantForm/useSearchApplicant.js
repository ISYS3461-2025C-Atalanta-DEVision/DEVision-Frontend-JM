import React, { useState, useEffect, useCallback, use } from "react";
import authService from "../../services/authService";

function useSearchApplicant(
  values,
  SearchCriteriaApi,
  validateAll,
  reset,
  setValues
) {
  const [currentCriteria, setCurrentCriteria] = useState(null);
  const [msg, setMSG] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    if (currentCriteria === null || isFormOpen) {
      getCountries();
    }
    getCurrentCriteria();
  }, []);

  const getCountries = async () => {
    try {
      const response = await authService.getCountries();
      setCountries(response);
    } catch (err) {
      console.error("Failed to fetch countries:", err);
    }
  };

  const getCurrentCriteria = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await SearchCriteriaApi.getCompanySearchProfile();

      setCurrentCriteria(response);

      await new Promise((resolve) => setTimeout(resolve, 800));
    } catch (error) {
      if (error.status !== 404) {
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

  //ACTIONS
  const openEditMode = () => {
    setIsFormOpen(true);
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

  const handleCancelEdit = () => {
    setIsFormOpen(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const isValid = validateAll();
    if (!isValid) {
      return;
    }

    try {
      setIsLoading(true);
      setMSG(null);
      const cleanedPayload = cleanPayload(values);
      const response = await SearchCriteriaApi.editSearchProfile(
        cleanedPayload
      );
      await new Promise((resolve) => setTimeout(resolve, 800));
      setMSG({
        type: "success",
        message: "Search criteria updated successfully!",
      });

      setCurrentCriteria(response);

      await new Promise((resolve) => setTimeout(resolve, 800));

      setIsFormOpen(false);
      reset();
    } catch (error) {
      console.error("Error during form submission:", error);
      setMSG({
        type: "error",
        message: "Failed to update search criteria. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      setMSG(null);
      const response = await SearchCriteriaApi.deleteSearchProfile();

      await new Promise((resolve) => setTimeout(resolve, 800));
      setMSG({
        type: "success",
        message: "Delete successfully!",
      });

      setCurrentCriteria(null);

      await new Promise((resolve) => setTimeout(resolve, 800));
      reset();
    } catch (error) {
      console.error("Error during form submission:", error);
      setMSG({
        type: "error",
        message: "Failed to update search criteria. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  //HELPERS
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

  const normalizeEmployment = useCallback((employmentStatus) => {
    const isFresherFriendly = employmentStatus.includes("FRESHER");

    const additionalTypeMap = {
      CONTRACT: "Contract",
      INTERNSHIP: "Internship",
    };

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
    handleCancelEdit,
    handleUpdate,
    handleDelete,
    isLoading,
    msg,
    setIsFormOpen,
    isFormOpen,
    currentCriteria,
    openEditMode,

    countries,
  };
}
export default useSearchApplicant;
