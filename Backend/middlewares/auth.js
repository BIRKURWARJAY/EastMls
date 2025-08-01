import { PostError } from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || undefined;
  if (!token) {
    return next(PostError("Unauthorized", 401));
  }

  jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
    if (err.name === "TokenExpiredError") {
      return next(PostError("Session Expired", 401));
    } else if (err) {
      return next(PostError("Unauthorized", 401));
    }
    req.user = decoded;
    next();
  });
}

export const restrictAuthUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || undefined;
  jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
    if (decoded) {
      return next(PostError("not allowed", 420));
    }
  });
  next()
}