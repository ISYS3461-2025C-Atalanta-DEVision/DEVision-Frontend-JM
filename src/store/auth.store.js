import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  login_user: (userData) =>
    set({
      user: userData,
      isAuthenticated: true,
    }),

  logout_user: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  credentials: {
    email: "",
    password: "",
  },

  registrationData: {
    companyName: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    country: "",
    companySize: "",
    password: "",
    confirmPassword: "",
  },

  updateRegistrationField: (field, value) =>
    set((state) => ({
      registrationData: {
        ...state.registrationData,
        [field]: value,
      },
    })),

  resetRegistrationData: () =>
    set({
      registrationData: {
        companyName: "",
        email: "",
        phoneNumber: "",
        streetAddress: "",
        city: "",
        country: "",
        companySize: "",
        password: "",
        confirmPassword: "",
      },
    }),

  updateCredentials: (field, value) =>
    set((state) => ({
      credentials: {
        ...state.credentials,
        [field]: value,
      },
    })),

  resetCredentials: () =>
    set({
      credentials: {
        email: "",
        password: "",
      },
    }),
    
}));

export default useAuthStore;
