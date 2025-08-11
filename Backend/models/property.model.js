import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  propertyDescription: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  areaSqFt: {
    type: Number,
    required: true,
  },
  landArea: {
    type: Number,
    required: true,
  },
  yearOfBuild: {
    type: Number,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true,
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  leaseType: {
    type: String,
    required: true,
    default: "sell"
  },
  garage: {
    type: Number,
    default: 1
  },
  garageSize: {
    type: Number,
    default: 1
  },
  isPriceNegotiable: {
    type: Boolean,
    default: false
  },
  availableFrom: {
    type: Date,
  },
  verification: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    required: true
  },
  features: {
    type: Array,
    default: []
  },
}, { timestamps: true, strict: false });


const Property = mongoose.models.Property || mongoose.model('Property', propertySchema)
export default Property;
