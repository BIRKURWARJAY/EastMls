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
    unique: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  refreshToken: {
    type: String,
    default: null
  }
}, { timestamps: true });

userSchema.methods.isPasswordCorrect = async function(password) {
  await bcrypt.compare(password, this.password);
}


export default mongoose.model('User', userSchema);