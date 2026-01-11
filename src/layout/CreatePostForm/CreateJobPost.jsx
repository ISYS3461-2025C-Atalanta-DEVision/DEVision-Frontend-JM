import React from "react";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import Select from "../../components/Select";
import Alert from "../../components/Alert";
import SkillTag from "../../components/SkillTag";
import { useForm, postValidators } from "../../hooks/useForm";
import CategoryInput from "../../components/CategoryInput/CategoryInput";
import SkillCategoryInput from "../../components/SkillCategoryInput/SkillCategoryInput";
import {
  salaryTypes,
  salaryEstimationTypes,
  salaryCurrency,
} from "../../static/PostCreate";
import useCreatePostForm from "./useCreatePostForm";
import { motion, AnimatePresence } from "framer-motion";
import jobPostService from "../../services/jobPostService";
import ConfirmBox from "../../components/ConfirmBox";

export default function CreateJobPost({ onPostCreated }) {
  const {
    values,
    errors,
    handleChange,
    handlerRemoveListItem,
    handleBlur,
    handleListChange,
    validateAll,
    reset,
  } = useForm(
    {
      title: "",
      description: "",
      employmentTypes: "",
      additionalEmploymentType: [],
      location: "",
      salaryType: "",
      salaryMin: "",
      salaryMax: "",
      salaryAmount: "",
      salaryEstimationType: "",
      skills: [],
      salaryCurrency: "AUD",
      expireDate: "",
      status: "PRIVATE",
      isFresherFriendly: false,
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
        postValidators.mustSmallerThan(
          "salaryMax",
          "Min salary must be less than Max salary"
        ),
      ],
      salaryMax: [
        (value, values) => {
          if (values.salaryType !== "RANGE") return "";
          return postValidators.required("Max salary is required")(value);
        },
        postValidators.isNumber(),
        postValidators.salaryPositive(),
        postValidators.mustLargerThan(
          "salaryMin",
          "Max salary must be greater than Min salary"
        ),
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

  const {
    handleSubmit,
    isCreating,
    success,
    error,
    isFormOpen,
    setFormOpen,
    confirmBoxOpen,
    setConfirmBoxOpen,
  } = useCreatePostForm(
    values,
    jobPostService.createPost,
    validateAll,
    reset,
    onPostCreated
  );

  const formVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <AnimatePresence mode="wait">
      <div className="w-full mb-6">
        {!isFormOpen ? (
          <motion.div
            key="create-button"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full"
          >
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="flex items-center justify-center gap-3 w-full
                         bg-white hover:bg-primary hover:text-white
                         border border-neutral4 rounded-lg shadow-sm px-5 py-4
                         text-2xl font-semibold text-blacktxt transition-colors"
            >
              <span>Create New Job Post</span>
              <i className="ri-add-circle-line text-3xl" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form-content"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full"
          >
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-primary">
                Create New Job Post
              </h1>
              <p className="text-sm text-black mt-2">
                Fill in the details to create a new job posting.
              </p>
            </div>

            {/* Info Alert */}
            <Alert
              type="info"
              message="Make sure all required fields are filled before publishing."
              className="mb-6"
            />

            {/* Form container */}
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6 border border-neutral2">
              {/* Basic Information */}
              <div>
                <h2 className="text-xl font-semibold text-blacktxt mb-4 border-b border-neutral2 pb-2">
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
                  className="mb-4"
                />

                {/* Additional employment deals */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-blacktxt mb-2">
                    Selected deals
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {values.additionalEmploymentType.map((deal, idx) => (
                      <div key={idx} className="relative group">
                        <div className="flex items-center justify-center px-3 py-1.5 gap-2 bg-neutral3 border border-blacktxt/30 rounded-lg">
                          <p className="text-sm text-black font-medium">
                            {deal}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          title="Remove deal"
                          onClick={() =>
                            handlerRemoveListItem(
                              "additionalEmploymentType",
                              deal
                            )
                          }
                        >
                          ×
                        </button>
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

                {/* Location */}
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

              {/* Compensation */}
              <div>
                <h2 className="text-xl font-semibold text-blacktxt mb-4 border-b border-neutral5 pb-2">
                  Compensation
                </h2>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row gap-4">
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

                  <div className="flex flex-col md:flex-row gap-4">
                    {values.salaryType === "RANGE" && (
                      <>
                        <Input
                          label="Min Salary Value"
                          name="salaryMin"
                          value={values.salaryMin}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.salaryMin}
                          type="text"
                          placeholder="e.g., 0"
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
                          placeholder="e.g., 1200"
                          className="flex-1"
                          required
                        />
                      </>
                    )}
                    {values.salaryType === "ESTIMATION" && (
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
                          placeholder="e.g., 1200"
                          className="flex-1"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h2 className="text-xl font-semibold text-blacktxt mb-4 border-b border-neutral5 pb-2">
                  Required Skills
                </h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-blacktxt mb-2">
                    Selected Skills
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {values.skills.map((skillId, idx) => (
                      <div key={idx} className="relative group">
                        <SkillTag skillId={skillId} />
                        <button
                          type="button"
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          title="Remove skill"
                          onClick={() =>
                            handlerRemoveListItem("skills", skillId)
                          }
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <SkillCategoryInput
                    label="Required Skills"
                    name="skills"
                    value={values.skills}
                    onChange={handleListChange}
                    onBlur={handleBlur}
                    error={errors.skills}
                    placeholder="Type to find skills"
                    className="w-full"
                    required
                  />
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h2 className="text-xl font-semibold text-blacktxt mb-4 border-b border-neutral5 pb-2">
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

              {/* Additional Options - Highlighted boxes for checkboxes */}
              <div>
                <h2 className="text-xl font-semibold text-blacktxt mb-4 border-b border-neutral5 pb-2">
                  Additional Options
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                  {/* Fresher friendly */}
                  <div className="bg-neutral3 border border-neutral5 rounded-lg p-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="isFresherFriendly"
                        checked={values.isFresherFriendly}
                        onChange={handleChange}
                        className="h-4 w-4 text-blacktxt focus:ring-blacktxt border-neutral3 rounded"
                      />
                      <span className="ml-2 text-sm text-black font-medium">
                        Fresher Friendly
                      </span>
                    </label>
                    <p className="text-xs text-black mt-2">
                      Tick this if this position is suitable for entry-level
                      candidates or fresh graduates.
                    </p>
                  </div>

                  {/* Publish immediately */}
                  <div className="bg-neutral3 border border-neutral5 rounded-lg p-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="status"
                        checked={values.status === "PUBLIC"}
                        onChange={handleChange}
                        className="h-4 w-4 text-blacktxt focus:ring-blacktxt border-neutral3 rounded"
                      />
                      <span className="ml-2 text-sm text-black font-medium">
                        Publish immediately
                      </span>
                    </label>
                    <p className="text-xs text-black mt-2">
                      Uncheck to save as draft. You can publish it later from
                      your job posts list.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-neutral5">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setFormOpen(false);
                    reset();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setConfirmBoxOpen(true)}
                >
                  Save as Draft
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleSubmit}
                  loading={isCreating}
                >
                  Create Job Post
                </Button>
              </div>

              {error && (
                <div className="mt-4">
                  <Alert type="error" message={error} />
                </div>
              )}
              {success && (
                <div className="mt-4">
                  <Alert type="success" message={success} />
                </div>
              )}
            </div>

            {confirmBoxOpen && (
              <ConfirmBox
                buttons={[
                  {
                    type: "return",
                    content: "Return",
                    onClick: () => setConfirmBoxOpen(false),
                  },
                  {
                    type: "confirm",
                    content: "Save as draft",
                    onClick: () => setConfirmBoxOpen(false),
                  },
                ]}
                title="Your post is not published, do you want to save it to drafts?"
                subTitle="Check 'Publish immediately' to publish right away."
              />
            )}
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
