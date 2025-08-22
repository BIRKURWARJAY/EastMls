import { Router } from "express";
import { loginUser, logoutUser, regiterUser, softDeleteUser, updateUserDetails } from "../controllers/auth.controller";
import { authenticateUser } from "../middlewares/auth";
import autoRefreshToken from "../utils/autoRefreshToken";


const router = Router();

router.get("/refresh-token", autoRefreshToken);

router.post("/", regiterUser());

router.post("/login", loginUser());

router.get("/",authenticateUser, logoutUser());

router.put("/", authenticateUser, updateUserDetails());

router.delete("/", authenticateUser, softDeleteUser());

export default router;