import express from "express";
import {
  addBusFees,
  getAllBusFees
} from "../controllers/busFeesController.js";

const router = express.Router();

router.post("/", addBusFees);
router.get("/", getAllBusFees);

export default router;