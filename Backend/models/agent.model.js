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
    default: null
  },
  imageUrl: {
    type: String,
    default: null
  },
  mob: {
    type: Number,
    default: null
  },
  
}, { timestamps: true });


export default Agent = mongoose.model('Agent', agentSchema);