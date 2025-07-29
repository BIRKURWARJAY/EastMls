import Transactions from "../utils/transactions";
import { userLoginValidationSchema, userValidator } from "../validators/user.validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ValidationError } from "yup";


export function regiterUser() {
  return Transactions(async (req, res, next, session) => {
    await userValidator.validate(req.body);

    const { fullName, email, licenseNumber, password } = req.body;

    const existedUser = await userModel.findOne({
      email
    });

    if (existedUser) {
      throw PostError("User Already Exists", 301);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await userModel.create([fullName, email, hashedPassword, licenseNumber], { session });
    if (!createdUser) {
      throw MongoError("Error occured while registering user", 404);
    }

    return { status: 200, message: "User Registered successfully", data: null };
  })
}

export async function loginUser() {
  try {
    await userLoginValidationSchema.validate(req.body);

    const existedUser = await userModel.findOne({
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
      id: existedUser._id
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
        cookieOptions
      )
      .json({
        message: "User Logged in successfully",
        user,
      });
  } catch (error) {
    if (error instanceof ValidationError) {
      return next(PostError(error.errors));
    }
    if (error instanceof mongoose.Error || error.code === 11000) {
      return next(MongoError("Mongoose Errrr"));
    }
    return next(PostError(error.message, 409));
  }
}