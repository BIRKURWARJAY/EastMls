import axios from "axios";
import { getCookie } from "./setCookie.js";

export const api = axios.create({
  baseURL: "http://localhost:5000/api", 
  timeout: 5000,
  withCredentials: true
});

api.interceptors.request.use(
  config => {
    if (typeof window !== 'undefined') {
      const token = getCookie("EastMlsToken");
      console.log(token)
      config.headers = {
        ...config.headers,
        Authorization:`Bearer ${token}`
      };
    }
    return config;
  }
)


