import { create } from "zustand";

const useCreatePostForm = create((set, get) => ({
  postData: null,
  loading: false,
  error: null,

  setPostData: (data) => set(() => ({ postData: { ...data } })),
  getPostData: () => get(),

  setLoading: (loading) => set(() => ({ loading })),
  setError: (error) => set(() => ({ error })),
  reset: () => set(() => ({ postData: null, loading: false, error: null })),
}));

export default useDashboardStore;
