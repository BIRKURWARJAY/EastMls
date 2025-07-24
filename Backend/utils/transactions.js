import mongoose from "mongoose";

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
      return next(new MongoError("Mongoose Errr", 409, error));
    }
    if (error.isJoi) {
      return next(new PostError(error.details[0].message, 409));
    }

    return next(new PostError(error.message, 409));
  } finally {
    await session.endSession();
  }
};

export default Transactions;
