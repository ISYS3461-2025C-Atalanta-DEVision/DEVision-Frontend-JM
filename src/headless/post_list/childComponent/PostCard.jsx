import React from "react";
import ImageHolder from "../../../components/ImageHolder";
import Button from "../../../components/Button";
import SkillTag from "../../../components/SkillTag";

export default function PostCard({ item }) {
  if (!item) return null;

  return (
    <div className="bg-bgComponent border rounded-xl p-5 shadow-sm hover:shadow-md transition">
      {/* Title */}
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-semibold text-primary2">{item.title}</h2>

        <span
          className="text-sm px-2 py-1 rounded bg-primary2 text-neutral1 font-medium"
          title="Company Name"
        >
          {item.companyName}
        </span>
      </div>

      {/* Description */}
      <p className="text-blacktxt line-clamp-3">{item.description}</p>

      <hr className="my-4 border-t border-neutral7" />

      <div className="mt-5 gap-2 flex justify-start items-center">
        <p>
          <span className="font-semibold">Requirements:</span>
        </p>
        <p></p>
        {/* Skill tag */}
        {item.skills?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.skills.map((skill, idx) => (
              <SkillTag key={idx} skillName={skill} />
            ))}
          </div>
        )}
      </div>

      {/* Job Info */}
      <div className="mt-3 space-y-1 text-s text-blacktxt">
        <p>
          <span className="font-semibold">Location:</span> {item.location}
        </p>
        <p>
          <span className="font-semibold">Salary:</span>{" "}
          {item.salary?.value || "Negotiable"}
        </p>
        <p>
          <span className="font-semibold">Employment:</span>{" "}
          {[
            item.employmentType,
            ...(item.additionalEmploymentTypes || [])
          ].filter(Boolean).join(", ") || "-"}
        </p>
        <p>
          <span className="font-semibold">Posted:</span> {item.postedDate}
        </p>
        {item.expiryDate && (
          <p>
            <span className="font-semibold">Expires:</span> {item.expiryDate}
          </p>
        )}
      </div>

      {/* Media Images */}
      {item.mediaURL?.length > 0 && (
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {item.mediaURL.map((url, idx) => (
            <ImageHolder
              key={idx}
              src={url}
              alt={item.title}
              className="w-24 h-24 rounded-md object-cover border"
            />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 flex justify-end">
        <Button variant="secondary" size="md">
          View Details
        </Button>
      </div>
    </div>
  );
}
