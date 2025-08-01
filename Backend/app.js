import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import propertyRouter from "./routes/property.routes.js";
import connect from "./db/connect.js";
import authRouter from "./routes/auth.routes.js";
import { errorHandler } from "./utils/ErrorHandler.js";
import userRouter from "./routes/user.routes.js";
import autoRefreshToken from "./utils/autoRefreshToken.js";
import { authenticateUser } from "./middlewares/auth.js";
import inquiryRouter from "./routes/inquiry.routes.js";


const app = express();

configDotenv();
connect()
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

app.use(cookieParser());
app.use(express.json());
// app.get("/", authenticateUser)

app.use("/property", propertyRouter);
app.use("/inquiry", inquiryRouter);
app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);


app.use(errorHandler);

app.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

app.listen(5000, () => {
  console.log(`server is running on localhost:5000`)
})