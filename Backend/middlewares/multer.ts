import { Request } from "express";
import multer from "multer";
import path from "path";

const __dirname = path.dirname("public");
const folder = path.join(__dirname, "public");

const storage: multer.StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, folder);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  }
});

export const upload = multer({ storage });
