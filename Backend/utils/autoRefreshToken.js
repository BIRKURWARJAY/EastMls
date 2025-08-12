import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";



export default async function autoRefreshToken(req, res) {

  try {
    const token = req?.cookies?.refreshToken;
    if (!token) {
      return res.status(220)
        .json({
          message: "token not found please login"
        })
    }

    const decodedToken = jwt.verify(token, process.env.JWTSECRET);
    if (!decodedToken) {
      return res.status(420).clearCookie("refreshToken").json({ message: "Unauthorized" });
    }

    const user = await userModel.findById(decodedToken.id);
    if (!user) {
      return res.status(420).clearCookie("refreshToken").json({ message: "User not found" });
    }

    if (token !== user?.refreshToken) {
      return res.status(420).clearCookie("refreshToken").json({ meassge: "Invalid Refresh Token" });
    }

    const accessToken = jwt.sign({
      id: user._id,
      role: user.role
    }, process.env.JWTSECRET, {
      algorithm: "HS256",
      expiresIn: "1h"
    })

    return {accessToken};

  } catch (error) {
    console.log(error);
    return res.status(420).clearCookie("refreshToken").json({
      message: error.message
    })
  }
}