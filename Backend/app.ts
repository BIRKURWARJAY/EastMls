import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import propertyRouter from "./routes/property.routes";
import connect from "./db/connect";
import authRouter from "./routes/auth.routes";
import { errorHandler } from "./utils/ErrorHandler";
import userRouter from "./routes/user.routes";
import agentRouter from "./routes/agent.routes";
import inquiryRouter from "./routes/inquiry.routes";
import cookieParser from "cookie-parser";


const app = express();

configDotenv();
connect()


app.use(cors({
  credentials: true,
  origin: "http://localhost:3000",
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({
  extended: true
}))
app.use(express.static("./public"));



app.use("/api/property", propertyRouter);
app.use("/api/inquiry", inquiryRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/agent", agentRouter);


app.use(errorHandler);

app.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

app.listen(5000, () => {
  console.log(`server is running on localhost:5000`)
})