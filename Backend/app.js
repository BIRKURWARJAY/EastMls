import express from "express";
import cors from "cors";
import {userValidator} from "./validators/user.validator.js";
import { configDotenv } from "dotenv";
import connect from "./db/connect.js";


const app = express();

configDotenv();
connect()

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());


app.post("/", async(req, res) => {
 try {
   await userValidator.validate(req.body);
   return res.send("validated");
 } catch (error) {
  return res.send(error.errors)
 }
})

app.listen(3000, () => {
  console.log(`server is running on localhost:3000`)
})