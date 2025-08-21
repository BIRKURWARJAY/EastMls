import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
    },
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        required: true,
        default: "New"
    },


}, { timestamps: true });


const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema)
export default Inquiry;
