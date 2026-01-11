import React from "react";
import { useForm, postValidators } from "../../hooks/useForm";
import { motion, AnimatePresence } from "framer-motion";
import useSearchApplicantForm from "./useSearchApplicantForm";
import premiumService from "../../services/premiumService";
import SearchApplicantCard from "./SearchApplicantCard";
import Graphs from "../../headless/react_chartjs/Graphs";
import Form from "./Form";

function SearchApplicantForm() {
  const {
    values,
    validateAll,
    handleChange,
    handleBlur,
    errors,
    handleListChange,
    handlerRemoveListItem,
    reset,
    setValues,
  } = useForm(
    {
      name: "",
      technicalSkills: [],
      country: "",

      salaryMin: "", //map to "expectedSalary"
      salaryMax: "",
      currency: "",

      isFresherFriendly: false,

      additionalEmploymentType: [], //map to employmentStatus
      employmentTypes: "",

      desiredRoles: "",
    },
    {
      name: [postValidators.required("Name is required")],
      technicalSkills: [
        postValidators.minArrayLength(1, "At least one skill is required"),
      ],
      country: [postValidators.required("Country is required")],
      salaryMin: [
        postValidators.required("Minimum salary is required"),
        postValidators.isNumber("Minimum salary must be a number"),
        postValidators.salaryPositive("Minimum salary must be positive"),
        postValidators.mustSmallerThan(
          "salaryMax",
          "Minimum salary must be less than maximum salary"
        ),
      ],
      desiredRoles: [
        postValidators.required("Desired roles is required"),
        postValidators.desiredRolesFormat(
          "Desired roles must be semicolons separated"
        ),
      ],
      salaryMax: [
        postValidators.required("Maximum salary is required"),
        postValidators.isNumber("Maximum salary must be a number"),
        postValidators.salaryPositive("Maximum salary must be positive"),
        postValidators.mustLargerThan(
          "salaryMin",
          "Maximum salary must be larger than minimum salary"
        ),
      ],
      currency: [postValidators.required("Currency is required")],
      // educationDegree: [
      //   postValidators.required("Education degree is required"),
      // ],
      additionalEmploymentType: [
        postValidators.minArrayLength(
          1,
          "At least one employment deal is required"
        ),
      ],
      employmentTypes: [postValidators.required("Employment type is required")],
    }
  );

  const {
    handleSubmit,
    isLoading,
    msg,
    setIsFormOpen,
    isFormOpen,
    currentCriteria,
    openEditMode,
  } = useSearchApplicantForm(
    values,
    premiumService,
    validateAll,
    reset,
    null,
    setValues
  );

  const formVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  if (currentCriteria === null) {
    return (
      <AnimatePresence mode="wait">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary">
            Create Search Applicant
          </h1>
          <p className="text-sm text-black mt-2">
            Fill in the details to create your first search applicant profile.
          </p>

          <Form
            values={values}
            errors={errors}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleListChange={handleListChange}
            handlerRemoveListItem={handlerRemoveListItem}
            isLoading={isLoading}

          />
        </div>
      </AnimatePresence>
    );
  } else {
    return (
      <AnimatePresence mode="wait">
        {isFormOpen ? (
          <>
            <motion.div
              key="create-button"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full flex gap-6 px-6"
            >
              <Form
                values={values}
                errors={errors}
                handleSubmit={handleSubmit}
              />
              <Graphs />
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              key="create-button"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full flex gap-6 px-6"
            >
              <SearchApplicantCard
                profile={currentCriteria}
                onEdit={openEditMode}
                onDelete={null}
              />

              <Graphs />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }
}

export default SearchApplicantForm;

//      "name": "Java Developers", aaaa
//     "country": "Germany", aaaaa
//     "technicalSkills": ["Java", "Spring Boot"], aaa
//     "employmentStatus": ["FULL_TIME"], aaaaa
//     "salaryMin": 50000,
//     "salaryMax": 100000,
//     "educationDegree": "BACHELOR"
