import Course from "../models/courses.js";

export const isCourseOwner = async (req, res, next) => {
  const course = await Course.findById(req.params.courseId);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  if (course.instructor.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not course owner" });
  }

  next();
};
