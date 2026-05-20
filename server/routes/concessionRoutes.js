import express from "express";
import { getAllConcessions, addConcession } from "../controllers/concessionController.js";

const router = express.Router();

router.get("/", getAllConcessions);
router.post("/", addConcession);

export default router;