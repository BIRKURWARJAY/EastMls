import { eastMlsStore } from "@/store/eastMlsStore";
import toast from "react-hot-toast";
import { refreshAccessToken } from "./refreshAccessToken";




export default async function decodeRole(allowedRole, router) {

  let currentRole = eastMlsStore.getState().role;
  const setIsLoggedIn = eastMlsStore.getState().setIsLoggedIn;
  const setName = eastMlsStore.getState().setName;
  const setEmail = eastMlsStore.getState().setEmail;
  const setRole = eastMlsStore.getState().setRole;

  if (!currentRole) {
    const res = await refreshAccessToken();
    if (res) {
      setIsLoggedIn(true, 500);
      setName(res.username, 60);
      setEmail(res.email, 60);
      setRole(res.role, 60);
      currentRole = res.role;
    } else {
      setIsLoggedIn(false);
      return false;
    }
  }

  if (typeof allowedRole === "string" ? !allowedRole.split().includes(currentRole) : !Array.from(allowedRole).includes(currentRole)) {
    console.log("Not Allowed");
    toast.error("Not Allowed");

    if (currentRole === "agent") {
      return router.replace("/buy-property");
    }
    
    return router.back();
  }

  return true;
}