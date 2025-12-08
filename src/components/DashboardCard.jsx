import React, { useEffect } from "react";

export const DASHBOARD_CARD_CONFIG = {
  jobPostsCount: {
    title: "Job Posts",
    description: "Manage your job listings",
    icon: <i className="ri-file-list-3-line text-[40px] text-blue-500"></i>,
    linkText: "View all jobs",
    to: "/dashboard/jobspost",
  },
  applicationsCount: {
    title: "Applications",
    description: "Review applicant submissions",
    icon: <i className="ri-file-user-line text-[40px] text-green-500"></i>,
    linkText: "View applications",
    to: "/dashboard/applications",
  },
  eventPostCount: {
    title: "Event Posts",
    description: "Manage your event listings",
    icon: <i className="ri-calendar-event-line text-[40px] text-cyan-500"></i>,
    linkText: "View all events",
    to: "/dashboard/events",
  },
  searchCount: {
    title: "Search Applicants",
    description: "Find potential candidates",
    icon: <i className="ri-search-eye-line text-[40px] text-purple-500"></i>,
    linkText: "Search now",
    to: "/dashboard/search",
  },
};

export default function DashboardCard({ item, key }) {
  console.log("DashboardCard item:", item);
  const config = DASHBOARD_CARD_CONFIG[item.key];

  if (!config) return null;

  const displayValue = item.value;

  return (
    <div className="bg-bgComponent rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        {config.icon}
        <div className="text-2xl font-bold text-textBlack">
          {displayValue}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-textBlack">{config.title}</h3>
      <p className="text-sm text-neutral6 mb-4">{config.description}</p>
      <button className="text-primary hover:text-primary2 text-sm font-medium">
        {config.linkText} →
      </button>
    </div>
  );
}
