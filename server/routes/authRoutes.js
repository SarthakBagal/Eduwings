import express from "express";
import { register, login } from "../controllers/authController.js";
import { body } from "express-validator";
import { validate } from "../middleware/validateMiddleware.js";
const router = express.Router();

router.post("/register",  [ body("name").notEmpty().withMessage("Name is required"), body("email").isEmail().withMessage("Valid email is required"), body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),validate,],register);

router.post("/login",  [ body("name").notEmpty().withMessage("Name is required"), body("password").notEmpty() .withMessage("Password is required"), validate, ], login);

export default router;
