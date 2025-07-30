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


export default City = mongoose.model('City', citySchema);
