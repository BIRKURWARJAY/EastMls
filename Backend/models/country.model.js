import mongoose from "mongoose";

const CountrySchema = new mongoose.Schema({
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


export default mongoose.model('Country', citySchema);
