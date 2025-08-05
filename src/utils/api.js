'use client'
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api", 
  timeout: 5000
});

api.interceptors.request.use(
  config => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("EastMls") || undefined;

      config.headers = {
        ...config.headers,
        Authorization:` Bearer ${token}`
      };
    }
    return config;
  }
)

api.interceptors.response.use(
  res => {
    console.log(res)
    return res;
  },

  async error => {
    console.log(error)
    // if (error.response === 401) {
    //   try {
    //     const res = await api.get("/auth/refresh-token");
    //     if (res.status === 200) {
    //       console.log("Token refreshed");
    //       localStorage.setItem("EastMls", res.data.token);
    //       return;
    //     }
    //     if (res.status === 420) {
    //       window.location.href = "/login"
    //     }
    //   } catch (error) {
    //     console.error("Error refreshing token", error);
    //     return error;
    //   }
    // }
    return error
  }
)