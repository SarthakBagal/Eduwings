import LeavingCertificate from "../models/LeavingCertificate.js"

// ── CREATE ────────────────────────────────────────────────────
export const createLeavingCertificate = async (req, res) => {
  try {
    const {
      studentName, studentId, regNo, section,
      className, category, semester, contactNo,
      session, dischargeNo, dateOfLeaving,
      reason, remark, progress, conduct
    } = req.body

    if (!studentName || !regNo || !dischargeNo || !dateOfLeaving) {
      return res.status(400).json({ message: "Please fill all required fields." })
    }

    const certificate = new LeavingCertificate({
      studentName, studentId, regNo, section,
      className, category, semester, contactNo,
      session, dischargeNo, dateOfLeaving,
      reason, remark, progress, conduct
    })

    await certificate.save()
    res.status(201).json({ message: "Leaving Certificate submitted successfully." })

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Certificate with this Reg. No already exists." })
    }
    res.status(500).json({ message: error.message })
  }
}

// ── GET ALL with filters ──────────────────────────────────────
// Supports: ?studentName=&regNo=&session=&category=
export const getLeavingCertificates = async (req, res) => {
  try {
    const { studentName, regNo, session, category } = req.query

    const filter = {}

    if (studentName) filter.studentName = { $regex: studentName, $options: "i" }
    if (regNo)       filter.regNo       = { $regex: regNo,       $options: "i" }
    if (session)     filter.session     = session
    if (category)    filter.category    = category

    const certificates = await LeavingCertificate.find(filter).sort({ createdAt: -1 })
    res.json(certificates)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ── GET SINGLE BY ID ──────────────────────────────────────────
export const getLeavingCertificateById = async (req, res) => {
  try {
    const certificate = await LeavingCertificate.findById(req.params.id)
    if (!certificate) return res.status(404).json({ message: "Certificate not found." })
    res.json(certificate)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ── UPDATE ────────────────────────────────────────────────────
export const updateLeavingCertificate = async (req, res) => {
  try {
    const certificate = await LeavingCertificate.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    )
    if (!certificate) return res.status(404).json({ message: "Certificate not found." })
    res.json({ message: "Certificate updated successfully.", certificate })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Certificate with this Reg. No already exists." })
    }
    res.status(500).json({ message: error.message })
  }
}

// ── DELETE ────────────────────────────────────────────────────
export const deleteLeavingCertificate = async (req, res) => {
  try {
    const certificate = await LeavingCertificate.findByIdAndDelete(req.params.id)
    if (!certificate) return res.status(404).json({ message: "Certificate not found." })
    res.json({ message: "Certificate deleted successfully." })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}