import api from "../http_call/HttpRequest";
import {
  SEARCH_CRITERIA_URL,
  EDIT_SEARCH_CRITERIA_URL,
} from "../service_url/PremiumUrlConfig";

export const premiumService = {
  createSearchProfile: async (payload) => {
    const response = await api.post(SEARCH_CRITERIA_URL, payload);
    return response.data;
  },

  editSearchProfile: async (payload) => {
    const response = await api.put(EDIT_SEARCH_CRITERIA_URL, payload);
    return response.data;
  },

  getCompanySearchProfile: async () => {
    const response = await api.get(SEARCH_CRITERIA_URL);
    return response.data;
  },

  deleteSearchProfile: async () => {
    const response = await api.delete(SEARCH_CRITERIA_URL);
    return response.data;
  }
};
