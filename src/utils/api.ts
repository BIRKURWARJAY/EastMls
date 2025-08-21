import axios from "axios";
import toast from "react-hot-toast";
import { setCookie } from "./cookies";
import CryptoJS from "crypto-js";


export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKENDURI,
  withCredentials: true
});


api.interceptors.response.use(
  async res => {

    if (res?.status === 401) {
      const tokenRes = await api.get("/auth/refresh-token");

      if (tokenRes?.status === 220) {
        toast.error("Please Login");
        window.location.href = "/login";
      }

      if (tokenRes.status === 200) {
        const token = tokenRes.data.token;

        const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify({
          role: token.role,
          email: token.email,
          name: token.username,
          id: token.id
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