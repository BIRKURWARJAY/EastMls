import { Router } from "express";
import { addProperty, allproperties, deleteproperty, getproperty, searchproperty, updateproperty } from "../controllers/property.controller.js";

const propertyRouter = Router();

propertyRouter.get('/all', allproperties)

propertyRouter.post("/", addProperty)
propertyRouter.get("/search", searchproperty)
propertyRouter.get('/:id', getproperty);
propertyRouter.put('/:id', updateproperty);
propertyRouter.delete('/:id', deleteproperty);


export default propertyRouter;