import { Router } from "express";
import { addProperty, agentProperty, allproperties, deleteproperty, getproperty, searchproperty, updateproperty } from "../controllers/property.controller.js";
import { authenticateUser } from "../middlewares/auth.js";

const propertyRouter = Router();

propertyRouter.get("/agent",authenticateUser, agentProperty)
propertyRouter.get('/all', allproperties)

propertyRouter.post("/", authenticateUser, addProperty)
propertyRouter.get("/search", searchproperty)
propertyRouter.get('/:id', getproperty);
propertyRouter.put('/:id', updateproperty);
propertyRouter.delete('/:id', deleteproperty);


export default propertyRouter;