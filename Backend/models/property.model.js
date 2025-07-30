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
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    type: {
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
    bathrooms: {
        type: Number,
    },
    bedrooms: {
        type: Number,
    },
    garage: {
        type: Number,
    },
    garageSize: {
        type: Number,
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
    verification: {
        type: Boolean,
        required: true,
        default: false
    },
    features: {
        type: Array,
        default: []
    },
}, { timestamps: true });


export default Property = mongoose.model('Property', propertySchema);