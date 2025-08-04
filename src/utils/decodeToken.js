import { jwtDecode } from "jwt-decode";

const decodeToken = (role) => {
  const token = localStorage.getItem("EastMls");
  console.log("called ");


  if (!token) {
    console.log("no token found");

    return;
  }


  const decoded = jwtDecode(token);
  console.log(decoded);

  if (!decoded) {
    console.log("Token is invalid or not found.");
    return;
  }
  if (decoded.role !== role) {
    console.log("Not allowed");
    return;

  }
  return decoded

};

export default decodeToken;
