import express from "express";
import {
  addFeesCollection,
  getAllFeesCollection,
  getSingleFeesCollection,
  updateFeesCollection,
  deleteFeesCollection
} from "../controllers/feesCollectionController.js";

const router = express.Router();

router.post("/", addFeesCollection);
router.get("/", getAllFeesCollection);
router.get("/:id", getSingleFeesCollection);
router.put("/:id", updateFeesCollection);
router.delete("/:id", deleteFeesCollection);

export default router;