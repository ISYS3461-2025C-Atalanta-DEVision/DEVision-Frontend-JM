import { create } from "zustand";

const jobPostCreateStore = create((set, get) => ({
  postData: null,
  loading: false,
  error: null,
  isCreating: false,

  setPostData: (data) => set(() => ({ postData: { ...data } })),
  getPostData: () => get(),

  setIsCreating: (isCreating) => set(() => ({ isCreating })),
  setLoading: (loading) => set(() => ({ loading })),
  setError: (error) => set(() => ({ error })),
  reset: () => set(() => ({ postData: null, loading: false, error: null, isCreating: false })),
}));

export default jobPostCreateStore;