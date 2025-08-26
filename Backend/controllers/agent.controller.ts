import userModel from "../models/user.model";
import { RequestWithUser } from "../types/express";
import { MongoError, PostError } from "../utils/ErrorHandler";
import { tryCatchWrapper } from "../utils/transactions";
import {Request, Response, NextFunction} from "express"



export function getAllAgents() {
  return tryCatchWrapper(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const agents = await userModel.find({
      role: "agent",
      isDeleted: false
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

export function getAgentDetailById() {
  return tryCatchWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const agent = await userModel.findById(id).select("-password -refreshToken");
    if (!agent) return next(PostError("Agent Doesn't Exists", 404));

    return res.status(200).json({
      message: "agent fetch sucessfully",
      agent
    })
  })
}


export function updateAgent() {
  return tryCatchWrapper(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const id = req?.user?.id;
    const { email, username, licenseNumber, phone, instagram, facebook, linkedin } = req.body;
    if (!id || !email.trim() || !username.trim()) return next(PostError("Fields are Missing", 304));



    const update = await userModel.findByIdAndUpdate(id, {
      email,
      username,
      licenseNumber,
      phone,
      instagram,
      facebook,
      linkedin
    }, { new: true }).select("-refreshToken -password");

    if (!update) return next(MongoError("error updating details", 500));

    return res.status(200).json({
      message: "Updated successFully",
      status: "success",
      agent: update
    })
  })
}

export function getAgent() {
  return tryCatchWrapper(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const id = req?.user?.id;
    console.log(id);


    const agent = await userModel.findById(id).select("-refreshToken -password");
    if (!agent) return next(PostError("There is no Agent found", 404));

    return res.status(200).json({
      message: "agent found",
      status: "success",
      agent
    })
  })
}

export async function searchAgent(req: RequestWithUser, res: Response) {
  try {
    interface pop {
      username?: string
    }

    let { username }:pop = req.query;
    if (!username) {
      return res.status(404).send("username is req")
    }

    const matchStage: any = {
      role: "agent",
    };

    if (username && username.trim() !== '') {
      matchStage.username = {
        $regex: username.trim(),
        $options: "i"
      };
    }

    const pipeline = [{ $match: matchStage }];

    const agentdetails = await userModel.aggregate(pipeline);

    if (!agentdetails.length) {
      return res.status(200).json({
        message: "No agent found",
        agentdetails: []
      });
    }

    res.status(200).json({
      message: "agent fetched successfully",
      agentdetails
    });

  } catch (error: any) {
    console.error("Search agent Error:", error);
    res.status(500).json({
      message: "Error fetching agent",
      error: error.message,
    });
  }
}