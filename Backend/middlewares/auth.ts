import jwt from "jsonwebtoken";
import autoRefreshToken from "../utils/autoRefreshToken";
import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../types/express";

interface DecodedJWT {
  id: string;
  role: string;
}

export const authenticateUser:any = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
)=> {
  let token: string = req?.cookies?.accessToken;

  if (!token) {
    return await autoRefreshToken(req, res);
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
    } else {
      req.user = {
        id: (decoded as DecodedJWT)?.id,
        role: (decoded as DecodedJWT)?.role
      };
      return next();
    }
  });
};
