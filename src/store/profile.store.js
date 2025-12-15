import { create } from "zustand";

const useProfileStore = create((set, get) => ({
  profile: null,
  loading: false,
  error: null,
  
  setProfile: (profile) => set(() => ({ profile: { ...profile } })),
  setLoading: (loading) => set(() => ({ loading })),
  setError: (error) => set(() => ({ error })),  

  reset: () => set(() => ({ ...initialState, loading: false, error: null })),
}));


export default useProfileStore;