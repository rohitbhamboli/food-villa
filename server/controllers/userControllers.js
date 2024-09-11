import User from "../models/userModel.js";
import { uploadCloudinary } from "../utils/cloudinary.js";

const userRegistration = async (req, res) => {
  try {
    const { name, email, phone, password, cpassword } = req.body;
    const avatar = req.file;

    if (password !== cpassword) {
      return res.status(500).json({ message: "Passwords did not match" });
    }

    const myUpload = uploadCloudinary(avatar.path, "avatars");
    if (!myUpload) {
      return res.status(500).json({ message: "Error on avatar Upload" });
    }

    const newUser = await User.create({
      name,
      email,
      phone,
      password,
      avatar: myUpload.url,
    });
    return res.status(201).json({ message: "Registration Success", newUser });
  } catch (error) {
    return res.status(500).json({ message: "Error in registration", error });
  }
};

export { userRegistration };
