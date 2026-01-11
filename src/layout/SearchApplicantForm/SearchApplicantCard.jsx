import React from "react";
import Button from "../../components/Button";
import SkillTag from "../../components/SkillTag";


export default function SearchApplicantCard({ profile, onEdit, onDelete }) {
  if (!profile) return null;

  const {
    name,
    desiredRoles = [],
    employmentStatus = [],
    expectedSalary = {},
    technicalSkills = [],
    countries = [],
    createdAt,
  } = profile;

  const isFresherFriendly = employmentStatus?.includes("FRESHER") ?? false;

  const salaryDisplay =
    expectedSalary && (expectedSalary.min || expectedSalary.max)
      ? `${expectedSalary.min ?? "—"} - ${expectedSalary.max ?? "—"} ${
          expectedSalary.currency || ""
        }`
      : "Not set";

  return (
    <article className="bg-bgComponent rounded-lg shadow p-6 border border-neutral2 w-full h-full">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-textBlack">{name}</h2>
          <p className="text-sm text-neutral6 mt-1">
            Created: {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          {isFresherFriendly && (
            <span className="px-3 py-1 rounded-full text-sm font-medium text-green-800 border border-green-300 bg-green-100">
              <i className="ri-seedling-line mr-1"></i>
              Fresher Friendly
            </span>
          )}
        </div>
      </header>

      <section className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-neutral8 mb-2">
            Desired Roles
          </h3>
          <div className="flex flex-wrap gap-2">
            {desiredRoles.length ? (
              desiredRoles.map((r, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-neutral3 text-blacktext rounded-full text-sm"
                >
                  {r}
                </span>
              ))
            ) : (
              <span className="text-neutral6 text-sm">Not specified</span>
            )}
          </div>

          <h3 className="text-sm font-semibold text-neutral8 mt-4 mb-2">
            Employment Status
          </h3>
          <div className="flex flex-wrap gap-2">
            {employmentStatus.length ? (
              employmentStatus.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-neutral3 text-blacktext rounded-full text-sm"
                >
                  {s.replaceAll("_", " ")}
                </span>
              ))
            ) : (
              <span className="text-neutral6 text-sm">Not specified</span>
            )}
          </div>

          <h3 className="text-sm font-semibold text-neutral8 mt-4 mb-2">
            Country
          </h3>

          <div className="flex flex-wrap gap-2">
            {countries.length ? (
              countries.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-neutral3 text-blacktext rounded-full text-sm"
                >
                  {s.replaceAll("_", " ")}
                </span>
              ))
            ) : (
              <span className="text-neutral6 text-sm">Not specified</span>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-neutral8 mb-2">
            Expected Salary
          </h3>
          <p className="text-textBlack font-medium">{salaryDisplay}</p>

          <h3 className="text-sm font-semibold text-neutral8 mt-4 mb-2">
            Technical Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {technicalSkills.length ? (
              technicalSkills.map((skillId, idx) => (
                <div key={idx} className="relative group">
                  <SkillTag skillId={skillId} />
                </div>
              ))
            ) : (
              <span className="text-neutral6 text-sm">No skills selected</span>
            )}
          </div>
        </div>
      </section>

      <footer className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-neutral5">
        <Button variant="outline" size="md" onClick={onEdit}>
          Edit
        </Button>
        <Button
          variant="outline"
          size="md"
          className="text-red-600 border-red-600 hover:bg-red-50"
          onClick={onDelete}
        >
          Delete
        </Button>
      </footer>
    </article>
  );
}
