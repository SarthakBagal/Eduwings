import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import {
  getDashboardStats,
  getAllUsers,
  toggleUserStatus,
  promoteToAdmin
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard", protect, authorize("admin"), getDashboardStats);
router.get("/users", protect, authorize("admin"), getAllUsers);
router.put("/users/:id/status", protect, authorize("admin"), toggleUserStatus);
router.put("/users/:id/promote", protect, authorize("admin"), promoteToAdmin);

export default router;
