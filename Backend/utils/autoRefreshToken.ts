import jwt from "jsonwebtoken";
import userModel, { userModelInterface } from "../models/user.model";
import { cookieOptions } from "./cookieOptions";
import { Request, Response } from "express";

export default async function autoRefreshToken(
  req: Request,
  res: Response
) {
  try {
    const token = req?.cookies?.refreshToken;
    if (!token) {
      return res.status(220).json({
        message: "token not found please login",
      });
    }

    const decodedToken: any = jwt.verify(token, process.env.JWTSECRET!);
    if (!decodedToken) {
      return res
        .status(220)
        .clearCookie("refreshToken")
        .json({ message: "Unauthorized" });
    }

    const user: userModelInterface = await userModel
      .findById(decodedToken.id)
      .select("-password");
    if (!user) {
      return res
        .status(220)
        .clearCookie("refreshToken")
        .json({ message: "User not found" });
    }

    if (token !== user?.refreshToken) {
      return res
        .status(220)
        .clearCookie("refreshToken")
        .json({ meassge: "Invalid Refresh Token" });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.username,
      },
      process.env.JWTSECRET!,
      {
        algorithm: "HS256",
        expiresIn: "1h",
      }
    );

    if (!accessToken)
      return res.status(220).json({ message: "something went wrong" });

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions(1000 * 60 * 60))
      .json({
        token: accessToken,
        user: user.toObject({
          versionKey: false,
          transform: (_: any, ret: any) => {
            delete ret.refreshToken;
          },
        }),
        message: "Token Refreshed SuccessFully",
      });
  } catch (error: any) {
    console.log(error);
    return res.status(220).clearCookie("refreshToken").json({
      message: error.message,
    });
  }
}
