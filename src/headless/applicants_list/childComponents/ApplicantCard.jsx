import React from "react";

export default function ApplicantCard({ item }) {
  if (!item) return null;

  return (
    <article className="bg-[#F9F7EB] border rounded-xl p-8 shadow-sm hover:shadow-md transition w-full relative">
      {/* Header: Full Name */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold text-blacktxt leading-tight">
          {item.firstName} {item.lastName}
        </h1>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#98A9BB] text-[#002959] border border-[#002959]/30">
          {item.highestEducationDegree}
        </span>
      </div>
      {/* Meta: Email */}
      <p className="text-sm text-neutral6 mt-2">
        <span className="font-medium">Email:</span> {item.email}
      </p>
      {/* Location */}
      <p className="mt-6 text-base text-blacktxt leading-relaxed">
        {item.city}, {item.country}
      </p>
    </article>
  );
}