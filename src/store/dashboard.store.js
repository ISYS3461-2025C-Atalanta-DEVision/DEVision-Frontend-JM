import { create } from "zustand";

const initialState = {
  name: "",
  contactEmail: "",
  phoneNumber: "",
  address: "",
  city: "",
  country: "",
  website: "",
  avatarURL: "",
  subscriptionType: "",
}

const useDashboardStore = create((set, get) => ({
  companyData: { ...initialState },
  loading: false,
  error: null,
  
  setProfile: (profile) => set(() => ({ companyData: { ...profile } })),
  getProfile: () => get(),
 
  setLoading: (loading) => set(() => ({ loading })),
  setError: (error) => set(() => ({ error })),  

  reset: () => set(() => ({ ...initialState, loading: false, error: null })),
}));


export default useDashboardStore;