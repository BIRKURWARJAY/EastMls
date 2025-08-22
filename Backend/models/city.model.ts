import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
    cityCode: {
        type: Number,
        required: true,

    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true
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
