import React from "react";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import Select from "../../components/Select";
import Alert from "../../components/Alert";
import SkillTag from "../../components/SkillTag";
import { useForm, postValidators } from "../../hooks/useForm";
import { SKILL_LIST } from "../../static/SkillList";
import CategoryInput from "../../components/CategoryInput/CategoryInput";
import {
  salaryTypes,
  salaryEstimationTypes,
  salaryCurrency,
} from "../../static/PostCreate";
import useCreatePostForm from "./useCreatePostForm";
import { motion, AnimatePresence } from "framer-motion";
import postService from "../../services/postService";
import ImageHolder from "../../components/ImageHolder";
import useProfile from "../../hooks/useProfile";
import ConfirmBox from "../../components/ConfirmBox";

export default function CreateJobPost() {
  const { profile } = useProfile();

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
      images: [""],

      salaryCurrency: "AUD",

      expireDate: "",

      status: "PRIVATE",
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

  const {
    handleSubmit,
    isCreating,
    success,
    error,
    isFormOpen,
    setFormOpen,
    confirmBoxOpen,
    setConfirmBoxOpen,
  } = useCreatePostForm(values, postService.createPost, validateAll, reset);

  const formVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <AnimatePresence mode="wait">
      <div className=" w-content h-content bg-backGround">
        {!isFormOpen ? (
          <motion.div
            key="create-button"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full flex flex-row items-center justify-center gap-6"
          >
            {!isFormOpen ? (
              <>
                <div
                  className="flex-1 text-2xl text-neutral8 flex flex-row items-center justify-center bg-bgComponent hover:bg-primary hover:text-neutral1 rounded-lg shadow p-2 gap-3"
                  onClick={() => setFormOpen(true)}
                >
                  <h1 className="font-bold">Create New Job Post</h1>
                  <i className="ri-add-circle-line"></i>
                </div>
              </>
            ) : (
              <></>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="form-content"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
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
                  ></TextArea>
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
                            handlerRemoveListItem(
                              "additionalEmploymentType",
                              deal
                            )
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
                    ) : values.salaryType === "NEGOTIABLE" ? (
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
                  <label className="flex flex-row items-center justify-center cursor-pointer">
                    <Input
                      type="checkbox"
                      name="status"
                      checked={values.status === "PUBLIC"}
                      value={values.status}
                      onChange={handleChange}
                      className="text-primary focus:ring-blue-500 border-gray-300 rounded"
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
                  onClick={async () => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setFormOpen(false);
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
