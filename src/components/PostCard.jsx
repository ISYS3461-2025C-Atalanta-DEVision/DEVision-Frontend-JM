import React, { useEffect } from "react";
import ImageHolder from "../components/ImageHolder";
import Button from "../components/Button";
import SkillTag from "../components/SkillTag";
import skillStore from "../store/skill.store";

export default function PostCard({ item }) {
  // Fetch skills on mount to ensure skill names are available
  useEffect(() => {
    skillStore.getState().fetchSkills();
  }, []);

  if (!item) return null;

  return (
    <article className="bg-white border rounded-xl p-8 shadow-sm hover:shadow-md transition w-full">
      {/* Company */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-semibold text-primary2 uppercase tracking-wide">
          {item.companyName}
        </span>
        <span className="text-xs px-2 py-0.5 bg-primary2/10 text-primary2 rounded-full">
          Verified Company
        </span>
      </div>

      {/* Role + Fresher Friendly badge */}
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-3xl font-semibold text-blacktxt leading-tight">
          {item.title}
        </h1>
        {item.isFresherFriendly && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-300">
            <i className="ri-seedling-line mr-1"></i>
            Fresher Friendly
          </span>
        )}
      </div>

      {/* Meta */}
      <p className="text-sm text-neutral6 mt-2">
        {item.location} &nbsp;•&nbsp; {item.employmentType}
      </p>

      {/* Pitch */}
      <p className="mt-6 text-base text-blacktxt leading-relaxed">
        {item.desiption}
      </p>

      {/* Skills */}
      {item.skills?.length > 0 && (
        <section className="mt-6">
          <h3 className="text-sm font-semibold text-neutral7 mb-3 uppercase">
            What you will work with
          </h3>
          <div className="flex flex-wrap gap-2">
            {item.skills.map((skillId, idx) => (
              <SkillTag key={idx} skillId={skillId} />
            ))}
          </div>
        </section>
      )}

      {/* Offer */}
      <section className="mt-8 border-t pt-6">
        <h3 className="text-sm font-semibold text-neutral7 mb-4 uppercase">
          What we offer
        </h3>

        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <p>
            <span className="font-medium">Salary:</span>{" "}
            {item.salaryDisplay || "Negotiable"}
          </p>
          <p>
            <span className="font-medium">Contract:</span>{" "}
            {item.additionalEmploymentTypes?.length
              ? item.additionalEmploymentTypes.join(", ")
              : "N/A"}
          </p>
          <p>
            <span className="font-medium">Posted:</span>{" "}
            {item.postedDate || "Recently"}
          </p>
          <p>
            <span className="font-medium">Expires:</span> {item.expireDate}
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="mt-8 flex justify-end">
        <Button variant="primary" size="lg">
          View Job Details →
        </Button>
      </div>
    </article>
  );
}
