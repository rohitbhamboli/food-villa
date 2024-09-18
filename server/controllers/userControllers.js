import User from "../models/userModel.js";
import { uploadCloudinary } from "../utils/cloudinary.js";

const userRegistration = async (req, res) => {
  try {
    const { name, email, phone, password, cpassword } = req.body;
    const avatar = req.file;

    if (password !== cpassword) {
      return res.status(500).json({ message: "Passwords did not match" });
    }

    let avatarUrl =
      "https://res.cloudinary.com/dejnglyee/image/upload/v1726296193/avatars/hs4x6jj1mhzgavqnpj2o.png";

    if (avatar) {
      const myUpload = await uploadCloudinary(avatar.path, "avatars");
      if (myUpload) {
        avatarUrl = myUpload.secure_url;
      } else {
        return res.status(500).json({ message: "Error on avatar upload" });
      }
    }

    const newUser = await User.create({
      name,
      email,
      phone,
      password,
      avatar: avatarUrl,
    });
    return res.status(201).json({ message: "Registration Success", newUser });
  } catch (error) {
    return res.status(500).json({ message: "Error in registration", error });
  }
};

const getUsers = async (req, res) => {
  const users = {
    name: "Rohit",
    email: "rs30328102@gmail.com",
    phone: 8930328102,
  };
  return res.status(200).json({ users });
};

export { userRegistration, getUsers };
