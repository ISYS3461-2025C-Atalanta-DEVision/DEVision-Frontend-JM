import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import Alert from "../../components/Alert";
import SkillTag from "../../components/SkillTag";
import { useForm, postValidators } from "../../hooks/useForm";

export default function CreateJobPost() {
  const { values, errors, handleChange, handleBlur, validateAll } = useForm(
    {
      title: "",
      description: "",

      employmentType: "",
      location: "",

      salaryType: "",

      minSalaryValue: "",
      maxSlaryValue: "",

      estimatedSalary: "",

      requireSkills: [],
      images: [],

      expiryDate: "",
      noExpiry: false,

      published: false,
    },
    {
      title: [postValidators.required("Job title is required")],
      description: [postValidators.required("Job description is required")],
      employmentType: [postValidators.required("Employment type is required")],
      location: [postValidators.required("Location is required")],

      salaryType: [postValidators.required("Salary type is required")],
      minSalaryValue: [
        postValidators.required("Minimum salary value is required"),
        postValidators.isNumber(),
        postValidators.salaryPositive(),
      ],
      maxSlaryValue: [
        postValidators.required("Maximum salary value is required"),
        postValidators.isNumber(),
        postValidators.salaryPositive(),
      ],
      estimatedSalary: [
        postValidators.required("Estimated salary is required"),
        postValidators.isNumber(),
        postValidators.salaryPositive(),
      ],

      requireSkills: [
        postValidators.minArrayLength(1, "At least one skill is required"),
      ],
      expiryDate: [postValidators.required("Expiry date is required")],
    }
  );

  const selectedSkills = ["React", "JavaScript", "TypeScript"];
  const employmentTypes = [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
  ];
  const salaryTypes = [
    { value: "range", label: "Range" },
    { value: "estimation", label: "Estimation" },
    { value: "negotiable", label: "Negotiable" },
  ];

  return (
    <div className="min-h-screen bg-backGround p-6">
      <div className="max-w-4xl mx-auto">
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
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Description
                <span className="text-error ml-1">*</span>
              </label>

              <Input
                label="Description"
                name="description"
                type="textarea"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.description}
                placeholder="Describe the role, responsibilities, and requirements..."
                className="h-25"
                required
              ></Input>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Employment Type"
                name="employmentType"
                options={employmentTypes}
                placeholder="Select employment type"
                required
              />

              <Input
                label="Location"
                name="location"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Salary Type"
                name="salaryType"
                options={salaryTypes}
                placeholder="Select salary type"
                required
              />

              <Input
                label="Salary Value"
                name="salaryValue"
                type="text"
                placeholder="e.g., 1200 - 1800 USD"
              />
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h2 className="text-xl font-semibold text-textBlack mb-4 border-b pb-2">
              Required Skills
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selected Skills
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedSkills.map((skill, idx) => (
                  <div key={idx} className="relative group">
                    <SkillTag skillName={skill} />
                    <button
                      className="absolute -top-2 -right-2 w-5 h-5 bg-error text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove skill"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  name="skillSearch"
                  type="text"
                  placeholder="Search and add skills..."
                  className="flex-1 mb-0"
                />
                <Button variant="outline" size="md">
                  Add Skill
                </Button>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <button className="absolute -top-2 -right-2 w-6 h-6 bg-error text-white rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  ×
                </button>
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
                <span className="ml-2 text-sm text-gray-700">
                  Publish immediately
                </span>
              </label>
            </div>
            <p className="text-sm text-neutral6 mt-2">
              Uncheck to save as draft. You can publish it later from your job
              posts list.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" size="lg">
              Cancel
            </Button>
            <Button variant="secondary" size="lg">
              Save as Draft
            </Button>
            <Button variant="primary" size="lg">
              Create Job Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
