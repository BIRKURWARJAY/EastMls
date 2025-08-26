import { Router } from "express";
import { getAgent, getAllAgents, searchAgent, updateAgent } from "../controllers/agent.controller";
import { authenticateUser } from "../middlewares/auth";
import { getAgentDetailById } from "../controllers/agent.controller";


const router = Router();

router.get("/all", authenticateUser, getAllAgents());
router.get("/search", authenticateUser, searchAgent);

router.get("/", authenticateUser, getAgent());

router.get("/:id", authenticateUser, getAgentDetailById());


router.put("/", authenticateUser, updateAgent());

export default router;