import express from "express";
const router = express.Router();
import {} from "../controllers/userControllers.js";

router.get("/profile", getUserProfile);
router.get("/allusers", getAllUsers);
router.post("/register", userRegistration);
router.post("/login", userLogin);

export default router;
