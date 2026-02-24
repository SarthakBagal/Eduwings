import multer from "multer";
import path from "path";

// Storage config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.mimetype.startsWith("video")) {
      cb(null, "uploads/videos");
    } else {
      cb(null, "uploads/images");
    }
  },
  filename(req, file, cb) {
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
    );
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "video/mp4",
    "video/mkv",
    "video/webm"
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

// Upload middleware
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 500 // 500MB (videos)
  }
});
