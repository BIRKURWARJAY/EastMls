import { create } from "zustand";
import { getCookie, setCookie, deleteCookie } from "@/utils/cookies";

export const eastMlsStore = create(
  (set) => ({
    isLoggedIn: getCookie("isLoggedIn") || false,
    role: getCookie("role") || undefined,
    name: getCookie("username") || "user",
    email: getCookie("email") || undefined,


    setName: (value, minutes) => {
      setCookie("username", "/", value, minutes)
    },

    setEmail: (value, minutes) => {
      setCookie("email", "/", value, minutes)
    },

    setRole: (value, minutes) => {
      setCookie("role", "/", value, minutes)
    },

    setIsLoggedIn: (status, minutes=300) => {
      setCookie("isLoggedIn", "/", status, minutes)
    },

    clearStore: () => {
      deleteCookie("role");
      deleteCookie("email");
      deleteCookie("username");
      deleteCookie("isLoggedIn");
    }
  })
);
