import CryptoJS from "crypto-js";
import { getCookie } from "./cookies";

export async function verifyRole(role) {
  try {
    const encrytedUser = getCookie("EastMlsUser");
    console.log("Called ?>?>?>?>?>", encrytedUser)
    if (!encrytedUser) return "login required";

    const decrytedUser = JSON.parse(CryptoJS.AES.decrypt(encrytedUser, process.env.NEXT_PUBLIC_CRYPTOJS_SECRET_KEY).toString(CryptoJS.enc.Utf8));

    console.log(decrytedUser, ">>>>>>>>>>>>>>>")

    if (!decrytedUser) {
      return 'login required'
    }
    if (role === 'check') {
      console.log('cvdsgcgdscgs', decrytedUser.role);

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