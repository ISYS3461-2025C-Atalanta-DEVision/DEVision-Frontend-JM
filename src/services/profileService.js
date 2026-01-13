import api from "../http_call/HttpRequest";
import CreateEventForm from "../layout/CreateEventForm/CreateEventForm";
import { PROFILE_URL } from "../service_url/ProfileUrlConfig";

export const profileService = {
  getQuickActionStats: async (companyId) => {
    const quickStats = [
      { key: "jobPostsCount" },
      { key: "eventPostCount" },
      { key: "searchCount" },
    ];
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

  editAvatar: async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await api.post(`${PROFILE_URL}/avatar`, formData, {
      headers: {
        "Content-Type": undefined,
      },
    });

    return response.data;
  },
};

export default profileService;
