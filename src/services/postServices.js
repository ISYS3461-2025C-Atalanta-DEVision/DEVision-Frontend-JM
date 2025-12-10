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
    skillRequire: ["React", "Javascript", "Typescript", "Git"],
  },
  {
    id: "job_002",
    company_id: "69392cc1e27ee6205c928bd9",
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
    skillRequire: ["Python", "Mysql", "Postgresql"],
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
    skillRequire: ["Figma", "Git"],
  },
  {
    id: "job_004",
    company_id: "69392cc1e27ee6205c928bd9",
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
    skillRequire: ["Figma", "Git"],
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
    skillRequire: ["NodeJS", "Express", "Mongodb", "Docker"],
  },
  {
    id: "job_006",
    company_id: "69392cc1e27ee6205c928bd9",
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
    skillRequire: ["Git", "Figma"],
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
    skillRequire: ["React", "Javascript", "Typescript", "Git"],
  },
  {
    id: "job_008",
    company_id: "69392cc1e27ee6205c928bd9",
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
    skillRequire: ["Figma", "Git"],
  },
  {
    id: "job_009",
    company_id: "69354d0b3614820ce068eb51",
    company_name: "RMIT University Vietnam",
    title: "Cloud Engineer",
    description:
      "Manage cloud infrastructure, CI/CD systems, and scalable deployment architectures.",
    employmentType: ["Full-time"],
    postedDate: "2025-02-12",
    expiryDate: "2025-03-12",
    salary: { type: "Range", value: "1800 - 2500 USD" },
    location: "Ho Chi Minh City, Vietnam",
    published: true,
    mediaURL: [
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/rmit-sgs-campus-facilities/2015-campus-photos/rmit-sgs-b2-14.jpg",
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/libraryvn-site/library-photos/library-thumbnail.jpg",
    ],
    skillRequire: ["AWS", "Docker", "Kubernetes", "Git"],
  },
  {
    id: "job_010",
    company_id: "69354d0b3614820ce068eb51",
    company_name: "RMIT University Vietnam",
    title: "Research Assistant (AI & Data Science)",
    description:
      "Support AI research projects, run ML experiments, and assist in dataset processing.",
    employmentType: ["Part-time"],
    postedDate: "2025-02-14",
    expiryDate: "2025-03-20",
    salary: { type: "Estimation", value: "Up to 600 USD" },
    location: "Hanoi, Vietnam",
    published: true,
    mediaURL: [
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/rmit-sgs-campus-facilities/2015-campus-photos/rmit-sgs-b2-14.jpg",
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/libraryvn-site/library-photos/library-thumbnail.jpg",
    ],
    skillRequire: ["Python", "TensorFlow", "PyTorch", "Git"],
  },
  {
    id: "job_011",
    company_id: "69354d0b3614820ce068eb51",
    company_name: "RMIT University Vietnam",
    title: "Learning Platform Developer",
    description:
      "Develop and integrate new digital learning tools into the university’s LMS.",
    employmentType: ["Full-time"],
    postedDate: "2025-02-16",
    expiryDate: "2025-03-25",
    salary: { type: "Range", value: "1500 - 2300 USD" },
    location: "Ho Chi Minh City, Vietnam",
    published: true,
    mediaURL: [
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/rmit-sgs-campus-facilities/2015-campus-photos/rmit-sgs-b2-14.jpg",
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/libraryvn-site/library-photos/library-thumbnail.jpg",
    ],
    skillRequire: ["JavaScript", "PHP", "Moodle", "MySQL"],
  },
  {
    id: "job_012",
    company_id: "69354d0b3614820ce068eb51",
    company_name: "RMIT University Vietnam",
    title: "Digital Media Producer (Tech Tools)",
    description:
      "Produce digital content and manage workflows using modern creative tools.",
    employmentType: ["Contract"],
    postedDate: "2025-02-18",
    expiryDate: null,
    salary: { type: "Negotiable", value: null },
    location: "Ho Chi Minh City, Vietnam",
    published: true,
    mediaURL: [
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/rmit-sgs-campus-facilities/2015-campus-photos/rmit-sgs-b2-14.jpg",
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/libraryvn-site/library-photos/library-thumbnail.jpg",
    ],
    skillRequire: ["Figma", "AdobePremiere", "AfterEffects"],
  },
  {
    id: "job_013",
    company_id: "69354d0b3614820ce068eb51",
    company_name: "RMIT University Vietnam",
    title: "Mobile Developer (Cross-Platform)",
    description:
      "Build mobile learning experiences using modern mobile app frameworks.",
    employmentType: ["Full-time"],
    postedDate: "2025-02-20",
    expiryDate: null,
    salary: { type: "Range", value: "1400 - 2000 USD" },
    location: "Remote / Hybrid",
    published: true,
    mediaURL: [
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/rmit-sgs-campus-facilities/2015-campus-photos/rmit-sgs-b2-14.jpg",
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/libraryvn-site/library-photos/library-thumbnail.jpg",
    ],
    skillRequire: ["ReactNative", "Flutter", "TypeScript", "Git"],
  },
  {
    id: "job_014",
    company_id: "69354d0b3614820ce068eb51",
    company_name: "RMIT University Vietnam",
    title: "Backend Developer (Microservices)",
    description:
      "Maintain microservice APIs and optimize internal academic service integrations.",
    employmentType: ["Full-time"],
    postedDate: "2025-02-22",
    expiryDate: null,
    salary: { type: "Range", value: "1600 - 2400 USD" },
    location: "Ho Chi Minh City, Vietnam",
    published: true,
    mediaURL: [
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/rmit-sgs-campus-facilities/2015-campus-photos/rmit-sgs-b2-14.jpg",
      "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/libraryvn-site/library-photos/library-thumbnail.jpg",
    ],
    skillRequire: ["NodeJS", "Express", "MongoDB", "Docker"],
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
