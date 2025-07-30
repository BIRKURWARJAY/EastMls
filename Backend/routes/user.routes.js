import { Router } from "express";
import { authenticateUser } from "../middlewares/auth";
import { getUserDetails, getUserDetailsById } from "../controllers/user.controller";

const router = Router();

router.get("/", authenticateUser, getUserDetails);

router.post("/:id", authenticateUser, getUserDetailsById);