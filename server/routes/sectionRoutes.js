import express from "express";
import { getSections, insertSection, deleteSection } from "../controllers/sectionController.js";

const router = express.Router();

router.get("/", getSections);
router.post("/", insertSection);
router.delete("/:id", deleteSection);

export default router;