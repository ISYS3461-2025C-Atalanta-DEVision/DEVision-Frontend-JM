import React from "react";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import Select from "../../components/Select";
import Alert from "../../components/Alert";
import SkillTag from "../../components/SkillTag";
import { useForm, postValidators } from "../../hooks/useForm";
import { SKILL_LIST } from "../../ui_config/SkillList";
import CategoryInput from "../../components/CategoryInput/CategoryInput";
import { employmentTypes, salaryTypes } from "../../ui_config/PostCreate";
import useCreatePostForm from "./useCreatePostForm";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateJobPost({ company }) {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleListChange,
    validateAll,
    reset,
  } = useForm(
    {
      title: "",
      description: "",

      employmentType: "",
      location: "",

      salaryType: "",

      minSalaryValue: "",
      maxSalaryValue: "",

      estimationSalary: "",

      requireSkills: [],
      images: [""],

      expiryDate: "",

      published: false,
    },
    {
      title: [postValidators.required("Job title is required")],
      description: [postValidators.required("Job description is required")],
      employmentType: [postValidators.required("Employment type is required")],
      location: [postValidators.required("Location is required")],

      salaryType: [postValidators.required("Salary type is required")],
      minSalaryValue: [
        (value, values) => {
          if (values.salaryType !== "range") return "";
          return postValidators.required("Min salary is required")(value);
        },
        postValidators.isNumber(),
        postValidators.salaryPositive(),
      ],
      maxSalaryValue: [
        (value, values) => {
          if (values.salaryType !== "range") return "";
          return postValidators.required("Max salary is required")(value);
        },
        postValidators.isNumber(),
        postValidators.salaryPositive(),
      ],
      estimationSalary: [
        (value, values) => {
          if (values.salaryType !== "estimation") return "";
          return postValidators.required("Estimation salary is required")(
            value
          );
        },
        postValidators.isNumber(),
        postValidators.salaryPositive(),
      ],

      requireSkills: [
        postValidators.minArrayLength(1, "At least one skill is required"),
      ],
      expiryDate: [postValidators.required("Expiry date is required")],
    }
  );

  const { handleSubmit, loading, error, isCreating, setIsCreating } =
    useCreatePostForm(null, validateAll, values, company);

  const formVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  return (
    <AnimatePresence mode="wait">
      <div className="w-full h-content bg-backGround p-6">
        {!isCreating ? (
          <motion.div
            key="create-button"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-3xl text-neutral8 flex flex-row items-center justify-center bg-bgComponent hover:bg-primary hover:text-neutral1 rounded-lg shadow p-6 gap-3"
            onClick={() => setIsCreating(true)}
          >
            <h1 className="font-bold">Create New Job Post</h1>
            <i class="ri-add-circle-line"></i>
          </motion.div>
        ) : (
          <motion.div
            key="form-content"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut"}}
            className="max-full mx-auto"
          >
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-textBlack">
                Create New Job Post
              </h1>
              <p className="text-neutral6 mt-2">
                Fill in the details to create a new job posting
              </p>
            </div>

            {/* Alert Example */}
            <Alert
              type="info"
              message="Make sure all required fields are filled before publishing."
              className="mb-6"
            />

            {/* Form */}
            <div className="bg-bgComponent rounded-lg shadow p-6 space-y-6">
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
                  ></TextArea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Employment Type"
                    name="employmentType"
                    value={values.employmentType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.employmentType}
                    options={employmentTypes}
                    placeholder="Select employment type"
                    required
                  />

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
              </div>

              {/* Salary Section */}
              <div>
                <h2 className="text-xl font-semibold text-textBlack mb-4 border-b pb-2">
                  Compensation
                </h2>

                <div className="flex flex-col">
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

                  <div className="flex flex-row gap-4">
                    {values.salaryType === "range" ? (
                      <>
                        <Input
                          label="Min Salary Value"
                          name="minSalaryValue"
                          value={values.minSalaryValue}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.minSalaryValue}
                          type="text"
                          placeholder="e.g., 0 USD"
                          className="flex-1"
                        />
                        <Input
                          label="Max Salary Value"
                          name="maxSalaryValue"
                          value={values.maxSalaryValue}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.maxSalaryValue}
                          type="text"
                          placeholder="e.g., 1200 USD"
                          className="flex-1"
                        />
                      </>
                    ) : values.salaryType === "estimation" ? (
                      <Input
                        label="Estimation Salary Value"
                        name="estimationSalary"
                        value={values.estimationSalary}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.estimationSalary}
                        type="text"
                        placeholder="e.g., 1200 USD"
                        className="flex-1"
                      />
                    ) : values.salaryType === "negotiable" ? (
                      <></>
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
                    {values.requireSkills.map((skill, idx) => (
                      <div key={idx} className="relative group">
                        <SkillTag skillName={skill} />
                        <button
                          className="absolute -top-2 -right-2 w-5 h-5 bg-error text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove skill"
                        ></button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <CategoryInput
                      label="Required Skills"
                      name="requireSkills"
                      value={values.requireSkills}
                      onChange={handleListChange}
                      onBlur={handleBlur}
                      error={errors.requireSkills}
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
                    name="expiryDate"
                    value={values.expiryDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.expiryDate}
                    type="date"
                    placeholder="Leave empty for no expiry"
                  />
                </div>
              </div>

              {/* Media Section */}
              <div>
                <h2 className="text-xl font-semibold text-textBlack mb-4 border-b pb-2">
                  Media (Optional)
                </h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral8 mb-2">
                    Upload Images
                  </label>
                  <div className="border-2 border-dashed border-neutral3 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <i className="ri-upload-cloud-2-line text-4xl text-neutral6 mb-2"></i>
                    <p className="text-neutral7">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-neutral6 mt-1">
                      PNG, JPG up to 5MB each
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 overflow-x-auto p-2">
                  {/* Preview uploaded images */}
                  <div className="relative group flex-shrink-0">
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Preview"
                      className="w-24 h-24 rounded-md object-cover border"
                    />
                    <button className="absolute -top-2 -right-2 w-6 h-6 bg-error text-white rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity"></button>
                  </div>
                </div>
              </div>

              {/* Publishing Options */}
              <div>
                <h2 className="text-xl font-semibold text-textBlack mb-4 border-b pb-2">
                  Publishing Options
                </h2>

                <div className="flex items-center gap-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="published"
                      className="h-4 w-4 text-primary focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-neutral8">
                      Publish immediately
                    </span>
                  </label>
                </div>
                <p className="text-sm text-neutral6 mt-2">
                  Uncheck to save as draft. You can publish it later from your
                  job posts list.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={async() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setIsCreating(false);
                    reset();
                  }}
                >
                  Cancel
                </Button>
                <Button variant="secondary" size="lg">
                  Save as Draft
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleSubmit}
                  loading={loading}
                >
                  Create Job Post
                </Button>
              </div>

              {error && (
                <div className="mt-4">
                  <Alert type="error" message={error} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
