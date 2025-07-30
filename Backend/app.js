import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import propertyRouter from "./routes/property.routes.js";
import authRouter from "./routes/auth.routes.js";
import { errorHandler } from "./utils/ErrorHandler.js";


const app = express();

configDotenv();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());


app.use("/property", propertyRouter);
app.use("/auth", authRouter);


app.use(errorHandler);

app.listen(5000, () => {
  console.log(`server is running on localhost:5000`)
})