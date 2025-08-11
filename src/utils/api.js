import { eastMlsStore } from "@/store/eastMlsStore";
import axios from "axios";


export const api = axios.create({
  baseURL: "http://localhost:5000/api", 
  timeout: 2000,
  withCredentials: true
});


api.interceptors.response.use(
  undefined,

  async (error) => {
    const clearStore = eastMlsStore.getState().clearStore;

    if (error.status === 420) {
      clearStore();
      console.log(error);
      return window.location.href = "/login";
    }

    if (error.status === 401) {
      clearStore();
       console.log(error);
      return window.location.href = "/login";
    }

    return Promise.reject(error);
  }
)