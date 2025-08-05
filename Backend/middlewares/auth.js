import { PostError } from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.replaceAll('"', '').split("Bearer ")[1] || undefined;
  console.log(token)
  if (!token) {
    return next(PostError("Unauthorized", 401));
  }

  jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
    if (err?.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "session Expired please login",
      });
    } else if (err) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    req.user = decoded;
    next();
  });
}
