const express = require("express");
const router = express.Router();

const {
  addStudent,
  getStudents,
  getStudentById
} = require("../controllers/studentController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// Admin only
router.post("/", auth, role("admin"), addStudent);

// Admin + Teacher
router.get("/", auth, role("admin", "teacher"), getStudents);

// Admin + Student
router.get("/:id", auth, getStudentById);

module.exports = router;
