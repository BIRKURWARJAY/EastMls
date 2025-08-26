import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { RequestWithUser } from "../types/express";

function PostError(message: string | string[], statusCode: number) {
  const error = new Error(Array.isArray(message) ? message.join(", ") : message) as any;
  Error.captureStackTrace(error, PostError);
  const errorMessage = message || error.message;
  return { error, errorMessage, statusCode, isOperational: true }
}

type ErrType = {
  error: Error;
  errorMessage: string;
  statusCode: number;
  isOperational: boolean;
  code?: number
}

const errorHandler = async (err: ErrType, req: RequestWithUser, res: Response, next: NextFunction) => {
// return res.send(err)
  if (err instanceof MongoError) {
    if (err.isOperational) {
      let message = "";

      if (err instanceof mongoose.Error.ValidationError) {
        message = `Mongoose validation error:: There's some error in ${Object.keys(err.errors)[0]
          }`;
      } else if (err instanceof mongoose.Error.CastError) {
        message = `Mongoose cast error:: Invalid value for ${err.path}: ${err.value}`;
      } else if (err?.code === 11000) {
        message = `Mongoose duplication error:: The field already exists.`;
      } else {
        message = "Mongoose unknown error";
      }

      return res.status(err.statusCode).json({
        status: "mongoose Errr",
        message,
      });
    }

    return res.status(err.statusCode).json({
      status: "Mongoose unknown Errrr",
      message: err.errorMessage,
    });
  }
  if (err instanceof PostError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.errorMessage
    })
  }

  // For programming errors or other unexpected errors
  console.error("ERROR 💥", err);

  return res.status(500).json({
    status: "unknown error!",
    message: err.errorMessage
  });
};

// Define specific MongoDB/Mongoose error handlers
function MongoError(err: any, statusCode: number) {
  const error = new Error(err?.message || "") as any;
  Error.captureStackTrace(error, MongoError);
  const errorMessage = err?.message || error.message;
  return { err, errorMessage, statusCode, isOperational: true }
}

export { PostError, errorHandler, MongoError };
