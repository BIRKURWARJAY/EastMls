import axios from "axios";
import { deleteCookie, setCookie } from "./setCookie.js";


export async function refreshAccessToken() {
  try {
   const res = await axios.get("http://localhost:5000/api/auth/refresh-token", {
      withCredentials: true
   });
 
   if (res.status === 200) {
     setCookie("EastMlsToken", "/", res?.data?.accessToken, 60);
     return true;
   }
  } catch (error) {
    console.log(error);
    if (error?.status === 420) {
      deleteCookie("EastMlsToken", "/");
      return false;
    }
 }
}