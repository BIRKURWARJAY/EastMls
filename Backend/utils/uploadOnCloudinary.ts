import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_KEY!,
  api_secret: process.env.CLOUDINARY_SECRET!,
});

export async function uploadOnCloudinary(filePath: string): Promise<string | null> {
  try {
    if (!filePath) return null;

    const upload = await cloudinary.uploader.upload(filePath);
    return upload?.url ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
