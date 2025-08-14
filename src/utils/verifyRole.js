import CryptoJS from "crypto-js";
import { getCookie } from "./cookies";

export async function verifyRole(role) {
  try {
    console.log('>> verify role called', role)
    const encrytedUser = getCookie("EastMlsUser");
    if (!encrytedUser) return "login required";

    const decrytedUser = JSON.parse(CryptoJS.AES.decrypt(encrytedUser, process.env.NEXT_PUBLIC_CRYPTOJS_SECRET_KEY).toString(CryptoJS.enc.Utf8));


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