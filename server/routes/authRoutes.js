import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { body } from "express-validator";
import { validate } from "../middleware/validateMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.post("/register",  [ body("name").notEmpty().withMessage("Name is required"), body("email").isEmail().withMessage("Valid email is required"), body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),validate,],register);

router.post("/login",  [ body("name").notEmpty().withMessage("Name is required"), body("password").notEmpty() .withMessage("Password is required"), validate, ], login);

router.post("/logout", logout);


export default router;
