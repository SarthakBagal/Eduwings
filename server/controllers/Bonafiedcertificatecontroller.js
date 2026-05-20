import BonafiedCertificate from "../models/BonafiedCertificate.js"

// ── CREATE ────────────────────────────────────────────────────
export const createBonafiedCertificate = async (req, res) => {
  try {
    const {
      studentName, regId, date,
      className, session, category, semester
    } = req.body

    if (!studentName || !regId || !date || !className || !session || !category || !semester) {
      return res.status(400).json({ message: "Please fill all required fields." })
    }

    const certificate = new BonafiedCertificate({
      studentName, regId, date,
      className, session, category, semester
    })

    await certificate.save()
    res.status(201).json({ message: "Bonafied Certificate submitted successfully." })

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Certificate with this Reg. ID already exists." })
    }
    res.status(500).json({ message: error.message })
  }
}

// ── GET ALL with filters ──────────────────────────────────────
// Supports: ?studentName=&regId=&session=&category=&semester=&className=
export const getBonafiedCertificates = async (req, res) => {
  try {
    const { studentName, regId, session, category, semester, className } = req.query

    const filter = {}

    if (studentName) filter.studentName = { $regex: studentName, $options: "i" }
    if (regId)       filter.regId       = { $regex: regId,       $options: "i" }
    if (session)     filter.session     = session
    if (category)    filter.category    = category
    if (semester)    filter.semester    = semester
    if (className)   filter.className   = className

    const certificates = await BonafiedCertificate.find(filter).sort({ createdAt: -1 })
    res.json(certificates)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ── GET SINGLE BY ID ──────────────────────────────────────────
export const getBonafiedCertificateById = async (req, res) => {
  try {
    const certificate = await BonafiedCertificate.findById(req.params.id)
    if (!certificate) return res.status(404).json({ message: "Certificate not found." })
    res.json(certificate)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ── UPDATE ────────────────────────────────────────────────────
export const updateBonafiedCertificate = async (req, res) => {
  try {
    const certificate = await BonafiedCertificate.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    )
    if (!certificate) return res.status(404).json({ message: "Certificate not found." })
    res.json({ message: "Certificate updated successfully.", certificate })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Certificate with this Reg. ID already exists." })
    }
    res.status(500).json({ message: error.message })
  }
}

// ── DELETE ────────────────────────────────────────────────────
export const deleteBonafiedCertificate = async (req, res) => {
  try {
    const certificate = await BonafiedCertificate.findByIdAndDelete(req.params.id)
    if (!certificate) return res.status(404).json({ message: "Certificate not found." })
    res.json({ message: "Certificate deleted successfully." })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}