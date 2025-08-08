import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export default async function autoRefreshToken(req, res, next) {
  const cookieOptions = (maxAge) => {
  return {
    httpOnly: true,
    secure: true,
    origin: "http://localhost:3000",
    sameSite: "none",
    expires: new Date(Date.now() + maxAge)
  }
  };
  
  try {

    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(420)
        .clearCookie()
        .json({
        message: "token not found please login"
      })
    }
    
    const decodedToken = jwt.verify(token, process.env.JWTSECRET);
    if (!decodedToken) {
      return res.status(420).json({ message: "Unauthorized" });
    }

    const user = await userModel.findById(decodedToken.id);
    if (!user) {
      return res.status(420).json({ message: "User not found" });
    }

    if (token !== user?.refreshToken) {
      return res.status(420).json({ meassge: "Invalid Refresh Token" });
    }

    const accessToken = jwt.sign({
      id: user._id,
      role: user.role
    }, process.env.JWTSECRET, {
      algorithm: "HS256",
      expiresIn: "1h"
    })

    return res.status(200)
      .cookie("accessToken", accessToken, cookieOptions(1000 * 60 * 15))
      .json({
      message: "Token refreshed successfully",
      accessToken
    });
  } catch (error) { 
    console.log(error);
    return res.status(420).json({
      message: error.message
    })
  }
}