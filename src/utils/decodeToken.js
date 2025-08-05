import { jwtDecode } from "jwt-decode";
import { eastMlsStore } from "@/store/eastMlsStore";
import toast from "react-hot-toast";


const decodeToken = (role, router) => {
  const setIsLoggedIn = eastMlsStore.getState().setIsLoggedIn;

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("EastMls");

    if (!token) {
      router.replace("/login");
      toast.error('Please login')
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (!decoded) {
        toast.error('Token not valid')
        console.log("Token is invalid or not found.");
        setIsLoggedIn(false);
        router.replace("/login");
        return;
      }

      if (decoded.role !== role) {
        console.log("not allowed");
        toast.error('You are not allowed')

        router.replace("/");
        if (decoded.role === "agent") {
          router.replace("/login");
        }
        return;
      }
      return {
        status: true,
        decodedToken: decoded
      };
    } catch (error) {
        toast.error('Token decoding error')

      console.log("Error decoding token:", error);
      setIsLoggedIn(false);
      router.replace("/login");

    }
  }
};

export default decodeToken;
