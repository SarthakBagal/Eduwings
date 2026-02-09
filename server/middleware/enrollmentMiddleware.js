import Enrollment from "../models/enrollment.js";

export const isEnrolled = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user._id;

    const enrolled = await Enrollment.findOne({
      user: userId,
      course: courseId
    });

    if (!enrolled) {
      return res.status(403).json({
        message: "You are not enrolled in this course"
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
