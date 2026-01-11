import api from "../http_call/HttpRequest";
import {
  SEARCH_CRITERIA_URL,
} from "../service_url/PremiumUrlConfig";

export const premiumService = {
  createSearchProfile: async (payload) => {
    const response = await api.post(SEARCH_CRITERIA_URL, payload);
    return response.data;
  },

  editSearchProfile: async (payload) => {
    const response = await api.put(SEARCH_CRITERIA_URL, payload);
    return response.data;
  },

  getCompanySearchProfile: async () => {
    try {
      const response = await api.get(SEARCH_CRITERIA_URL);
      return response.data;
    } catch (err) {
      if (err.response?.status === 404) {
        return null; // or []
      }
    }
  },

  deleteSearchProfile: async () => {
    const response = await api.delete(SEARCH_CRITERIA_URL);
    return response.data;
  },
};

export default premiumService;
