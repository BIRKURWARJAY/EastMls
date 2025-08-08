import axios from "axios";
import { getCookie } from "./setCookie.js";
import { refreshAccessToken } from "./refreshAccessToken.js";

export const api = axios.create({
  baseURL: "http://localhost:5000/api", 
  timeout: 2000,
});

api.interceptors.request.use(
  config => {
    console.log(">> interceptor > req >", config)
    if (typeof window !== 'undefined') {
      const token = getCookie("EastMlsToken");
      config.headers = {
        ...config.headers,
        Authorization:`Bearer ${token}`
      };
    }
    return config;
  },
  error => {
    console.log("interceptor > request > error > ", error, config)
  }
)

api.interceptors.response.use(
  undefined, 

  async error => {
    if (error?.status === 401) {
      if (await refreshAccessToken()) {
        return api(error.config)
      }
    }
    return error
  }
)


