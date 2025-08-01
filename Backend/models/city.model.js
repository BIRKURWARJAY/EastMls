import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
    cityCode: {
        type: String,
        required: true,

    },
    country: {
        type: String,
        required: true,
    },
    cityName: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },

}, { timestamps: true });


const City = mongoose.models.City || mongoose.model('City', citySchema)
export default City;
