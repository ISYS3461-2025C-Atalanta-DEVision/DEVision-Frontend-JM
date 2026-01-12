import api from "../http_call/HttpRequest";

import {
  GET_ALL,
  GET_UNREAD,
  GET_UNREAD_COUNT,
  POLLING,
  MARK_READ,
  READ_ALL,
} from "../service_url/NotifcationUrlConfig";

export const notificationService = {
  getMyNoti: async () => {
    const response = await api.get(`${GET_ALL}`);
    return response.data;
  },

  getUnread: async () => {
    const response = await api.get(`${GET_UNREAD}`);
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await api.get(`${GET_UNREAD_COUNT}`);
    return response.data;
  },

  pollFromNow: async (from) => {
    const response = await api.get(`${POLLING}?since=${from}`);
    return response.data;
  },

  markRead: async (payload) => {
    const response = await api.post(`${MARK_READ}`, payload);
    return response.data;
  },

  markReadAll: async (payload) => {
    const response = await api.post(`${READ_ALL}`, payload);
    return response.data;
  },
};

export default notificationService;
