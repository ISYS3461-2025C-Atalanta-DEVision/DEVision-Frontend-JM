import {
  GET_NOTIFICATIONS_URL,
  GET_UNREAD_NOTIFICATIONS_URL,
  GET_UNREAD_COUNT_URL,
  POLL_NOTIFICATIONS_URL,
  MARK_AS_READ_URL,
  MARK_ALL_AS_READ_URL,
} from "../service_url/NotificationUrlConfig";
import api from "../http_call/HttpRequest";

export const notificationService = {
  /**
   * Get all notifications (paginated)
   * @param {number} page - Page number (0-indexed)
   * @param {number} size - Page size
   */
  getNotifications: async (page = 0, size = 20) => {
    const response = await api.get(GET_NOTIFICATIONS_URL, {
      params: { page, size },
    });
    return response.data;
  },

  /**
   * Get unread notifications only
   */
  getUnreadNotifications: async () => {
    const response = await api.get(GET_UNREAD_NOTIFICATIONS_URL);
    return response.data;
  },

  /**
   * Get unread count (for notification badge)
   * Lightweight endpoint for polling
   */
  getUnreadCount: async () => {
    const response = await api.get(GET_UNREAD_COUNT_URL);
    return response.data;
  },

  /**
   * Poll for new notifications since timestamp
   * @param {string} since - ISO datetime string
   */
  pollNotifications: async (since) => {
    const response = await api.get(POLL_NOTIFICATIONS_URL, {
      params: { since },
    });
    return response.data;
  },

  /**
   * Mark specific notifications as read
   * @param {string[]} notificationIds - Array of notification IDs
   */
  markAsRead: async (notificationIds) => {
    const response = await api.post(MARK_AS_READ_URL, { notificationIds });
    return response.data;
  },

  /**
   * Mark all notifications as read
   */
  markAllAsRead: async () => {
    const response = await api.post(MARK_ALL_AS_READ_URL);
    return response.data;
  },
};

export default notificationService;
