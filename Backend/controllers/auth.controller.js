import bcrypt from 'bcrypt';
import userModel from '../models/user.model.js';
import { userLoginValidationSchema, userValidator } from "../validators/user.validator.js";
import { PostError, MongoError } from '../utils/ErrorHandler.js';
import jwt from "jsonwebtoken";
import { Transactions, tryCatchWrapper } from '../utils/transactions.js';

const cookieOptions = (maxAge) => {
  return {
    httpOnly: false,
    secure: false,
    sameSite: "none",
    maxAge
  }
};


export function regiterUser() {
  return tryCatchWrapper(async (req, res, next) => {
    await userValidator.validate(req.body);
    const { email, password } = req.body;
    const existedUser = await userModel.findOne({
      email
    });

    if (existedUser) {
      return next(PostError("User Already Exists", 301));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await userModel.create({
      ...req.body,
      password: hashedPassword,
      ...(req.body.role === "agent" && { licenseNumber: req.body.licenseNumber })
    })
    if (!createdUser) {
      return next(MongoError("Error occured while registering user", 404));
    }

    return res.status(200).json({ message: "User Registered successfully", data: null });
  })
}

export function loginUser() {
  return tryCatchWrapper(async (req, res, next) => {
    await userLoginValidationSchema.validate(req.body);

    const existedUser = await userModel.findOne({
      email: req.body.email,
      isDeleted: false,
      role: req.body.role
    });
    if (!existedUser) {
      return next(PostError("User Doesn't Exists", 404));
    }

    const passwordCheck = await existedUser.isPasswordCorrect(req.body.password);

    if (!passwordCheck) return next(PostError("password is incorrect", 404));

    const accessToken = jwt.sign({
      email: existedUser.email,
      id: existedUser._id,
      role: req.body.role
    },
      process.env.JWTSECRET,
      {
        algorithm: "HS256",
        expiresIn: "15m"
      }
    )

    if (!accessToken) return next(PostError('Error Creating AccessToken', 500));

    const refreshToken = jwt.sign({
      email: existedUser.email,
      id: existedUser._id
    },
      process.env.JWTSECRET,
      {
        algorithm: "HS256",
        expiresIn: "7d"
      }
    )
    if (!refreshToken) return next(PostError('Error Creating RefreshToken', 500));

    existedUser.refreshToken = refreshToken;

    (await existedUser.save());

    return res
      .status(200)
      .json({
        message: "User Logged in successfully",
        token: accessToken,
        existedUser: existedUser.toObject({ versionKey: false, transform: (doc, ret) => { delete ret.password; delete ret.refreshToken; } }),
      });
  })
}

export function logoutUser() {
  return tryCatchWrapper(async (req, res, next) => {
    const user = await userModel.findById(req.user?.id);
    if (!user) {
      return next(PostError("User is already not loggedIn", 404));
    }
    user.refreshToken = null;
    await user.save();
    return res
      .status(200)
      .json({ message: "logged out successfully", status: "success" });
  })
}

export function updateUserDetails() {
  return tryCatchWrapper(async (req, res, next) => {
    const { fullName, email } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user.id,
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
  return tryCatchWrapper(async (req, res, next) => {
    const user = await userModel.findById(req.user.id);
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

userModel.createIndexes(
  { deleteAt: 1 },
  { expireAfterSeconds: 0 }
)

/////////////////////////////
export function deleteUserPermanently() {
  return tryCatchWrapper(async (req, res, next) => {

  })
}