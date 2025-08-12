import toast from "react-hot-toast";
import { refreshAccessToken } from "./refreshAccessToken";
import { api } from "./api";




export default async function decodeRole(allowedRole, router) {

  const user = await api.get("/auth/verifyRole");
  
  const currentRole = user.data.role;

  if (!currentRole) {
    const res = await refreshAccessToken();
    if (!res) {
      return router.push("/login");
    }
  }

  if (typeof allowedRole === "string" ? !allowedRole.split().includes(currentRole) : !Array.from(allowedRole).includes(currentRole)) {
    console.log("Not Allowed");
    toast.error("Not Allowed");

    if (currentRole === "agent") {
      return router.replace("/agent/property");
    }
    
    return router.replace("/");
  }

  return user;
}