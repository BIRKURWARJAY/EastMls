import { Router } from "express";
import { addInquiry, getInquiry, deleteInquiry, updateInquiry } from "../controllers/inquiry.controller";
import { authenticateUser } from "../middlewares/auth.js";

const inquiryRouter = Router();

inquiryRouter.get('/', authenticateUser, getInquiry)

inquiryRouter.post("/", authenticateUser, addInquiry)
// inquiryRouter.get('/:id', getproperty);
inquiryRouter.put('/:id', authenticateUser, updateInquiry);
inquiryRouter.delete('/:id', authenticateUser, deleteInquiry);


export default inquiryRouter;