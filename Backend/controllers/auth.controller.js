import bcrypt from 'bcrypt';
import userModel from '../models/user.model';
import agentModel from '../models/agent.model';
import { userLoginValidationSchema, userValidator } from "../validators/user.validator";
import { PostError, MongoError } from '../utils/ErrorHandler';
import jwt from "jsonwebtoken";
import { Transactions, tryCatchWrapper } from '../utils/transactions';

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
      throw next(PostError("User Already Exists", 301));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = userType === "user" ? await userModel.create({ ...req.body, password: hashedPassword }) : await agentModel.create({ ...req.body, password: hashedPassword })
    if (!createdUser) {
      throw next(MongoError("Error occured while registering user", 404));
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
    const token = req.cookies.EastMls?.token;
    if (!token) {
      return next(PostError("No token provided", 401));
    }
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    if (!decoded) {
      return next(PostError("Invalid token", 401));
    }

    const Model = decoded.userType === "user" ? userModel : agentModel;

    const user = await Model.findById(decoded.id);
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
  return Transactions(async (req, res, next, session) => {
    const { fullName, email } = req.body;
    const Model = decoded.userType === "user" ? userModel : agentModel;

    const updatedUser = await Model.findByIdAndUpdate(
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