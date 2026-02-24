import express from "express";
import {
  enrollCourse,
  getMyEnrollments
} from "../controllers/enrollmentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { USER_ROLES } from "../utils/constants.js";

const router = express.Router();

router.post(
  "/:courseId",
  protect,
  authorize(USER_ROLES.STUDENT),
  enrollCourse
);

router.get(
  "/my",
  protect,
  authorize(USER_ROLES.STUDENT),
  getMyEnrollments
);

export default router;
