import { User } from "../models/userModel.js";
import { uploadCloudinary } from "../utils/cloudinary.js";

exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, cpassword } = req.body;
    const avatar = req.file;

    const myUpload = uploadCloudinary(avatar.path, "avatars");
    if(!myUpload){
        res.status(500).
    }
  } catch (error) {}
};
