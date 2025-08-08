import multer from "multer";
import path from "path";

const __dirname = path.dirname("public");
const folder = path.join(__dirname, "public");


const storage = new multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  }
})


export const upload = multer({ storage });
