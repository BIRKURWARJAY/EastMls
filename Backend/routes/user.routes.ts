import { Router } from "express";
import { authenticateUser } from "../middlewares/auth";
import { changePassword, forgotPassword, getAgentDetailById, getUserDetails, getUserDetailsById, validateEmail } from "../controllers/user.controller";

const router = Router();

router.post("/validateEmail", validateEmail());

router.post("/forgot-password", forgotPassword());

router.put("/change-password", authenticateUser, changePassword());

router.get("/", authenticateUser, getUserDetails());

router.post("/:id", authenticateUser, getUserDetailsById());
router.get("/agent/:id", authenticateUser, getAgentDetailById());




export default router;