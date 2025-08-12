import jwt from "jsonwebtoken";
import autoRefreshToken from "../utils/autoRefreshToken.js";

export const authenticateUser = async (req, res, next) => {
  const token = req?.cookies?.accessToken;

  if (!token) {
    return res.status(420).json({
      message: "Token not found"
    })
  }

  jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
    if (err?.name === "TokenExpiredError") {
      return res.status(420).json({
        message: "session Expired please login",
      });
    } else if (err) {
      return res.status(420).json({
        message: "Unauthorized",
      });
    }
    req.user = decoded;
    return next();
  });
}
