import mongoose from "mongoose";
import { ValidationError } from "yup";
import { PostError, MongoError } from "./ErrorHandler.js";


const Transactions = (fn) => async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    let {status, message, data} = await fn(req, res, next, session);

    await session.commitTransaction();

    return res.status(status).json({
      message,
      data
    });
  } catch (error) {
    await session.abortTransaction();
    
    if (error instanceof mongoose.Error || error.code === 11000) {
      return next(new MongoError(error.message, 409, error));
    }
    if (error instanceof ValidationError) {
      return next(new PostError(error.errors, 409));
    }

    return next(new PostError(error.message, 409));
  } finally {
    await session.endSession();
  }
};

const tryCatchWrapper = (fn) => async(req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    if (error instanceof mongoose.Error || error.code === 11000) {
      return next(MongoError("Mongoose Errr", 409, error));
    }
    if (error instanceof ValidationError) {
      return next(PostError(error.errors));
    }
    return next(PostError(error.message, 409));
  }
};

export { Transactions, tryCatchWrapper };
