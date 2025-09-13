import User from "../models/userModel.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import bcrypt from "bcryptjs"; // Import bcrypt for hashing OTPs
import sendEmail from "../utils/sendEmail.js"; // Import sendEmail utility

// Helper function to generate a random 6-digit OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Helper function to hash OTP
const hashOtp = async (otp) => {
  return await bcrypt.hash(otp, 10);
};

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    // Generate Email OTP
    const emailOtp = generateOtp();
    const hashedEmailOtp = await hashOtp(emailOtp);
    const otpExpire = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

    // Create a temporary user object to store OTP
    const tempUser = {
      emailOtp: hashedEmailOtp,
      emailOtpExpire: otpExpire,
    };

    // Send Email OTP
    const message = `Your Food Villa email verification OTP is ${emailOtp}. It is valid for 10 minutes.`;
    try {
      await sendEmail({
        email: email,
        subject: "Food Villa Email Verification OTP",
        message,
      });
      res.status(200).json({
        success: true,
        message: `Email verification OTP sent to ${email}. Please verify your email.`,
        tempUser,
      });
    } catch (emailError) {
      return res.status(500).json({
        message: "Error sending email verification OTP. Please try again.",
        error: emailError.message,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in sending OTP", error: error.message });
  }
};

const verifyOtpAndRegister = async (req, res) => {
  try {
    const { name, email, phone, password, cpassword, otp, tempUser } = req.body;
    console.log(req.body);
    const avatar = req.file;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    if (password !== cpassword) {
      return res.status(400).json({ message: "Passwords did not match" });
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

    // Verify OTP
    const parsedTempUser = JSON.parse(tempUser);
    const isOtpMatched = await bcrypt.compare(otp, parsedTempUser.emailOtp);

    if (!isOtpMatched || parsedTempUser.emailOtpExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired email OTP." });
    }

    // Create user
    user = await User.create({
      name,
      email,
      phone,
      password, // Password will be hashed by pre-save hook in userModel
      avatar: avatarUrl,
    });

    const token = user.getJWT();

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      })
      .json({ success: true, user, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in registration", error: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter email and password" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.getJWT();

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      })
      .json({ success: true, user, token });
  } catch (error) {
    return res.status(500).json({ message: "Error in login", error });
  }
};

const userLogout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};

const getUsers = async (req, res) => {
  const users = await User.find();
  return res.status(200).json({ users });
};

// Get user profile - for loading user data on the client-side
const getUserProfile = async (req, res) => {
  try {
    // The user ID is attached to the request object by the isAuthenticatedUser middleware
    const user = await User.findById(req.user.id);

    // Return the user data
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error getting user profile", error });
  }
};

export {
  sendOtp,
  verifyOtpAndRegister,
  getUsers,
  userLogin,
  userLogout,
  getUserProfile,
};
