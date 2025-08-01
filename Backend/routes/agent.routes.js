import { Router } from "express";
import { getAgent, getAllAgents, updateAgent } from "../controllers/agent.controller.js";
import { authenticateUser } from "../middlewares/auth.js";

const router = Router();

router.get("/", authenticateUser, getAllAgents());

router.get("/:id", authenticateUser, getAgent());

router.put("/", authenticateUser, updateAgent());

export default router;