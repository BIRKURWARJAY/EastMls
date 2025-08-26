import multer from "multer";
import path from "path";
import { Request } from "express";

// Use project root/public instead of __dirname
const folder = path.join(process.cwd(), "public");

const storage: multer.StorageEngine = multer.diskStorage({
  destination: (req: any, file: Express.Multer.File, cb) => {
    cb(null, folder);
  },
  filename: (req: any, file: Express.Multer.File, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

export const upload = multer({ storage });
