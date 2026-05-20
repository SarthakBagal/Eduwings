// import express from "express";
// import { protect } from "../middleware/authMiddleware.js";
// import path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// const router = express.Router();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Protected Dashboard Route
// router.get("/dashboard", protect, (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "../clients/views/dashboard.html")
//   );
// });

// export default router;

import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/user.js";

const router = express.Router();

// GET LOGGED IN USER PROFILE
router.get("/profile", protect, async (req, res) => {
  try {

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;