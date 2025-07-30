import agentModel from "../models/agent.model.js";
import userModel from "../models/user.model.js";
import { PostError } from "../utils/ErrorHandler.js";

export const authenticateUser = (req, res, next) => {
  const token = req.cookies.EastMls?.token;

  if (!token) {
    return next(PostError("Unauthorized", 401));
  }

  jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
    if (err.name === "TokenExpiredError") {
      return next(PostError("Session Expired", 401));
    } else if(err) {
      return next(PostError("Unauthorized", 401));
    }

    req.user = decoded;
    req.Model = decoded.userType === "user" ? userModel : agentModel
    next();
  });
}