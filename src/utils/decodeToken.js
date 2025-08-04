import { jwtDecode } from "jwt-decode";

const decodeToken = (role, router) => {
  const token = localStorage.getItem("EastMls");

    if (!token) {
      router.push("/login");
      return;
    }

    const decoded = jwtDecode(token);
    if (!decoded) {
      console.log("Token is invalid or not found.");
      router.push("/login");
      return;
    }
    if (decoded.role !== role) {
      console.log("Not allowed");
      router.replace("/");
      return;
    }

};

export default decodeToken;
