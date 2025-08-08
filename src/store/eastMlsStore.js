import {create} from "zustand";

export const eastMlsStore = create((set) => ({
  isLoggedIn: false,
  role: undefined,
  setRole: (value) => set({role: value}),
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
}));
