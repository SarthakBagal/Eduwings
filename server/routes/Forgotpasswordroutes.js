import express from "express"
import {
  verifyUser,
  resetPassword
} from "../controllers/forgotPasswordController.js"

const router = express.Router()

// POST /api/forgot-password/verify   → check if email exists
// POST /api/forgot-password/reset    → reset the password

router.post("/forgot-password/verify", verifyUser)
router.post("/forgot-password/reset",  resetPassword)

export default router