import api from "../http_call/HttpRequest";
import { PROFILE_URL } from "../service_url/ProfileUrlConfig";

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

  editProfile: async (editedValues) => {
   const response = await api.put(`${PROFILE_URL}`, editedValues);
   return response.data;
  },
};

export default companyService;
