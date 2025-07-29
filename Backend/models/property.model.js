import mongoose from "mongoose";
import { type } from "os";

const propertySchema = new mongoose.Schema({
  leaseType: {
    type: String,
    required: true,
    enum: ["sell", "rent"]
  },
  yearBuilt: {
    type: Number,
    required: true
  },
  landArea: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  isPriceNegotiable: {
    type: Boolean,
    required: true
  },
  propertyType: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  availableFrom: {
    type: Date,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  images: [
    {
      type: String,
      required: true
    }
  ],
  videos: [
    {
      type: String
    }
  ]
}, {timestamps: true})