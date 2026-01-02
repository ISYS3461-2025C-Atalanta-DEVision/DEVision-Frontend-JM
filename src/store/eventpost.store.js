import { create } from "zustand";

const eventCreateStore = create((set, get) => ({
  isFormOpen: false,
  message: null,
  isCreating: false,

  setIsCreating: (isCreating) => set(() => ({ isCreating })),
  setMessage: (message) => set(() => ({ message })),
  setFormOpen: (isOpen) => set(() => ({ isFormOpen: isOpen })),
  reset: () =>
    set(() => ({
      postData: null,
      message: null,
      isCreating: false,
      confirmBoxOpen: false,
    })),
}));

export default eventCreateStore;
