import axios from "axios";

export async function refreshAccessToken() {
  try {
   const res = await axios.get("http://localhost:5000/api/auth/refresh-token", {
      withCredentials: true
   });
 
   if (res?.status === 200) {
     return res.data.user;
   }
  } catch (error:any) {
    console.log(error);
    if (error?.status === 420) {
      return false;
    }
 }
}