import {Transactions, tryCatchWrapper } from "../utils/transactions.js";
import { PostError, MongoError } from "../utils/ErrorHandler.js";
import userModel from "../models/user.model.js";
import { hashPassword } from "../utils/hashPassword.js";




export function getUserDetails() { 
  return tryCatchWrapper(async (req, res, next) => {
    const user = await req.Model.findById(req.user.id).select("-password -refreshToken");
    if (!user) {
      return next(PostError("User not found", 404));
    }
    return res.status(200).json({ user });
  })
}

export function getUserDetailsById() {
  return tryCatchWrapper(async (req, res, next) => {
    const user = req.Model.findById(req.user.id).select("-password", "-refreshToken");
    if (!user) return next(PostError("User Doesn't Exists"));

    return res.status(200).json({
      user
    })
  })
}

export function validateEmail() {
  return tryCatchWrapper(async (req, res, next) => {
    const { email } = req.body;
    if (!email) return next(PostError("Email is required", 304));

    const user = await userModel.findOne({
      email
    });
    if (!user) return next(PostError("User doesn't exist", 404));

    res.status(200).json({
      message: "account exists",
      status: "success"
    })
  })
}

export function forgotPassword() {
  return tryCatchWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(PostError("Email and Password is required"));

    const existedUser = await userModel.findOne({
      email
    });
    if (!existedUser) return next(PostError("Account Not Found", 404));

    const hashedPassword = await hashPassword(password);
    
    existedUser.password = hashedPassword;
    await existedUser.save();

    return res.status(201).json({
      message: "Password changed successfully",
      status: "success"
    })
  })
}

export function changePassword() {
  return tryCatchWrapper(async(req, res, next) => {
    const { password } = req.body;
    if (!password || password.trim().length < 6) return next(PostError("password is not valid", 301));

    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) changePassword();

    const user = await userModel.findById(req.user.id);
    if (!user) return next(PostError("user doesn't exist", 404));

    user.password = hashedPassword;
    await user.save();

    return res.status(201).json({ message: "password changed successfully" });
  })
}