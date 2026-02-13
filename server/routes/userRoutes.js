import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMe, updateMe } from "../controllers/userController.js";
import path from "path";

const router = express.Router();

router.get("/profile", protect, getMe);
router.put("/profile", protect, updateMe);

router.get("/dashboard", protect, (req, res) => {
  res.sendFile(
    path.join(__dirname, "../views/dashboard.html")
  );
});

export default router;

