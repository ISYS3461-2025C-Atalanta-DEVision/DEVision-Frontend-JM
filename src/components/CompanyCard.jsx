import React from "react";
import ImageHolder from "../components/ImageHolder";

export default function CompanyCard({ items }) {
  return (
    <div className="w-full max-w-lg rounded-2xl bg-white border border-neutral2 shadow-md overflow-hidden hover:shadow-md transition">
      {/* Cover image */}
      <div className="relative h-28 bg-neutral2">
        <div className="bg-neutral4 w-full h-full object-cover" />

        {/* Logo */}
        <div className="absolute -bottom-8 left-7 w-20 h-20 rounded-full bg-white p-1 shadow">
          <ImageHolder
            src={`${items.avatarUrl}`}
            alt="Company logo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {/* Content */}
      <div className="pt-10 px-6 pb-5 space-y-2">
        {/* Company name */}
        <h3 className="text-lg font-semibold text-primary">
          {items?.companyName}
        </h3>

        {/* Tagline */}
        <p className="text-sm text-neutral8">{items?.aboutUs}</p>
        {/* Meta info */}
        <div className="flex flex-wrap gap-3 text-sm text-neutral8 pt-2">
          <span className="flex items-start gap-2">
            <i className="ri-briefcase-line text-lg leading-none mt-[2px] text-primary" />
            <span className="leading-relaxed">{items.whoWeAreLookingFor}</span>
          </span>

          <span className="flex items-center gap-1">
            <i className="ri-map-pin-line text-lg text-primary" />
            {items?.streetAddress}, {items?.city}
          </span>
        </div>
      </div>
    </div>
  );
}
