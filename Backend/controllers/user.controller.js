import Transactions, { tryCatchWrapper } from "../utils/transactions";
import userModel from "../models/user.model";
import { PostError, MongoError } from "../utils/ErrorHandler.js";




export function getUserDetails() { 
  return tryCatchWrapper(async (req, res, next) => {
    const token = req.cookies.EastMls?.token;
    if (!token) {
      return next(PostError("No token provided", 401));
    }
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    if (!decoded) {
      return next(PostError("Invalid token", 401));
    }
    const user = await userModel.findById(decoded.id).select("-password -refreshToken");
    if (!user) {
      return next(PostError("User not found", 404));
    }
    return res.status(200).json({ user });
  })
}

export function updateUserDetails() {
  return Transactions(async (req, res, next, session) => {
    const { fullName, email } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user.id,
      { fullName, email, licenseNumber: req.body?.licenseNumber },
      { new: true, session }
    );

    if (!updatedUser) {
      throw MongoError("Error updating user details", 404);
    }

    return { status: 200, message: "User details updated successfully", data: updatedUser };
  });
}

export function softDeleteUser() {
  return tryCatchWrapper(async (req, res, next) => {
    const token = req.cookies.EastMls?.token;
    if (!token) {
      return next(PostError("No token provided", 401));
    }
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    if (!decoded) {
      return next(PostError("Invalid token", 401));
    }
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return next(PostError("User not found", 404));
    }
    user.isDeleted = true;
    await user.save();

    return res
      .clearCookie("EastMls")
      .status(200)
      .json({ message: "User soft deleted successfully" });
  });
}

/////////////////////////////
export function deleteUserPermanently() {
  return tryCatchWrapper(async (req, res, next) => {

  })
}