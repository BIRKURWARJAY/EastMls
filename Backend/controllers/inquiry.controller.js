import Inquiry from "../models/inquiry.model.js";
import Property from "../models/property.model.js";

const getInquiry = async (req, res) => {
  try {
        const allInq = await Inquiry.findById(req.user.id).populate("propertyId", "title", Property);

        return res.status(200).json({
            message: allInq.length ? "All inquiries fetched" : "No inquiries found",
            allInq
        });

    } catch (error) {
        console.error("Error in getInquiry:", error); 
        res.status(200).json({
            message: "Error fetching inquiries",
            error
        });
    }
};


const addInquiry = async (req, res) => {
    try {

        const { name, email, phone, message, propertyId, agentId, userId, status } = req.body

        if (![name, email, phone, message, propertyId, agentId, userId, status].every(Boolean)) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const newInq = await Inquiry.create({
            name,
            email,
            phone,
            message,
            propertyId,
            agentId,
            userId,
            status
        })

        return res.status(200).json({
            message: "New inq created",
            newInq
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error in fetch all inq",
            error
        })
    }
}

const deleteInquiry = async (req, res) => {
    try {

        const { id } = req.params

        const newInq = await Inquiry.findByIdAndDelete(id)

        if (!newInq) {
            return res.status(500).json({
                message: "error in delete inq",

            })
        }

        return res.status(200).json({
            message: "inquiry deleted",

        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error in fetch all inq",
            error
        })
    }
}

const updateInquiry = async (req, res) => {
    try {
        const { id } = req.params

        const { name, email, phone, message, propertyId, agentId, userId, status } = req.body

        if (!name || !email || !phone || !message || !propertyId || !agentId || !userId || !status || !id) {
            return res.status(500).json({
                message: "all field required",
            })
        }
        const newInq = await Inquiry.findByIdAndUpdate(id, {
            name,
            email,
            phone,
            message,
            propertyId,
            agentId,
            userId,
            status
        }, { new: true })

        return res.status(200).json({
            message: "Inquiry updated",
            newInq
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error in fetch all inq",
            error
        })
    }
}

export { getInquiry, addInquiry, deleteInquiry, updateInquiry }