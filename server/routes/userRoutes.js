import express from "express";
const router = express.Router();
import { upload } from "../middleware/multer.js";
import { isAuthenticatedUser } from "../middleware/auth.js";
import {
  sendOtp,
  verifyOtpAndRegister,
  getUsers,
  userLogin,
  userLogout,
  getUserProfile,
} from "../controllers/userControllers.js";

router.get("/me", isAuthenticatedUser, getUserProfile);
router.get("/getusers", getUsers);

router.post("/send-otp", sendOtp);
router.post(
  "/verify-otp-and-register",
  upload.single("avatar"),
  verifyOtpAndRegister
);
router.post("/login", userLogin);
router.get("/logout", userLogout);

export default router;
