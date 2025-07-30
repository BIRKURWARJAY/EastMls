import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import propertyRouter from "./routes/property.routes.js";


const app = express();

configDotenv();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use("/property", propertyRouter);

app.listen(3000, () => {
  console.log(`server is running on localhost:3000`)
})