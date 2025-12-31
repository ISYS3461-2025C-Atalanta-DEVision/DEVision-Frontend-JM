import { create } from "zustand";

const jobPostStore = create((set) => ({
  allItems: [],
  items: [],
  loading: false,
  error: null,
  filter: null,

  setAllItems: (allItems) => set({ allItems }),
  setItems: (items) => set({ items }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setFilter: (filter) => set({ filter }),

  addItem: (newItem) =>
    set((state) => ({
      items: [newItem, ...state.items],
    })),

  updateItem: (id, updatedItem) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      ),
    })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
}));

export default jobPostStore;