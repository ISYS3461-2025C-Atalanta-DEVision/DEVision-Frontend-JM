import api from "../http_call/HttpRequest";
import { PROFILE_URL } from "../service_url/ProfileUrlConfig";

const MOCK_PROFILE = [
  {
    company_id: "69354d0b3614820ce068eb51",
    name: "RMIT University Vietnam",
    contactEmail: "info@rmit.edu.vn",
    phoneNumber: "+84 28 3776 1300",
    address: "702 Nguyễn Văn Linh, Tân Hưng, Quận 7",
    city: "TP. Hồ Chí Minh",
    country: "Việt Nam",
    website: "https://www.rmit.edu.vn",
    avatarURL:
      "https://images.seeklogo.com/logo-png/11/1/rmit-university-logo-png_seeklogo-118966.png",
    subscriptionType: "PREMIUM",
  },
  {
    company_id: "69392cc1e27ee6205c928bd9",
    name: "DEVision",
    contactEmail: "khoamaidang2611@gmail.com",
    phoneNumber: "+84 28 3776 1300",
    address: "201 Vo Van Ngan, Binh Tho, Quan Thu Duc",
    city: "TP. Hồ Chí Minh",
    country: "Việt Nam",
    website: "https://www.rmit.edu.vn",
    avatarURL:
      "https://images.seeklogo.com/logo-png/11/1/rmit-university-logo-png_seeklogo-118966.png",
    subscriptionType: "PREMIUM",
  },
];

export const companyService = {
  getQuickActionStats: async (companyId) => {
    const quickStats = [
      { key: "jobPostsCount", value: 12 },
      { key: "eventPostCount", value: 5 },
      { key: "applicationsCount", value: 45 },
      { key: "searchCount", value: 8 },
    ];
    await new Promise((resolve) => setTimeout(resolve, 800));
    // throw new Error("Failed to load quick stats");

    return quickStats;
  },
  getProfile: async () => {
    const response = await api.get(`${PROFILE_URL}`);
    return response.data;
  },
};

export default companyService;
