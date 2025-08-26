import mongoose from "mongoose";

const connect = async () => {
  try {
   await mongoose.connect(process.env.MONGO_URI!);
    console.log("db connect sucessfully");
  } catch (error) {
    console.log("error in db connection", error);
  }
};

export default connect;
