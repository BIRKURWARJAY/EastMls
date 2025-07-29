import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
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
  licenseNumber: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  mob: {
    type: Number
  },
  
}, { timestamps: true });