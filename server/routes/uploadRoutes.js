import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.single("file"),
  (req, res) => {
    res.json({
      message: "File uploaded",
      file: req.file.filename
    });
  }
);

export default router;
