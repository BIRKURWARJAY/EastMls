import { tryCatchWrapper } from "../utils/transactions";
import { PostError } from "../utils/ErrorHandler";
import userModel from "../models/user.model";
import { hashPassword } from "../utils/hashPassword";
import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from "express";



export function getUserDetails() {
  return tryCatchWrapper(async (req:any, res, next) => {
    const user = await userModel.findById(req.user.id).select("-password -refreshToken");
    if (!user) {
      return next(PostError("User not found", 404));
    }
    return res.status(200).json({ user });
  })
}

export function getUserDetailsById() {
  return tryCatchWrapper(async (req:any, res, next) => {
    const user = userModel.findById(req.user.id).select("-password -refreshToken");
    if (!user) return next(PostError("User Doesn't Exists", 404));

    return res.status(200).json({
      user
    })
  })
}

export function validateEmail() {
  return tryCatchWrapper(async (req:any, res, next) => {
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
  return tryCatchWrapper(async (req:any, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(PostError("Email and Password is required", 400));

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
  return tryCatchWrapper(async (req:any, res, next) => {
    const { oldpassword, newpassword } = req.body;
    console.log(req.body);

    if (!oldpassword || !newpassword || newpassword.trim().length < 6) return next(PostError("password is not valid", 301));


    const user = await userModel.findById(req.user.id);
    if (!user) return next(PostError("user doesn't exist", 404));

    const hashedPassword = await bcrypt.compare(oldpassword, user.password);
    if (!hashedPassword) return res.status(500).json({ message: "password is incorrect" });


    user.password = await bcrypt.hash(newpassword, 10);

    await user.save();


    return res.status(200).json({ message: "password changed successfully" });
  })
}

export function getAgentDetailById() {
  return tryCatchWrapper(async (req:any, res, next) => {
    const { id } = await req.params
    console.log(id);

    const agent = await userModel.findById(id).select("-password -refreshToken");
    if (!agent) return next(PostError("Agent Doesn't Exists", 404));

    return res.status(200).json({
      message: "agent fetch sucessfully",
      agent
    })
  })
}
