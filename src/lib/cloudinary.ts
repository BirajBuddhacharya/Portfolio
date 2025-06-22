// src/lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});
export default cloudinary;

// functions to upload and delete images from Cloudinary
export async function upload(file: File) {
    // Convert the File object to a Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Convert the Buffer to a base64 string and create a data URI
    const base64 = buffer.toString('base64');
    const dataUri = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
        folder: 'portfolio', // Optional folder name in Cloudinary
    });

    return result;
}

export function destroyImage(publicId: string) {
  return cloudinary.uploader.destroy(publicId)
    .then(result => {
      console.log(`Deleted image with public ID: ${publicId} from Cloudinary`);
      return result;
    })
    .catch(error => {
      console.error('Error deleting image from Cloudinary:', error);
      throw error;
    });
}