import { create } from "zustand";

const useNotificationStore = create((set) => ({
  notification: null,
  loading: false,
  msg: null,

  setNotification: (updater) =>
    set((state) => ({
      notification:
        typeof updater === "function" ? updater(state.notification) : updater,
    })),
    
  pushNotification: (notification) =>
    set((state) => ({ notifications: [notification, ...state.notifications] })),
  clearNotifications: () => set(() => ({ notifications: [] })),

  setLoading: (loading) => set({ loading }),
  setMSG: (msg) => set({ msg }),
}));

export default useNotificationStore;
