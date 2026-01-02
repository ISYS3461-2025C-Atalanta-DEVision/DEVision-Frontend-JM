import api from "../http_call/HttpRequest";

const eventService = {
  getEventList: async (params) => {
    const res = await api.get(`${EVENT_BASE_URL}`, { params });
    return res.data; // shape should match what PostList expects
  },
};

export default eventService;