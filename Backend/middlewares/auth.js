import jwt from "jsonwebtoken";
import autoRefreshToken from "../utils/autoRefreshToken.js";

export const authenticateUser = async (req, res, next) => {
  let token = req?.cookies?.accessToken;
  if (!token) {
    const resp = await autoRefreshToken(req, res);
    token = resp.accessToken;
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
