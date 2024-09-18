import express from "express";
const router = express.Router();
import { upload } from "../middleware/multer.js";
import { userRegistration, getUsers } from "../controllers/userControllers.js";

// router.get("/profile", getUserProfile);
router.get("/getusers", getUsers);

router.post("/register", upload.single("avatar"), userRegistration);
// router.post("/login", userLogin);

export default router;
