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


const Location = mongoose.models.Property || mongoose.model('Location', locationSchema)
export default Location;
