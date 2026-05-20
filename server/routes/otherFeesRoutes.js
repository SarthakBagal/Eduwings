import express from "express";
import {
  addOtherFees,
  getAllOtherFees
} from "../controllers/otherFeesController.js";

const router = express.Router();

router.post("/", addOtherFees);   // ✅ IMPORTANT
router.get("/", getAllOtherFees);

export default router;