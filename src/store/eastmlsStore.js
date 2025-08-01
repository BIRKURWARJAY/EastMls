import { create } from "zustand";

const eastmlsStore = create((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (status) => {
    if (typeof window !== "undefined") {
      set({ isLoggedIn: status }); 
    }
  }
}));

export default eastmlsStore;
