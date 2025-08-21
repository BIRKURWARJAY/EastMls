import jwt from "jsonwebtoken";
import autoRefreshToken from "../utils/autoRefreshToken.js";
import { NextFunction, Request, Response } from "express";

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  let token: string = req?.cookies?.accessToken;

  if (!token) {
    await autoRefreshToken(req, res);
  }

  jwt.verify(token, process.env.JWTSECRET!, (err, decoded) => {
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
    return next();
  });
}
