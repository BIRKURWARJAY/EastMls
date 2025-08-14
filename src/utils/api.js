import axios from "axios";
import toast from "react-hot-toast";


export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKENDURI, 
  withCredentials: true
});


api.interceptors.response.use(
  res => {
    if (res?.status === 220) {
      toast.error("Please Login");
      window.location.href = "/login";      
    }

    return res;
  },

  err => {
    Promise.reject(err);
  }
)