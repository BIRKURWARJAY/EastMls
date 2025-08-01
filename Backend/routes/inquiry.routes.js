import { Router } from "express";
import { addInquiry, getInquiry, deleteInquiry, updateInquiry } from "../controllers/inquiry.controller.js";

const inquiryRouter = Router();

inquiryRouter.get('/', getInquiry)

inquiryRouter.post("/", addInquiry)
// inquiryRouter.get('/:id', getproperty);
inquiryRouter.put('/:id', updateInquiry);
inquiryRouter.delete('/:id', deleteInquiry);


export default inquiryRouter;