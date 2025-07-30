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
    name: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },

}, { timestamps: true });


export default mongoose.model('City', citySchema);
