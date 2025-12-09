import { create } from "zustand";

const useAuthRegisterStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,
  success: null,
  countries: [],
  loadingCountries: true,

  setUserRegister: (user) => set({ user }),
  setLoadingRegister: (loading) => set({ loading }),
  setErrorRegister: (error) => set({ error }),
  setSuccessRegister: (success) => set({ success }),
  setCountries: (countries) => set({ countries }),
  setLoadingCountries: (loadingCountries) => set({ loadingCountries }),
}));

export default useAuthRegisterStore;