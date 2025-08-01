import { Router } from "express";
import { loginUser, logoutUser, regiterUser, softDeleteUser, updateUserDetails } from "../controllers/auth.controller.js";
import { authenticateUser, restrictAuthUser } from "../middlewares/auth.js";
import autoRefreshToken from "../utils/autoRefreshToken.js";


const router = Router();

router.get("/refresh-token", autoRefreshToken);

router.post("/", restrictAuthUser, regiterUser());

router.post("/login", restrictAuthUser, loginUser());

router.get("/", authenticateUser, logoutUser());

router.put("/", authenticateUser, updateUserDetails());

router.delete("/", authenticateUser, softDeleteUser());

export default router;