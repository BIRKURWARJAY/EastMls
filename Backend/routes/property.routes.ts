import { Router } from "express";
import { addProperty, agentProperty, allproperties, deleteproperty, getproperty, searchproperty, updateproperty } from "../controllers/property.controller";
import { authenticateUser } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";

const propertyRouter = Router();

propertyRouter.get("/agent",authenticateUser, agentProperty)
propertyRouter.get('/all', authenticateUser, allproperties)

  propertyRouter.post("/", authenticateUser, upload.fields([
    {
      name: 'images[]',
      maxCount: 20
    },
    {
      name: 'videos[]',
      maxCount: 5
    }
  ]), addProperty)
  
propertyRouter.get("/search", searchproperty)
propertyRouter.get('/:id', authenticateUser, getproperty);
propertyRouter.put('/:id',authenticateUser, upload.fields([
  {
    name: 'images[]',
    maxCount: 20
  },
  {
    name: 'videos[]',
    maxCount: 5
  }
]), updateproperty);
propertyRouter.delete('/:id', deleteproperty);


export default propertyRouter;