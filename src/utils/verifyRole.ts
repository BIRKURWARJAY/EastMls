import CryptoJS from "crypto-js";
import { getCookie, setCookie } from "./cookies";
import { api } from "./api";
import toast from "react-hot-toast";


export async function verifyRole(role:any) {
  try {
    let encrytedUser = getCookie("EastMlsUser");
    if (!encrytedUser) {
      const res = await api.get("/auth/refresh-token");

      if (res?.status === 200) {
        encrytedUser = CryptoJS.AES.encrypt(JSON.stringify({
          role: res.data.user.role,
          email: res.data.user.email,
          id: res.data.user._id,
          name: res.data.user.name
        }), process.env.NEXT_PUBLIC_CRYPTOJS_SECRET_KEY!).toString();

        setCookie("EastMlsUser", "/", encrytedUser, 60);

      } else {
        return "login required";
      }
    };

    const decrytedUser = JSON.parse(CryptoJS.AES.decrypt(encrytedUser, process.env.NEXT_PUBLIC_CRYPTOJS_SECRET_KEY !).toString(CryptoJS.enc.Utf8));


    if (!decrytedUser) {
      return 'login required'
    }

    if (role === 'check') {
      if (decrytedUser.role === 'user') {
        return 'user login'
      } else {
        return 'agent login'
      }
    }

    if (role === 'all') {
      return true
    } 


    if (role !== decrytedUser.role) {
      return false;
    }


    return true;
  } catch (error) {
    console.error(error);
    return false
  }
}