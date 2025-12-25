import React from "react";
import ImageHolder from "../components/ImageHolder";
import Button from "../components/Button";
import SkillTag from "../components/SkillTag";

export default function PostCard({ item }) {
  if (!item) return null;

  return (
    <div className="bg-white border border-neutral7 rounded-lg p-6 shadow-sm hover:shadow-md transition">
      {/* Company + Job Header */}
      <div>
        {/* Company Name (Primary Visual Anchor) */}
        <h2 className="text-sm font-semibold text-primary2 uppercase tracking-wide">
          {item.companyName}
        </h2>

        {/* Job Title */}
        <h3 className="text-xl font-semibold text-blacktxt mt-1">
          {item.title}
        </h3>

        {/* Location + Employment */}
        <p className="text-sm text-neutral5 mt-1">
          {item.location} • {item.employmentType}
        </p>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm text-blacktxt line-clamp-3">
        {item.description}
      </p>

      {/* Skills */}
      {item.skills?.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-neutral5 mb-2">
            Required Skills
          </p>
          <div className="flex flex-wrap gap-2">
            {item.skills.map((skill, idx) => (
              <SkillTag key={idx} skillName={skill} />
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      <hr className="my-5 border-neutral7" />

      {/* Job Meta Info */}
      <div className="grid grid-cols-2 gap-y-2 text-sm text-blacktxt">
        <p>
          <span className="font-medium">Salary:</span>{" "}
          {item.salaryDisplay || "Negotiable"}
        </p>

        <p>
          <span className="font-medium">Contract:</span>{" "}
          {item.additionalEmploymentTypes?.length > 0
            ? item.additionalEmploymentTypes.join(", ")
            : "N/A"}
        </p>

        <p>
          <span className="font-medium">Posted:</span> {item.postedDate}
        </p>

        {item.expireDate && (
          <p>
            <span className="font-medium">Expires:</span> {item.expireDate}
          </p>
        )}
      </div>

      {/* Footer CTA */}
      <div className="mt-6 flex justify-end">
        <Button variant="primary" size="md">
          View Job Details
        </Button>
      </div>
    </div>
  );
}
