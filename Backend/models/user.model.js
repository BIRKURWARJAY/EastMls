import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    default: "https://eastmls.net/_next/image?url=https%3A%2F%2Feastmls-media.s3.us-east-2.amazonaws.com%2F6858fd3eb1f932ffcdda32e4%2FIMG_0329.jpeg&w=1080&q=75"
  },
  refreshToken: {
    type: String,
    default: null
  }
}, { timestamps: true, strict: false });

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
}


export default mongoose.model('User', userSchema);