import React from "react";
import ImageHolder from "./ImageHolder";

export default function TalentCard({ talent, onClick }) {
  if (!talent) return null;

  const {
    name,
    email,
    phone,
    country,
    highestEducation,
    skillCategories,
    isPremium,
    isActive,
    avatarUrl,
  } = talent;

  console.log(talent)

  return (
    <div
      onClick={onClick}
      className="w-full max-w-sm rounded-2xl bg-white border border-neutral2 shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer"
    >
      {/* Header with premium badge */}
      <div className="relative h-20 bg-gradient-to-r from-primary/10 to-primary2/10">
        {isPremium && (
          <span className="absolute top-3 right-3 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-300">
            <i className="ri-vip-crown-line mr-1"></i>
            Premium
          </span>
        )}

        {/* Avatar */}
        <div className="absolute -bottom-10 left-5 w-20 h-20 rounded-full bg-white p-1 shadow">
          <ImageHolder
            src={avatarUrl}
            alt={name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {/* Content */}
      <div className="pt-12 px-5 pb-5 space-y-3">
        {/* Name and status */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-primary truncate">
            {name}
          </h3>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
              isActive
                ? "bg-green-100 text-green-800"
                : "bg-neutral2 text-neutral6"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                isActive ? "bg-green-500" : "bg-neutral5"
              }`}
            ></span>
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Contact info */}
        <div className="space-y-1.5 text-sm text-neutral7">
          <div className="flex items-center gap-2">
            <i className="ri-mail-line text-primary"></i>
            <span className="truncate">{email}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="ri-phone-line text-primary"></i>
            <span>{phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="ri-map-pin-line text-primary"></i>
            <span>{country}</span>
          </div>
        </div>

        {/* Skills categories indicator */}
        {skillCategories?.length > 0 && (
          <div className="pt-2 border-t border-neutral2">
            <div className="flex items-center gap-2 text-sm text-neutral6">
              <i className="ri-tools-line text-primary"></i>
              <span>
                {skillCategories.length} skill{" "}
                {skillCategories.length > 1 ? "categories" : "category"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
