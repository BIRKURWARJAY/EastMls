import { Router } from "express";
import { loginUser, logoutUser, regiterUser, softDeleteUser, updateUserDetails } from "../controllers/auth.controller.js";
import { authenticateUser } from "../middlewares/auth.js";


const router = Router();


router.post("/", regiterUser);

router.post("/login", loginUser);

router.get("/", authenticateUser, logoutUser);

router.put("/", authenticateUser, updateUserDetails);

router.delete("/", authenticateUser, softDeleteUser);

export default router;