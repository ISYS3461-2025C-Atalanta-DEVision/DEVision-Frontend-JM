import { create } from "zustand";

const useAuthRegisterStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,
  success: null,
  countries: [],
  loadingCountries: true,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSuccess: (success) => set({ success }),
  setCountries: (countries) => set({ countries }),
  setLoadingCountries: (loadingCountries) => set({ loadingCountries }),
}));

export default useAuthRegisterStore;