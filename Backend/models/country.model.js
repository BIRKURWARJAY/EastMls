import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
    countryCode: {
        type: String,
        required: true,

    },
    currency: {
        type: String,
        required: true,
    },
    countryName: {
        type: String,
        required: true,
    },
    countryStatus: {
        type: Boolean,
        required: true,
        default: false
    },

}, { timestamps: true });


const Country = mongoose.models.Property || mongoose.model('Country', countrySchema)
export default Country;
