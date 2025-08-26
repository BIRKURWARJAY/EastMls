import bcrypt from 'bcrypt';
import userModel from '../models/user.model';
import { userLoginValidationSchema, userValidator } from "../validators/user.validator";
import { PostError, MongoError } from '../utils/ErrorHandler';
import jwt from "jsonwebtoken";
import { tryCatchWrapper } from '../utils/transactions';
import { cookieOptions } from '../utils/cookieOptions';
import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '../types/express';



export function regiterUser() {
  return tryCatchWrapper(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    await userValidator.validate(req.body);
    const { email, password } = req.body;
    const existedUser = await userModel.findOne({
      email
    });

    const agentFields = {
      profileImage: "https://eastmls.net/_next/image?url=https%3A%2F%2Feastmls-media.s3.us-east-2.amazonaws.com%2F6858fd3eb1f932ffcdda32e4%2FIMG_0329.jpeg&w=1080&q=75",
      contact: "not available",
      properties: [],
      licenseNumber: req.body.licenseNumber
    }

    if (existedUser) {
      return next(PostError("User Already Exists", 301));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await userModel.create({
      ...req.body,
      password: hashedPassword,
      ...(req.body.role === "agent" && agentFields),
    })
    if (!createdUser) {
      return next(MongoError("Error occured while registering user", 404));
    }

    return res.status(200).json({ message: "User Registered successfully", data: null });
  })
}

export function loginUser() {
  return tryCatchWrapper(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    await userLoginValidationSchema.validate(req.body);

    const existedUser = await userModel.findOne({
      email: req.body.email,
      isDeleted: false,
      role: req.body.role
    });
    if (!existedUser) {
      return res.status(404)
        .json({
          message: "user does not exist"
        });
    }

    const passwordCheck = await existedUser.isPasswordCorrect(req.body.password);

    if (!passwordCheck) return next(PostError("password is incorrect", 404));

    const accessToken = jwt.sign({
      id: existedUser._id,
      role: req.body.role
    },
      process.env.JWTSECRET!,
      {
        algorithm: "HS256",
        expiresIn: "15m"
      }
    )

    if (!accessToken) return next(PostError('Error Creating AccessToken', 500));

    const refreshToken = jwt.sign({
      id: existedUser._id
    },
      process.env.JWTSECRET!,
      {
        algorithm: "HS256",
        expiresIn: "7d"
      }
    )
    if (!refreshToken) return next(PostError('Error Creating RefreshToken', 500));

    existedUser.refreshToken = refreshToken;

    await existedUser.save();

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions(1000 * 60 * 15))
      .cookie("refreshToken", refreshToken, cookieOptions(1000 * 60 * 60 * 24 * 7))
      .json({
        message: "User Logged in successfully",
        existedUser: existedUser.toObject({ versionKey: false, transform: (doc, ret: any) => { delete ret.password; delete ret.refreshToken; } }),
      });
  })
}

export function logoutUser() {
  return tryCatchWrapper(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    console.log('>> auth controller > logoutUser', req?.user )

    const user = await userModel.findById(req?.user?.id);
    if (!user) {
      return next(PostError("User is already not loggedIn", 404));
    }
    user.refreshToken = null;
    await user.save();
    return res
      .status(200)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({ message: "logged out successfully", status: "success" });
  })
}

export function updateUserDetails() {
  return tryCatchWrapper(async (req: RequestWithUser , res: Response, next: NextFunction) => {
    const { fullName, email } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      req?.user?.id,
      { fullName, email },
      { new: true }
    );

    if (!updatedUser) {
      return next(MongoError("Error updating user details", 404));
    }

    return res.status(200).json({ message: "User details updated successfully", data: updatedUser });
  });
}

export function softDeleteUser() {
  return tryCatchWrapper(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = await userModel.findById(req?.user?.id);
    if (!user) {
      return next(PostError("User not found", 404));
    }
    user.isDeleted = true;
    user.deleteAt = new Date(Date.now() + 1000) //15 days
    await user.save();

    return res
      .status(200)
      .json({ message: "User soft deleted successfully" });
  });
}



/////////////////////////////
export function deleteUserPermanently() {
  return tryCatchWrapper(async (req: RequestWithUser, res: Response, next: NextFunction) => {

  })
}