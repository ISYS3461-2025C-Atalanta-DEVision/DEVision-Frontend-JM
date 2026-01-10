import React from "react";
import { useForm, postValidators } from "../../hooks/useForm";
import { motion, AnimatePresence } from "framer-motion";
import Alert from "../../components/Alert";
import Input from "../../components/Input";
import Select from "../../components/Select";
import CategoryInput from "../../components/CategoryInput/CategoryInput";
import SkillCategoryInput from "../../components/SkillCategoryInput/SkillCategoryInput";
import SkillTag from "../../components/SkillTag";
import Button from "../../components/Button";
import useSearchApplicantForm from "./useSearchApplicantForm";

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
  } = useForm(
    {
      name: "Java Developers",
      technicalSkills: ["Java", "Spring Boot"],
      country: "Germany",

      salaryMin: "9000", //map to "expectedSalary"
      salaryMax: "191000",
      currency: "USD",

      additionalEmploymentType: [], //map to employmentStatus
      employmentTypes: "",
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

  const { handleSubmit } = useSearchApplicantForm(
    values,
    null,
    validateAll,
    reset,
    null
  );

  const formVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="create-button"
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full"
      >
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6 border border-neutral2">
          {/* <div className="mb-6">
            <h1 className="text-3xl font-bold text-primary">
              Create Search Applicant
            </h1>
            <p className="text-sm text-black mt-2">
              Fill in the details to create your first search applicant profile.
            </p>
          </div> */}

          <div>
            <h2 className="text-xl font-semibold text-blacktxt mb-4 border-b border-neutral2 pb-2">
              Name Your Profile
            </h2>
            <Input
              label="Name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              placeholder="e.g., Frontend Developer"
              required
              className="mb-4"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blacktxt mb-4 border-b border-neutral2 pb-2">
              Location & Preferences
            </h2>
            <Select
              label="Country"
              name="country"
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.country}
              options={["Germany", "United States", "Canada", "Australia"]}
              placeholder={
                false ? "Loading countries..." : "Select your country"
              }
              //   disabled={loadingCountries}
              required
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-blacktxt mb-4 border-b border-neutral2 pb-2">
              Applicant Preferences
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral8 mb-2">
                Selected Skills
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {values.technicalSkills.map((skillId, idx) => (
                  <div key={idx} className="relative group">
                    <SkillTag skillId={skillId} />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      title="Remove skill"
                      onClick={() =>
                        handlerRemoveListItem("technicalSkills", skillId)
                      }
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <SkillCategoryInput
                label="Required Skills"
                name="technicalSkills"
                value={values.technicalSkills}
                onChange={handleListChange}
                onBlur={handleBlur}
                error={errors.technicalSkills}
                placeholder="Type to find skills"
                className="w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral8 mb-2">
                Selected deals
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {values.additionalEmploymentType.map((deal, idx) => (
                  <div key={idx} className="relative group">
                    <div className="flex items-center justify-center px-3 py-1.5 gap-2 bg-neutral4/20 border border-blacktxt/30 rounded-lg">
                      <p className="text-sm text-black font-medium">{deal}</p>
                    </div>
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      title="Remove deal"
                      onClick={() =>
                        handlerRemoveListItem("additionalEmploymentType", deal)
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
          </div>

          <div>
            <div className="flex flex-col md:flex-row gap-4">
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
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="primary"
              size="lg"
              className="bg-blacktxt text-white hover:bg-primary-2"
              onClick={() => handleSubmit()}
            >
              Save Profile
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default SearchApplicantForm;

//      "name": "Java Developers", aaaa
//     "country": "Germany", aaaaa
//     "technicalSkills": ["Java", "Spring Boot"], aaa
//     "employmentStatus": ["FULL_TIME"], aaaaa
//     "salaryMin": 50000,
//     "salaryMax": 100000,
//     "educationDegree": "BACHELOR"
