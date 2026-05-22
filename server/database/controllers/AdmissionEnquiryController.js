import StudentEnquiry from "../models/studentEnquiry.js"

// ── CREATE ────────────────────────────────────────────────────
export const createEnquiry = async (req, res) => {
  try {
    const enquiry  = new StudentEnquiry(req.body)
    const savedData = await enquiry.save()
    res.status(201).json(savedData)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ── GET ALL ───────────────────────────────────────────────────
export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await StudentEnquiry.find().sort({ createdAt: -1 })
    res.json({ success: true, data: enquiries })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// ── SEARCH with filters ───────────────────────────────────────
// Supports: ?name=&enquiryNo=&fromDate=&toDate=&session=
export const searchEnquiries = async (req, res) => {
  try {
    const { name, enquiryNo, fromDate, toDate, session } = req.query

    const filter = {}

    // Partial match on firstName, middleName or lastName
    if (name) {
      filter.$or = [
        { firstName:  { $regex: name, $options: "i" } },
        { middleName: { $regex: name, $options: "i" } },
        { lastName:   { $regex: name, $options: "i" } }
      ]
    }

    // Exact enquiry number
    if (enquiryNo) filter.enquiryNo = Number(enquiryNo)

    // Date range (date is stored as String "YYYY-MM-DD" in model)
    if (fromDate && toDate) {
      filter.date = { $gte: fromDate, $lte: toDate }
    } else if (fromDate) {
      filter.date = { $gte: fromDate }
    } else if (toDate) {
      filter.date = { $lte: toDate }
    }

    // Session filter
    if (session) filter.session = session

    const data = await StudentEnquiry.find(filter).sort({ createdAt: -1 })

    res.json({ success: true, data })

  } catch (error) {
    console.error("Search error:", error)
    res.status(500).json({ success: false, message: "Search failed" })
  }
}

// ── DELETE ────────────────────────────────────────────────────
export const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await StudentEnquiry.findByIdAndDelete(req.params.id)
    if (!enquiry) return res.status(404).json({ message: "Enquiry not found." })
    res.json({ message: "Enquiry deleted." })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}