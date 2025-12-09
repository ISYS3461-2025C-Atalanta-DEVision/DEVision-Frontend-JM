const MOCK_POST_DATA = [
  {
    id: "job_001",
    company_id: "69354d0b3614820ce068eb51",
    company_name: "RMIT University Vietnam",
    title: "Frontend Developer",
    description:
      "Develop UI components and improve user-facing features using React and TypeScript.",
    employmentType: ["Full-time"],
    postedDate: "2025-01-10",
    expiryDate: "2025-02-10",
    salary: { type: "Range", value: "1200 - 1800 USD" },
    location: "Ho Chi Minh City, Vietnam",
    published: true,
    mediaURL: [
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/rmit-sgs-campus-facilities/2015-campus-photos/rmit-sgs-b2-14.jpg",
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/libraryvn-site/library-photos/library-thumbnail.jpg",
    ],
    skillRequire: ["react", "javascript", "typescript", "git"],
  },
  {
    id: "job_002",
    company_id: "company_101",
    company_name: "Talent JDI",
    title: "Data Analyst Intern",
    description:
      "Assist in data cleaning, dashboard building, and reporting for business insights.",
    employmentType: ["Internship"],
    postedDate: "2025-01-15",
    expiryDate: "2025-03-01",
    salary: { type: "Estimation", value: "About 500 USD" },
    location: "Remote",
    published: true,
    mediaURL: [
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/rmit-sgs-campus-facilities/2015-campus-photos/rmit-sgs-b2-14.jpg",
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/libraryvn-site/library-photos/library-thumbnail.jpg",
    ],
    skillRequire: ["python", "mysql", "postgresql"],
  },
  {
    id: "job_003",
    company_id: "69354d0b3614820ce068eb51",
    company_name: "RMIT University Vietnam",
    title: "UI/UX Designer (Contract)",
    description:
      "Work with product and engineering teams to deliver design concepts and prototypes.",
    employmentType: ["Contract"],
    postedDate: "2025-01-20",
    expiryDate: null,
    salary: { type: "Negotiable", value: null },
    location: "Hanoi, Vietnam",
    published: false,
    mediaURL: [
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/rmit-sgs-campus-facilities/2015-campus-photos/rmit-sgs-b2-14.jpg",
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/libraryvn-site/library-photos/library-thumbnail.jpg",
    ],
    skillRequire: ["figma", "git"],
  },
  {
    id: "job_004",
    company_id: "company_101",
    company_name: "Talent JDI",
    title: "Marketing Assistant",
    description:
      "Support digital campaigns, content planning, and brand activities.",
    employmentType: ["Part-time"],
    postedDate: "2025-01-22",
    expiryDate: "2025-02-22",
    salary: { type: "Estimation", value: "Up to 700 USD" },
    location: "Da Nang, Vietnam",
    published: true,
    mediaURL: [
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/rmit-sgs-campus-facilities/2015-campus-photos/rmit-sgs-b2-14.jpg",
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/libraryvn-site/library-photos/library-thumbnail.jpg",
    ],
    skillRequire: ["figma", "git"],
  },
  {
    id: "job_005",
    company_id: "69354d0b3614820ce068eb51",
    company_name: "RMIT University Vietnam",
    title: "Backend Developer (Node.js)",
    description: "Maintain backend APIs, databases, and cloud infrastructure.",
    employmentType: ["Full-time"],
    postedDate: "2025-01-25",
    expiryDate: null,
    salary: { type: "Range", value: "1500 - 2200 USD" },
    location: "Ho Chi Minh City, Vietnam",
    published: false,
    mediaURL: [
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/rmit-sgs-campus-facilities/2015-campus-photos/rmit-sgs-b2-14.jpg",
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/libraryvn-site/library-photos/library-thumbnail.jpg",
    ],
    skillRequire: ["nodejs", "express", "mongodb", "docker"],
  },
  {
    id: "job_006",
    company_id: "company_101",
    company_name: "Talent JDI",
    title: "HR Specialist (Contract + Internship)",
    description:
      "Assist recruitment processes and coordinate onboarding activities.",
    employmentType: ["Internship", "Contract"],
    postedDate: "2025-01-28",
    expiryDate: "2025-03-28",
    salary: { type: "Estimation", value: "From 400 USD" },
    location: "Remote / Hybrid",
    published: true,
    mediaURL: [
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/rmit-sgs-campus-facilities/2015-campus-photos/rmit-sgs-b2-14.jpg",
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/libraryvn-site/library-photos/library-thumbnail.jpg",
    ],
    skillRequire: ["git", "figma"],
  },
  {
    id: "job_007",
    company_id: "69354d0b3614820ce068eb51",
    company_name: "RMIT University Vietnam",
    title: "Mobile App Developer",
    description: "Build mobile experiences with React Native or Flutter.",
    employmentType: ["Full-time"],
    postedDate: "2025-02-01",
    expiryDate: null,
    salary: { type: "Range", value: "1300 - 2000 USD" },
    location: "Singapore",
    published: true,
    mediaURL: [
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/rmit-sgs-campus-facilities/2015-campus-photos/rmit-sgs-b2-14.jpg",
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/libraryvn-site/library-photos/library-thumbnail.jpg",
    ],
    skillRequire: ["react", "javascript", "typescript", "git"],
  },
  {
    id: "job_008",
    company_id: "company_101",
    company_name: "Talent JDI",
    title: "Content Creator Intern",
    description:
      "Create social media posts, short videos, and assist with campaign execution.",
    employmentType: ["Internship"],
    postedDate: "2025-02-05",
    expiryDate: "2025-03-05",
    salary: { type: "Negotiable", value: null },
    location: "Bangkok, Thailand",
    published: true,
    mediaURL: [
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/rmit-sgs-campus-facilities/2015-campus-photos/rmit-sgs-b2-14.jpg",
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/libraryvn-site/library-photos/library-thumbnail.jpg",
    ],
    skillRequire: ["figma", "git"],
  },
];



export const postServices = {
  getPostList: async (companyId) => {
    const posts = MOCK_POST_DATA.filter(
      (post) => post.company_id === companyId
    );
    await new Promise((resolve) => setTimeout(resolve, 800));
    // throw new Error("Failed to load posts");

    return posts;
  },
};

export default postServices;
