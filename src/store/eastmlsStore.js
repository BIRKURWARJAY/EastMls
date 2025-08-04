import { create } from "zustand";

const useEastmlsStore = create((set, get) => ({
  isLoggedIn: false,
  token: undefined,
  isLoading: true,
  setToken: (token) => set({ token, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  initializeToken: () => {
    if (typeof window !== 'undefined') {
      try {
        const tokenString = JSON.parse(localStorage.getItem("EastMls") || "{}");
          set({ token: tokenString, isLoading: false });
        } catch (error) {
          console.error("Error parsing token from localStorage:", error);
          set({ token: undefined, isLoading: false });
        }
    }
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("EastMls");
      set({ token: undefined, isLoggedIn: false, isLoading: false });
    }
  },
  setIsLoggedIn: (value) => {
    if (typeof window !== 'undefined') {
      const tokenString = localStorage.getItem("EastMls");
      const hasToken = tokenString ? Boolean(JSON.parse(tokenString)) : false;
      set({ isLoggedIn: value || hasToken });
    }
  }
}));

export default useEastmlsStore;
