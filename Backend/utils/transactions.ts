import mongoose, {ClientSession} from "mongoose";
import { ValidationError } from "yup";
import { PostError, MongoError } from "./ErrorHandler";
import { Response, Request, NextFunction } from "express";



const Transactions = (fn: (req: any, res: Response, next: NextFunction, session: ClientSession) => Promise<{ status: number; message: string; data: any }>) => async (req: any, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    
    let { status, message, data } = await fn(req, res, next, session);
    await session.commitTransaction();
    
    return res
      .status(status)
      .json({
        message,
        data
      });
  } catch (error: any) {
    await session.abortTransaction();

    if (error instanceof mongoose.Error || error.code === 11000) {
      return next(MongoError(error, 409));
    }
    if (error instanceof ValidationError) {
      return next(PostError(error.errors, 409));
    }

    return next(PostError(error.message, 409));
  } finally {
    await session.endSession();
  }
};

const tryCatchWrapper = (fn: (req: any, res: Response, next: NextFunction) => Promise<any>) => async (req: any, res: Response, next: NextFunction): Promise<any> => {
  try {
    await fn(req, res, next);
  } catch (error: any) {
    if (error instanceof mongoose.Error || error.code === 11000) {
      return next(MongoError("Mongoose Errr", 409));
    }
    if (error instanceof ValidationError) {
      return next(PostError(error.errors, 409));
    }
    return next(PostError(error.message, 409));
  }
};

export { Transactions, tryCatchWrapper };
