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
    console.log(req.cookies)

    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(420).json({
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
      id: decodedToken.id,
      role: decodedToken.role
    }, process.env.JWTSECRET, {
      algorithm: "HS256",
      expiresIn: "15m"
    })

    return res.status(200)
      .cookie("accessToken", accessToken, cookieOptions(1000 * 60 * 15))
      .json({
      message: "Token refreshed successfully",
      token: accessToken
    });
  } catch (error) { 
    console.log(error);
    return res.status(420).json({
      message: error.message
    })
  }
}