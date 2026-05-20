import express from "express";
import Scholarship from "../models/scholarshipModel.js";

const router = express.Router();

// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await Scholarship.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST single student
router.post("/", async (req, res) => {
  try {
    const student = new Scholarship({
      name: req.body.name,
      category: req.body.category,
      reference: req.body.reference,
      submitted: req.body.submitted
    });
    const savedStudent = await student.save();
    res.json(savedStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// BULK INSERT
router.post("/bulk", async (req, res) => {
  try {
    const students = await Scholarship.insertMany(req.body);
    res.status(201).json({ message: "Students inserted successfully", data: students });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE student
router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Scholarship.findByIdAndUpdate(
      req.params.id,
      {
        reference: req.body.reference,
        submitted: req.body.submitted
      },
      { new: true }
    );
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE student
router.delete("/:id", async (req, res) => {
  try {
    await Scholarship.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;