import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.js";
import { changePassword, getUserDetails, getUserDetailsById, validateEmail } from "../controllers/user.controller.js";

const router = Router();

router.post("/validateEmail", validateEmail());

router.post("/change-password", authenticateUser, changePassword());

router.get("/", authenticateUser, getUserDetails());

router.post("/:id", authenticateUser, getUserDetailsById());




export default router;