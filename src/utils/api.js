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
    if (res.status === 401) {
      localStorage.removeItem("EastMls");
      window.location.href = "/login";
      return;
    }
    return res;
  }
)