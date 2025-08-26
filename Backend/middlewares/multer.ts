import multer from "multer";
import path from "path";
import { RequestWithUser } from "../types/express";

// Use project root/public instead of __dirname
const folder = path.join(process.cwd(), "public");

const storage: multer.StorageEngine = multer.diskStorage({
  destination: (req: RequestWithUser, file: Express.Multer.File, cb) => {
    cb(null, folder);
  },
  filename: (req: RequestWithUser, file: Express.Multer.File, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

export const upload = multer({ storage });
