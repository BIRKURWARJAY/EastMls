import cloudinary from "cloudinary";



export async function uploadOnCloudinary(filePath) {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET
    });

    if (!filePath) return null;
    
    const upload = await cloudinary.v2.uploader.upload(filePath);

    if (!upload) return null;
    return upload?.url;
  } catch (error) {
    console.log(error);
    return null
  }
}