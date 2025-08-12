import jwt from "jsonwebtoken";
import autoRefreshToken from "../utils/autoRefreshToken.js";
import { cookieOptions } from "../utils/cookieOptions.js";

export const authenticateUser = async (req, res, next) => {
  let token = req?.cookies?.accessToken;
  if (!token) {
    if (req?.cookies?.refreshToken) {
      const resp = await autoRefreshToken(req, res);
      if (resp?.accessToken) {
        res.cookie("accessToken", resp.accessToken, cookieOptions(1000 * 60 * 60))
        token = resp.accessToken;
      }
    }
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
    req.user.accessToken = token;
    next();
  });
}
