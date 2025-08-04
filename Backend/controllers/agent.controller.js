import userModel from "../models/user.model.js";
import { MongoError, PostError } from "../utils/ErrorHandler.js";
import { tryCatchWrapper } from "../utils/transactions.js";



export function getAllAgents(){
  return tryCatchWrapper(async (req, res, next) => {
    const agents = await userModel.find({
      role: "agent",
      isDeleted: "false"
    }).select("-refreshToken -password");
    if (!agents) return res.status(200).json({
      message: "no agent found",
      status: "success"
    });

    return res.status(200).json({
      message: "agent fetched successfully",
      agents
    })
  })
}

export function updateAgent() {
  return tryCatchWrapper(async (req, res, next) => {
    const { email, username, licenseNumber, id } = req.body;
    if (!id || !email.trim() || !username.trim() || !licenseNumber.trim()) return next(PostError("Fields are Missing", 304));

    const update = userModel.findByIdAndUpdate(id, {
      email,
      username,
      licenseNumber
    }).select("-refreshToken -password");
    if (!update) return next(MongoError("error updating details", 500));

    return res.status(201).json({
      message: "details updated successFully",
      status: "success",
      agent: update
    })
  })
}

export function getAgent() {
  return tryCatchWrapper(async (req, res, next) => {
    const { id } = req.params;
    
    const agent = await userModel.findById(id).select("-refreshToken -password");
    if (!agent) return next(PostError("There is no Agent found", 404));

    return res.status(200).json({
      message: "agent found",
      status: "success",
      agent
    })
  })
}

export function searchAgent (){
  
}