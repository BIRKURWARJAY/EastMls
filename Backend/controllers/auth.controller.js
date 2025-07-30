import bcrypt from 'bcrypt';
import userModel from '../models/user.model.js';
import agentModel from '../models/agent.model.js';
import { userLoginValidationSchema, userValidator } from "../validators/user.validator.js";
import { PostError, MongoError } from '../utils/ErrorHandler.js';
import jwt from "jsonwebtoken";
import { Transactions, tryCatchWrapper } from '../utils/transactions.js';

const cookieOptions = (maxAge) => {
  return {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge
  }
};


export function regiterUser() {
  return tryCatchWrapper(async (req, res, next) => {
    await userValidator.validate(req.body);
    const { userType } = req.headers;
    const { email, password } = req.body;
    const Model = userType === "user" ? userModel : agentModel;

    const existedUser = await Model.findOne({
      email
    });

    if (existedUser) {
      return next(PostError("User Already Exists", 301));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = userType === "user" ? await userModel.create({ ...req.body, password: hashedPassword }) : await agentModel.create({ ...req.body, password: hashedPassword })
    if (!createdUser) {
      return next(MongoError("Error occured while registering user", 404));
    }

    return { status: 200, message: "User Registered successfully", data: null };
  })
}

export function loginUser() {
  return tryCatchWrapper(async (req, res, next) => {
    await userLoginValidationSchema.validate(req.body);
    const { userType } = req.headers;
    const Model = userType === "user" ? userModel : agentModel;

    const existedUser = await Model.findOne({
      email: req.body.email,
      isDeleted: false,
    });
    if (!existedUser) {
      return next(PostError("User Doesn't Exists", 404));
    }

    const passwordCheck = await existedUser.isPasswordCorrect(
      req.body.password
    );

    if (!passwordCheck) return next(PostError("password is incorrect", 404));

    const { password, ...user } = existedUser._doc;

    const accessToken = jwt.sign({
      email: existedUser.email,
      id: existedUser._id,
      userType
    },
      process.env.JWTSECRET,
      {
        algorithm: "HS256"
      }
    )

    if (!accessToken) return next(PostError('Error Creating AccessToken', 500));

    const refreshToken = jwt.sign({
      email: existedUser.email,
      id: existedUser._id
    },
      process.env.JWTSECRET,
      {
        algorithm: "HS256"
      }
    )
    if (!refreshToken) return next(PostError('Error Creating RefreshToken', 500));

    existedUser.refreshToken = refreshToken;

    await existedUser.save();

    return res
      .status(200)
      .cookie(
        "EastMls",
        { token: accessToken },
        cookieOptions(1000 * 60 * 15)
      )
      .json({
        message: "User Logged in successfully",
        user,
      });
  })
}

export function logoutUser() {
  return tryCatchWrapper(async (req, res, next) => {
    const user = await req.Model.findById(req.user.id);
    if (!user) {
      return next(PostError("User not found", 404));
    }
    user.refreshToken = null;
    await user.save();
    return res
      .clearCookie("EastMls")
      .status(200)
      .json({ message: "User logged out successfully" });
  })
}

export function updateUserDetails() {
  return tryCatchWrapper(async (req, res, next) => {
    const { fullName, email } = req.body;

    const updatedUser = req.userType === "user" ?  await req.Model.findByIdAndUpdate(
      req.user.id,
      {fullName, email},
      { new: true }
    ) :  await req.Model.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return next(MongoError("Error updating user details", 404));
    }

    return { status: 200, message: "User details updated successfully", data: updatedUser };
  });
}

export function softDeleteUser() {
  return tryCatchWrapper(async (req, res, next) => {
    const user = await req.Model.findById(req.user.id);
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