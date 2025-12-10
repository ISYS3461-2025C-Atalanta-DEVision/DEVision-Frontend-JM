import { create } from "zustand";

const jobPostStore = create((set, get) => ({
  items: [],
  loading: false,
  error: null,
  filter: [],

  setItems: (items) => set({ items }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setFilter: (filter) => set({ ...filter }),
}));

export default jobPostStore;