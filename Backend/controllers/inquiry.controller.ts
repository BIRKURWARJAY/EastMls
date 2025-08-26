import Inquiry from "../models/inquiry.model";
import Property from "../models/property.model";
import { Request, Response } from "express";
import { RequestWithUser } from "../types/express";

const getInquiry = async (req: RequestWithUser, res: Response) => {
    try {
        console.log(req?.user?.id);

        const allInq = await Inquiry.find({ userId: req?.user?.id }).populate("propertyId", "", Property);
        console.log(allInq);
        

        if (!allInq) {
            res.status(400).json({
                message: "Error fetching inquiries",
            });
        }

        return res.status(200).json({
            message: "All inquiries fetched",
            allInq
        });

    } catch (error) {
        console.error("Error in getInquiry:", error);
        res.status(400).json({
            message: "Error fetching inquiries",
            error
        });
    }
};


const addInquiry = async (req: RequestWithUser, res: Response) => {
    try {

        const { name, email, phone, message, propertyId, agentId, status } = req.body


        if (![name, email, phone, message, propertyId, agentId, status].every(Boolean)) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const newInq = await Inquiry.create({
            name,
            email,
            phone,
            message,
            propertyId,
            agentId,
            userId: req?.user?.id,
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

const deleteInquiry = async (req: RequestWithUser, res: Response) => {
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

const updateInquiry = async (req: RequestWithUser, res: Response) => {
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