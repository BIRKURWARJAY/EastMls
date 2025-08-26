import CryptoJS from "crypto-js";
import { getCookie, setCookie } from "./cookies";
import { refreshAccessToken } from "./refreshAccessToken";


export async function verifyRole(role:string): Promise<string | boolean> {
  try {
    let encrytedUser: string | null | undefined = getCookie("EastMlsUser");
    if (!encrytedUser) {
      const res: any = await refreshAccessToken();

      if(res) {
        encrytedUser = CryptoJS.AES.encrypt(JSON.stringify({
          role: res.role,
          email: res.email,
          id: res.id,
          name: res.name
        }), process.env.NEXT_PUBLIC_CRYPTOJS_SECRET_KEY!).toString();

        setCookie("EastMlsUser", "/", encrytedUser, 60);

      } else {
        return "login required";
      }
    }

    const decrytedUser: any = JSON.parse(CryptoJS.AES.decrypt(encrytedUser, process.env.NEXT_PUBLIC_CRYPTOJS_SECRET_KEY !).toString(CryptoJS.enc.Utf8));


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