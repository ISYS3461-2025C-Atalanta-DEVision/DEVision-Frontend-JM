import { create } from "zustand";

const jobPostCreateStore = create((set, get) => ({
  isFormOpen: false,
  error: null,
  isCreating: false,
  success: null,
  confirmBoxOpen: false,

  setIsCreating: (isCreating) => set(() => ({ isCreating })),
  setError: (error) => set(() => ({ error })),
  setSuccess: (success) => set(() => ({ success })),
  setFormOpen: (isOpen) => set(() => ({ isFormOpen: isOpen })),
  setConfirmBoxOpen: (isOpen) => set(() => ({ confirmBoxOpen: isOpen })),
  reset: () =>
    set(() => ({
      error: null,
      isCreating: false,
      confirmBoxOpen: false,  
    })),
}));

export default jobPostCreateStore;
