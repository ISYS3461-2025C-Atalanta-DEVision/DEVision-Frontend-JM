import api from "../http_call/HttpRequest";
import CreateEventForm from "../layout/CreateEventForm/CreateEventForm";
import { PROFILE_URL, EVENT_URL } from "../service_url/ProfileUrlConfig";

export const profileService = {
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

  getCompanyEvents: async (companyId) => {
    const response = await api.get(`${EVENT_URL}/me`);
    return response.data;
  },

  createEvent: async (eventData) => {
    console.log("Creating event with data:", eventData);
  },
};

export default profileService;
