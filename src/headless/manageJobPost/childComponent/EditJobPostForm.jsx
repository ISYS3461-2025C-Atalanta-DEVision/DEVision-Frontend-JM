import React from "react";
import { motion } from "framer-motion";
import { useForm, postValidators } from "../../../hooks/useForm";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import TextArea from "../../../components/TextArea";
import Alert from "../../../components/Alert";
import SkillTag from "../../../components/SkillTag";
import CategoryInput from "../../../components/CategoryInput/CategoryInput";
import { SKILL_LIST } from "../../../static/SkillList";
import {
  salaryTypes,
  salaryEstimationTypes,
  salaryCurrency,
} from "../../../static/PostCreate";
import useEditJobPostForm from "../hooks/useEditJobPostForm";
import jobPostService from "../../../services/jobPostService";
import { parseSalaryDisplay } from "../../../utils/salaryParser";

export default function EditJobPostForm({
  currentData,
  setSearchParams,
  setPosts,
}) {
  // Parse salary display to get individual fields
  const parsedSalary = parseSalaryDisplay(currentData?.salaryDisplay);

  const {
    values,
    errors,
    handleChange,
    handlerRemoveListItem,
    handleBlur,
    handleListChange,
    validateAll,
  } = useForm(
    {
      title: currentData?.title || "",
      description: currentData?.description || "",
      employmentTypes: currentData?.employmentType || "",
      additionalEmploymentType: currentData?.additionalEmploymentTypes || [],
      location: currentData?.location || "",
      // Use parsed salary data if backend doesn't provide individual fields
      salaryType: currentData?.salaryType || parsedSalary.salaryType,
      salaryMin: currentData?.salaryMin || parsedSalary.salaryMin,
      salaryMax: currentData?.salaryMax || parsedSalary.salaryMax,
      salaryAmount: currentData?.salaryAmount || parsedSalary.salaryAmount,
      salaryEstimationType: currentData?.salaryEstimationType || parsedSalary.salaryEstimationType,
      skills: currentData?.skills || [],
      salaryCurrency: currentData?.salaryCurrency || parsedSalary.salaryCurrency,
      expireDate: currentData?.expireDate || "",
      status: currentData?.status || "PRIVATE",
    },
    {
      title: [postValidators.required("Job title is required")],
      description: [postValidators.required("Job description is required")],
      employmentTypes: [postValidators.required("Employment type is required")],
      location: [postValidators.required("Location is required")],
      salaryType: [postValidators.required("Salary type is required")],
      salaryCurrency: [postValidators.required("Salary currency is required")],
      salaryMin: [
        (value, values) => {
          if (values.salaryType !== "RANGE") return "";
          return postValidators.required("Min salary is required")(value);
        },
        postValidators.isNumber(),
        postValidators.salaryPositive(),
      ],
      salaryMax: [
        (value, values) => {
          if (values.salaryType !== "RANGE") return "";
          return postValidators.required("Max salary is required")(value);
        },
        postValidators.isNumber(),
        postValidators.salaryPositive(),
      ],
      salaryAmount: [
        (value, values) => {
          if (values.salaryType !== "ESTIMATION") return "";
          return postValidators.required("Estimation salary is required")(
            value
          );
        },
        postValidators.isNumber(),
        postValidators.salaryPositive(),
      ],
      salaryEstimationType: [
        (value, values) => {
          if (values.salaryType !== "ESTIMATION") return "";
          return postValidators.required("Salary estimation type is required")(
            value
          );
        },
      ],
      skills: [
        postValidators.minArrayLength(1, "At least one skill is required"),
      ],
      additionalEmploymentType: [
        postValidators.minArrayLength(
          1,
          "At least one employment deal is required"
        ),
      ],
      expireDate: [postValidators.required("Expiry date is required")],
    }
  );

  const { isSaving, confirmationMessage, handleSubmit } = useEditJobPostForm(
    jobPostService.updateJobPost,
    values,
    validateAll,
    setSearchParams,
    setPosts,
    currentData.jobId
  );

  return (
    <motion.div
      className="mt-6 bg-bgComponent rounded-lg shadow p-6"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-textBlack">Edit Job Post</h1>
        <p className="text-neutral6 mt-2">
          Update the details for this job posting
        </p>
      </div>

      {/* Alert Info */}
      <Alert
        type="info"
        message="Make sure all required fields are filled before saving."
        className="mb-6"
      />

      {/* Form */}
      <div className="space-y-6">
        {/* Basic Information Section */}
        <div>
          <h2 className="text-xl font-semibold text-textBlack mb-4 border-b pb-2">
            Basic Information
          </h2>

          <Input
            label="Job Title"
            name="title"
            type="text"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.title}
            placeholder="e.g., Frontend Developer"
            required
            className="mb-4"
          />

          <div className="mb-4">
            <TextArea
              label="Description"
              name="description"
              type="text"
              rows={5}
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.description}
              placeholder="Describe the role, responsibilities, and requirements..."
              required
            />
          </div>

          <Select
            label="Employment Type"
            name="employmentTypes"
            value={values.employmentTypes}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.employmentTypes}
            options={["Full-time", "Part-time"]}
            placeholder="Select employment type"
            required
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral8 mb-2">
              Selected deals
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {values.additionalEmploymentType.map((deal, idx) => (
                <div key={idx} className="relative group">
                  <div className="flex items-center justify-center w-content h-content px-3 py-2 gap-2 bg-neutral1 rounded-lg">
                    <p className="text-blacktxt font-medium">{deal}</p>
                  </div>
                  <button
                    className="absolute -top-2 -right-2 w-5 h-5 bg-error text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove deals"
                    onClick={() =>
                      handlerRemoveListItem("additionalEmploymentType", deal)
                    }
                  ></button>
                </div>
              ))}
            </div>
            <CategoryInput
              label="Employment Deal"
              name="additionalEmploymentType"
              value={values.additionalEmploymentType}
              onChange={handleListChange}
              onBlur={handleBlur}
              error={errors.additionalEmploymentType}
              options={["Internship", "Contract"]}
              placeholder="Employment deal"
              className="w-full"
              required
            />
          </div>

          {/* Location Section */}
          <Input
            label="Location"
            name="location"
            value={values.location}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.location}
            type="text"
            placeholder="e.g., Ho Chi Minh City, Vietnam"
            required
          />
        </div>

        {/* Salary Section */}
        <div>
          <h2 className="text-xl font-semibold text-textBlack mb-4 border-b pb-2">
            Compensation
          </h2>
          <div className="flex flex-col">
            <div className="flex flex-row gap-4">
              <Select
                label="Salary Type"
                name="salaryType"
                value={values.salaryType}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.salaryType}
                options={salaryTypes}
                placeholder="Select salary type"
                required
                className="flex-1"
              />

              <Select
                label="Currency"
                name="salaryCurrency"
                value={values.salaryCurrency}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.salaryCurrency}
                options={salaryCurrency}
                placeholder="Select currency"
                required
                className="flex-1"
              />
            </div>
            <div className="flex flex-row gap-4">
              {values.salaryType === "RANGE" ? (
                <>
                  <Input
                    label="Min Salary Value"
                    name="salaryMin"
                    value={values.salaryMin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.salaryMin}
                    type="text"
                    placeholder="e.g., 0 USD"
                    className="flex-1"
                    required
                  />
                  <Input
                    label="Max Salary Value"
                    name="salaryMax"
                    value={values.salaryMax}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.salaryMax}
                    type="text"
                    placeholder="e.g., 1200 USD"
                    className="flex-1"
                    required
                  />
                </>
              ) : values.salaryType === "ESTIMATION" ? (
                <>
                  <Select
                    label="Salary Estimation Type"
                    name="salaryEstimationType"
                    value={values.salaryEstimationType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.salaryEstimationType}
                    options={salaryEstimationTypes}
                    placeholder="Select salary estimation type"
                    required
                    className="flex-1"
                  />
                  <Input
                    label="Estimation Salary Value"
                    name="salaryAmount"
                    value={values.salaryAmount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.salaryAmount}
                    type="text"
                    placeholder="e.g., 1200 USD"
                    className="flex-1"
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <h2 className="text-xl font-semibold text-textBlack mb-4 border-b pb-2">
            Required Skills
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral8 mb-2">
              Selected Skills
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {values.skills.map((skill, idx) => (
                <div key={idx} className="relative group">
                  <SkillTag skillName={skill} />
                  <button
                    className="absolute -top-2 -right-2 w-5 h-5 bg-error text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove skill"
                    onClick={() => handlerRemoveListItem("skills", skill)}
                  ></button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <CategoryInput
                label="Required Skills"
                name="skills"
                value={values.skills}
                onChange={handleListChange}
                onBlur={handleBlur}
                error={errors.skills}
                options={SKILL_LIST}
                placeholder="Type to find skills"
                className="w-full"
                required
              />
            </div>
          </div>
        </div>

        {/* Dates Section */}
        <div>
          <h2 className="text-xl font-semibold text-textBlack mb-4 border-b pb-2">
            Timeline
          </h2>

          <div className="md:grid-cols-2 gap-4">
            <Input
              label="Expiry Date"
              name="expireDate"
              value={values.expireDate}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.expireDate}
              type="date"
              placeholder="Leave empty for no expiry"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4 border-t">
          {confirmationMessage && (
            <Alert
              type={confirmationMessage.type}
              message={confirmationMessage.message}
            />
          )}

          <Button
            variant="outline"
            size="md"
            onClick={() => {
              setSearchParams((prev) => {
                const next = new URLSearchParams(prev);
                next.delete("edit");
                return next;
              });
            }}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button variant="primary" size="md" onClick={() => handleSubmit()}>
            {isSaving ? (
              <>
                <i className="ri-loader-4-line animate-spin" />
                Saving changes...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
