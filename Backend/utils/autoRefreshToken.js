import { PostError } from "./ErrorHandler.js";
import jwt from "jsonwebtoken";

export default async function autoRefreshToken(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1] || undefined;
    
    const decoded = jwt.decode(token, process.env.JWTSECRET);
    if (!decoded) {
      return res.status(420).json({ message: "Unauthorized" });
    }

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(420).json({ message: "User not found" });
    }

    if(!jwt.verify(user.refreshToken, process.env.JWTSECRET)) {
      return res.status(420).json({ message: "please Login again" });
    }

    const accessToken = jwt.sign({
      email: decoded.email,
      id: decoded.id,
      role: decoded.role
    }, process.env.JWTSECRET, {
      algorithm: "HS256",
      expiresIn: "15m"
    })

    return res.status(200).json({
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