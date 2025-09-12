import express from "express";
const router = express.Router();
import { upload } from "../middleware/multer.js";
import { isAuthenticatedUser } from "../middleware/auth.js";
import { userRegistration, getUsers, userLogin, userLogout, getUserProfile, verifyEmailOtp } from "../controllers/userControllers.js";

router.get("/me", isAuthenticatedUser, getUserProfile);
router.get("/getusers", getUsers);

router.post("/register", upload.single("avatar"), userRegistration);
router.post("/login", userLogin);
router.post("/verify-email-otp", verifyEmailOtp); // Route for email OTP verification
router.get("/logout", userLogout);

export default router;
