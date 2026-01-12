import React, { useState } from "react";
import Alert from "../../components/Alert";
import Input from "../../components/Input";
import Select from "../../components/Select";
import CategoryInput from "../../components/CategoryInput/CategoryInput";
import SkillCategoryInput from "../../components/SkillCategoryInput/SkillCategoryInput";
import SkillTag from "../../components/SkillTag";
import Button from "../../components/Button";
import { salaryCurrency } from "../../static/PostCreate";
import ConfirmBox from "../../components/ConfirmBox";

export default function SearchApplicantForm({
  values,
  errors,
  handleSubmit,
  handleCancle = null,
  handleUpdate = null,
  handleChange,
  handleBlur,
  handleListChange,
  handlerRemoveListItem,
  isLoading,
  editMode = false,
  countries = null,
}) {
  const [cf, setCf] = useState(null);
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 border border-neutral2">
      <div className="mb-6">
        {editMode ? (
          <>
            <h1 className="text-3xl font-bold text-primary pb-2">
              Edit Talent Profile
            </h1>
            <Alert
              type="info"
              message="Make sure all required fields are filled before saving."
            />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-primary pb-2">
              Create Talent Profile
            </h1>
            <Alert
              type="info"
              message="Make sure all required fields are filled before submit."
            />
          </>
        )}
      </div>

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
          placeholder="e.g., Recuitment 2026"
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
          options={countries === null ? ["Loading...."] : countries}
          placeholder={false ? "Loading countries..." : "Select your country"}
          //   disabled={loadingCountries}
          required
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-blacktxt mb-4 border-b border-neutral2 pb-2">
          Applicant Preferences
        </h2>

        <Input
          label="Desired Roles ( Use semicolon to separate multiple roles)"
          name="desiredRoles"
          type="text"
          value={values.desiredRoles}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.desiredRoles}
          placeholder="e.g., Frontend Developer;Software Engineering;Data Architect"
          required
          className="mb-4"
        />

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

        <div className="w-full mb-4 flex flex-rows items-end justify-around gap-4">
          <div className="flex-1">
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
            className="mb-4 flex-1"
          />
        </div>

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
          <Select
            label="Currency"
            name="currency"
            value={values.currency}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.currency}
            options={salaryCurrency}
            placeholder="Select currency"
            required
            className="flex-1"
          />
        </div>
      </div>

      <div className="flex justify-between gap-3">
        <div
          className={`${
            values.isFresherFriendly ? "bg-green-200" : "bg-neutral3"
          } border border-neutral5 rounded-lg p-4`}
        >
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
            Tick this if this position is suitable for entry-level candidates or
            fresh graduates.
          </p>
        </div>

        {/* <Button variant="outline" size="lg" onClick={() => handleCancle()}>
              Cancel
            </Button>

            <Button variant="primary" size="lg" onClick={() => handleUpdate()}>
              Save
            </Button> */}

        {editMode ? (
          <div className="flex items-end justify-end gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                setCf({
                  title: "You have not saved your Talent Profile. Are you sure you want to cancel ?",
                  subTitle: "Press Return to continue edit",
                  buttons: [
                    {
                      type: "return",
                      content: "Return",
                      onClick: () => setCf(null),
                    },
                    {
                      type: "confirm",
                      content: "Cancel",
                      onClick: () => {
                        setCf(null);
                        handleCancle();
                      },
                    },
                  ],
                })
              }
            >
              Cancel
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={() =>
                setCf({
                  title: "This will update your Talent Profile",
                  buttons: [
                    {
                      type: "return",
                      content: "Return",
                      onClick: () => setCf(null),
                    },
                    {
                      type: "confirm",
                      content: "Update",
                      onClick: (e) => {
                        setCf(null);
                        handleUpdate(e);
                      },
                    },
                  ],
                })
              }
            >
              Save
            </Button>
          </div>
        ) : (
          <div className="flex items-end justify-end gap-4">
            <Button
              variant="primary"
              size="lg"
              className="bg-blacktxt text-white hover:bg-primary-2"
              onClick={(e) => handleSubmit(e)}
            >
              Create
            </Button>
          </div>
        )}
      </div>

      {cf !== null && (
        <ConfirmBox
          buttons={cf.buttons}
          title={cf.title}
          subTitle={cf.subTitle}
        />
      )}
    </div>
  );
}
