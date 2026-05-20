import express from "express";
import { addProspectus, searchProspectus } from "../controllers/prospectusController.js";

const router = express.Router();

// SAVE DATA
router.post("/", addProspectus);

// SEARCH DATA
router.get("/search", searchProspectus);

export default router;