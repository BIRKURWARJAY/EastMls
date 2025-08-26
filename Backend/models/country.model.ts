import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
    countryCode: {
        type: Number,
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

}, { timestamps: true });


const Country = mongoose.models.Property || mongoose.model('Country', countrySchema)
export default Country;
