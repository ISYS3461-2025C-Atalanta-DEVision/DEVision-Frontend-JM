import { create } from "zustand";

const useDashboardStore = create((set, get) => ({
  companyData: null,
  loading: false,
  error: null,
  
  setProfile: (profile) => set(() => ({ companyData: { ...profile } })),
  getProfile: () => get(),
 
  setLoading: (loading) => set(() => ({ loading })),
  setError: (error) => set(() => ({ error })),  

  reset: () => set(() => ({ ...initialState, loading: false, error: null })),
}));


export default useDashboardStore;