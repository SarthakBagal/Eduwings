import express from "express"
import {
  createBonafiedCertificate,
  getBonafiedCertificates,
  getBonafiedCertificateById,
  updateBonafiedCertificate,
  deleteBonafiedCertificate
} from "../controllers/bonafiedCertificateController.js"

const router = express.Router()

// POST   /api/bonafied-certificate        → submit form
// GET    /api/bonafied-certificate        → get all (supports filters)
// GET    /api/bonafied-certificate/:id    → get one (for edit prefill)
// PUT    /api/bonafied-certificate/:id    → update
// DELETE /api/bonafied-certificate/:id   → delete

router.post("/bonafied-certificate",       createBonafiedCertificate)
router.get("/bonafied-certificate",        getBonafiedCertificates)
router.get("/bonafied-certificate/:id",    getBonafiedCertificateById)
router.put("/bonafied-certificate/:id",    updateBonafiedCertificate)
router.delete("/bonafied-certificate/:id", deleteBonafiedCertificate)

export default router