import express from "express"
import {
  createEnquiry,
  getEnquiries,
  searchEnquiries,
  deleteEnquiry
} from "../controllers/AdmissionEnquiryController.js"

const router = express.Router()

// POST   /api/addmission-enquiries          → submit form
// GET    /api/addmission-enquiries          → get all
// GET    /api/addmission-enquiries/search   → search with filters
// DELETE /api/addmission-enquiries/:id      → delete

router.post("/",      createEnquiry)
router.get("/",       getEnquiries)
router.get("/search", searchEnquiries)
router.delete("/:id", deleteEnquiry)

export default router