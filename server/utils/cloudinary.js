import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadCloudinary = async (file, folder) => {
  if (!file) {
    console.log("No file provided");
    return null;
  }

  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      eager: [
        {
          width: 500,
          height: 500,
          crop: "fill",
          aspect_ratio: "1.0",
        },
      ],
    });
    console.log("File uploaded successfully.");
    fs.unlinkSync(file);
    return result;
  } catch (e) {
    console.log("Error while uploading to cloudinary", e);
    return null;
  }
};

export { uploadCloudinary };
