import { create } from "zustand";

const useEastmlsStore = create((set) => ({
  isLoggedIn: false,
  token: null,
  setToken: (token) => { set({token}) },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("EastMls");
      set({ isLoggedIn: false });
    }
  },
  setIsLoggedIn: () => {
    if (typeof window !== 'undefined') {
      const token = JSON.parse(localStorage.getItem("EastMls") || '{}')?.token;
      set({ isLoggedIn: Boolean(token) });
    }
  }
}));

export default useEastmlsStore;
