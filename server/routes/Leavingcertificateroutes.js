import express from "express"
import {
  createLeavingCertificate,
  getLeavingCertificates,
  getLeavingCertificateById,
  updateLeavingCertificate,
  deleteLeavingCertificate
} from "../controllers/leavingCertificateController.js"
 
const router = express.Router()
 
// POST   /api/leaving-certificate        → submit form
// GET    /api/leaving-certificate        → get all (supports ?session=&studentName= filters)
// GET    /api/leaving-certificate/:id    → get one
// PUT    /api/leaving-certificate/:id    → edit one
// DELETE /api/leaving-certificate/:id   → delete one
 
router.post("/leaving-certificate",       createLeavingCertificate)
router.get("/leaving-certificate",        getLeavingCertificates)
router.get("/leaving-certificate/:id",    getLeavingCertificateById)
router.put("/leaving-certificate/:id",    updateLeavingCertificate)
router.delete("/leaving-certificate/:id", deleteLeavingCertificate)
 
export default router