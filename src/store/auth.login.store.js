import { create } from "zustand";

const useAuthLoginStore = create((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: true,
  error: null,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));


export default useAuthLoginStore;
