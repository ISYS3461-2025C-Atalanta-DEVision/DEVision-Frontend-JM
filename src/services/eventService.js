import api from "../http_call/HttpRequest";
import { EVENT_URL } from "../service_url/ProfileUrlConfig";

const eventService = {
  getEventList: async (params) => {
    const res = await api.get(`${EVENT_URL}`, { params });
    return res.data; // shape should match what PostList expects
  },
  getCompanyEvents: async (companyId) => {
    const response = await api.get(`${EVENT_URL}/me`);
    return response.data;
  },

  createEvent: async (eventData) => {
    const formData = new FormData();

    // text fields
    formData.append("title", eventData.title);
    formData.append("caption", eventData.caption);

    // single file
    if (eventData.coverImage) {
      formData.append("coverImage", eventData.coverImage);
    }
    // multiple files
    if (Array.isArray(eventData.images)) {
      eventData.images.forEach((file) => {
        formData.append("images", file);
      });
    }

    const response = await api.post(`${EVENT_URL}`, formData, {
      headers: {
        "Content-Type": undefined, // Let the browser set it, including boundaries
      },
    });

    return response.data;
  },
};

export default eventService;
