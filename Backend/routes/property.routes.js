import { Router } from "express";
import { addProperty, agentProperty, allproperties, deleteproperty, getproperty, searchproperty, updateproperty } from "../controllers/property.controller.js";

const propertyRouter = Router();

propertyRouter.get("/agent", agentProperty)
propertyRouter.get('/all', allproperties)

propertyRouter.post("/", addProperty)
propertyRouter.get("/search", searchproperty)
propertyRouter.get('/:id', getproperty);
propertyRouter.put('/:id', updateproperty);
propertyRouter.delete('/:id', deleteproperty);


export default propertyRouter;