export const QUICK_STATS_CARD_CONFIG = {
  jobPostsCount: {
    title: "Job Posts",
    description: "Manage your job listings",
    icon: <i className="ri-file-list-3-line text-[40px] text-blue-500"></i>,
    linkText: "View all jobs",
    to: "/dashboard/jobspost",
  },
  eventPostCount: {
    title: "Event Posts",
    description: "Manage your event listings",
    icon: <i className="ri-calendar-event-line text-[40px] text-cyan-500"></i>,
    linkText: "View all events",
    to: "/events",
  },
  searchCount: {
    title: "Search Applicants",
    description: "Find potential candidates",
    icon: <i className="ri-search-eye-line text-[40px] text-purple-500"></i>,
    linkText: "Search now",
    to: "/dashboard/search_applicants",
  },
};

export default QUICK_STATS_CARD_CONFIG;