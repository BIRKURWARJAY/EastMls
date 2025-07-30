import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
    countryCode: {
        type: String,
        required: true,

    },
    currency: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },

}, { timestamps: true });


export default City = mongoose.model('City', citySchema);
