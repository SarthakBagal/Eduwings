import express from "express";
import {
  createEnquiryAdmin,
  getAllStudentEnquiries
} from "../controllers/studentEnquiryController.js";


const router = express.Router();

router.post("/", createEnquiryAdmin);
router.get("/", getAllStudentEnquiries);

export default router;