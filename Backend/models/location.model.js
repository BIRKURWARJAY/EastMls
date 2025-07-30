import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        default: "Point"
    },
    coordinates: {
        type: Array,
        required: true,
    },

}, { timestamps: true });


export default mongoose.model('Location', locationSchema);
