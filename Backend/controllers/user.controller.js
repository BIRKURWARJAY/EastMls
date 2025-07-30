import Transactions, { tryCatchWrapper } from "../utils/transactions";
import { PostError, MongoError } from "../utils/ErrorHandler.js";




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
