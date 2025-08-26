import axios from "axios";
import toast from "react-hot-toast";
import { setCookie } from "./cookies";
import CryptoJS from "crypto-js";
import userInterface from "../interfaces/user.interface";



export const api: Axios.AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKENDURI,
  withCredentials: true
});


api.interceptors.response.use<Axios.ResponseInterceptor>(
  async (res: any) => {

    if (res?.status === 401) {
      const tokenRes: any = await api.get("/auth/refresh-token");

      if (tokenRes?.status === 220) {
        toast.error("Please Login");
        window.location.href = "/login";
      }

      if (tokenRes.status === 200) {
        const user: userInterface = tokenRes.data.user;

        const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify({
          role: user.role,
          email: user.email,
          name: user.username,
          id: user._id
        }), process.env.NEXT_PUBLIC_CRYPTOJS_SECRET_KEY!).toString();

        setCookie("EastMlsUser", "/", encryptedUser, 60);
      }
    }

    return res;
  },

  err => {
    Promise.reject(err);
  }
)