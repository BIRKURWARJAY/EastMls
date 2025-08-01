import mongoose from "mongoose";

function PostError(message, statusCode) {
  const error = new Error(message);
  Error.captureStackTrace(error, PostError);
  return { error, statusCode, isOperational: true }
}

const errorHandler = async (err, req, res, next) => {
// return res.send(err)
  if (err instanceof MongoError) {
    if (err.isOperational) {
      let message = "";

      if (err instanceof mongoose.Error.ValidationError) {
        message = `Mongoose validation error:: There's some error in ${Object.keys(err.errors)[0]
          }`;
      } else if (err instanceof mongoose.Error.CastError) {
        message = `Mongoose cast error:: Invalid value for ${err.path}: ${err.value}`;
      } else if (err?.originError?.code === 11000) {
        const field = Object.keys(err.originError.keyValue)[0];
        const value = Object.values(err.originError.keyValue)[0];
        message = `Mongoose duplication error:: The ${field} field with value '${value}' already exists.`;
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
      message: err.message,
    });
  }
  if (err instanceof PostError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.error.message,
    })
  }

  // For programming errors or other unexpected errors
  console.error("ERROR 💥", err);

  res.status(500).json({
    status: "unknown error!",
    message: err?.error?.message,
  });
};

// Define specific MongoDB/Mongoose error handlers
function MongoError(message, statusCode, originError) {
  return { message, statusCode, originError }
}

export { PostError, errorHandler, MongoError };
