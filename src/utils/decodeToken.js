import { InvalidTokenError, jwtDecode } from "jwt-decode";
import { eastMlsStore } from "@/store/eastMlsStore";
import toast from "react-hot-toast";
import { getCookie } from "./setCookie";
import { refreshAccessToken } from "./refreshAccessToken";


const decodeToken = async (role, router) => {
  const setIsLoggedIn = eastMlsStore.getState().setIsLoggedIn;

  if (typeof window !== "undefined") {
    const token = getCookie("EastMlsToken");
    if (!token || token === "undefined") {
      if (await refreshAccessToken()) {
        toast.success("Token Refreshed");
        setIsLoggedIn(true)
        return {
          status: true
        };
      } else {
        toast.error('Please login');
        setIsLoggedIn(false)
        return {
          status: false
        };
      }
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded instanceof InvalidTokenError || !decoded) {
        debugger
        toast.error('Token not valid')
        console.log("Token is invalid or not found.");
        if (await refreshAccessToken()) {
          toast.success("Token Refreshed");
          setIsLoggedIn(true)
          return {
            status: true
          }
        } else {
          toast.error('Please login')
          setIsLoggedIn(false);
          return {
            status: false
          };
        }
      }

      if (decoded.exp <= Date.now() / 1000) {
        debugger
        toast.error('Token is expired');
        console.log("Token Expired");
        if (await refreshAccessToken()) {
          toast.success("Token Refreshed");
          setIsLoggedIn(true)
          return {
            status: true
          }
        } else {
          toast.error("Please Login");
          setIsLoggedIn(false);
          return {
            status: false
          };
        }
      }

      if (decoded.role !== role) {
        debugger
        console.log("not allowed");
        toast.error('You are not allowed')

        router.replace("/");
        if (decoded.role === "agent") {
          router.replace("/agent/property");
          return {
            status: false
          };
        }
        return {
          status: false
        };
      }

      setIsLoggedIn(true);
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
