import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMe, updateMe } from "../controllers/userController.js";

const router = express.Router();


router.get("/profile", protect, getMe);
router.put("/profile", protect, updateMe);


export default router;

