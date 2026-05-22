const Student = require("../models/student");

// ADD STUDENT (Admin only)
exports.addStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json({
    success: true,
    message: "Student added successfully",
    student
  });
};

// GET ALL STUDENTS
exports.getStudents = async (req, res) => {
  const students = await Student.find().populate("user", "name email");
  res.json(students);
};

// GET SINGLE STUDENT
exports.getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
};
