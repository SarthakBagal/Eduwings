const express = require("express")
const router = express.Router()
const Scholarship = require("../models/scholarshipModel")

// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await Scholarship.find()
    res.json(students)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST single student
router.post("/", async (req, res) => {
  try {
    const student = new Scholarship({
      name: req.body.name,
      category: req.body.category,
      reference: req.body.reference,
      submitted: req.body.submitted
    })
    const savedStudent = await student.save()
    res.json(savedStudent)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// UPDATE student (reference + submitted)
router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Scholarship.findByIdAndUpdate(
      req.params.id,
      {
        reference: req.body.reference,
        submitted: req.body.submitted
      },
      { new: true }
    )
    res.json(updatedStudent)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
