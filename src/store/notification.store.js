import { create } from "zustand";

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
  lastPolledAt: null,
  isPolling: false,
  isDropdownOpen: false,
};

const useNotificationStore = create((set, get) => ({
  ...initialState,

  // Setters
  setNotifications: (notifications) => set({ notifications }),
  setUnreadCount: (unreadCount) => set({ unreadCount }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setLastPolledAt: (lastPolledAt) => set({ lastPolledAt }),
  setIsPolling: (isPolling) => set({ isPolling }),
  setIsDropdownOpen: (isDropdownOpen) => set({ isDropdownOpen }),

  // Add new notifications (prepend to list)
  addNotifications: (newNotifications) => {
    const { notifications } = get();
    const existingIds = new Set(notifications.map((n) => n.id));
    const uniqueNew = newNotifications.filter((n) => !existingIds.has(n.id));
    if (uniqueNew.length > 0) {
      set({ notifications: [...uniqueNew, ...notifications] });
    }
  },

  // Mark notification as read locally
  markNotificationRead: (notificationId) => {
    const { notifications, unreadCount } = get();
    const updated = notifications.map((n) =>
      n.id === notificationId ? { ...n, read: true } : n
    );
    const wasUnread = notifications.find(
      (n) => n.id === notificationId && !n.read
    );
    set({
      notifications: updated,
      unreadCount: wasUnread ? Math.max(0, unreadCount - 1) : unreadCount,
    });
  },

  // Mark all as read locally
  markAllRead: () => {
    const { notifications } = get();
    const updated = notifications.map((n) => ({ ...n, read: true }));
    set({ notifications: updated, unreadCount: 0 });
  },

  // Toggle dropdown
  toggleDropdown: () => {
    const { isDropdownOpen } = get();
    set({ isDropdownOpen: !isDropdownOpen });
  },

  // Reset store
  reset: () => set(initialState),
}));

export default useNotificationStore;
