import { Router } from "express";
import { getAgent, getAllAgents, searchAgent, updateAgent } from "../controllers/agent.controller.js";
import { authenticateUser } from "../middlewares/auth.js";


const router = Router();

router.get("/all", authenticateUser, getAllAgents());
router.get("/search", authenticateUser, searchAgent);

router.get("/", authenticateUser, getAgent());

router.put("/", authenticateUser, updateAgent());

export default router;