import React from "react";
import { useForm, postValidators } from "../../hooks/useForm";
import { motion, AnimatePresence } from "framer-motion";
import useSearchApplicant from "./useSearchApplicant";
import premiumService from "../../services/premiumService";
import SearchApplicantCard from "./SearchApplicantCard";
import Graphs from "../../headless/react_chartjs/Graphs";
import SearchApplicantForm from "./SearchApplicantForm";

export default function SearchApplicantView() {
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
    isFormOpen,
    currentCriteria,
    openEditMode,
    handleCancelEdit,
    handleUpdate,
    handleDelete,
    countries,
  } = useSearchApplicant(values, premiumService, validateAll, reset, setValues);

  const formVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-backGround">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (currentCriteria === null) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="create-button"
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full flex gap-6 px-6"
        >
          <SearchApplicantForm
            values={values}
            errors={errors}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleListChange={handleListChange}
            handlerRemoveListItem={handlerRemoveListItem}
            isLoading={isLoading}
            countries={countries}
          />

          <Graphs data={currentCriteria} />
        </motion.div>
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
              <SearchApplicantForm
                values={values}
                errors={errors}
                handleSubmit={handleSubmit}
                handleCancle={handleCancelEdit}
                handleChange={handleChange}
                handleUpdate={handleUpdate}
                handleBlur={handleBlur}
                handleListChange={handleListChange}
                handlerRemoveListItem={handlerRemoveListItem}
                isLoading={isLoading}
                editMode={true}
                countries={countries}
              />
              <Graphs data={currentCriteria} />
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
                onDelete={handleDelete}
              />

              <Graphs data={currentCriteria} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }
}
