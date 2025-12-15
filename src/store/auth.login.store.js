import { create } from "zustand";

const useAuthLoginStore = create((set, get) => ({
  accessToken: null,
  refreshToken: null,
  loading: true,
  error: null,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setAccessToken: (accessToken) => set({accessToken}),
  setRefreshToken: (refreshToken) => set({refreshToken}),
}));


export default useAuthLoginStore;
