import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadCloudinary = async function (file, folder) {
  // if(!file){
  //     res.status()
  // }
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      eager: [
        {
          width: 500,
          height: 500,
          aspect_ratio: 1.0,
          crop: scale,
        },
      ],
    });

    return result;
  } catch (error) {
    res.status(500).json({ message: "Error from Cloudinary", error });
  }
};

export { uploadCloudinary };
