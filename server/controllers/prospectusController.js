import Prospectus from "../models/prospectusModel.js";

// ================= SAVE =================
export const addProspectus = async (req, res) => {
  try {
    const data = await Prospectus.create(req.body);

    res.status(201).json({
      message: "Saved successfully",
      data
    });

  } catch (error) {
    console.log(error.message);

    // Duplicate prospectusNo error
    if (error.code === 11000) {
      return res.status(400).json({ message: "Prospectus No already exists ❌" });
    }

    res.status(500).json({ message: "Error saving data" });
  }
};


// ================= SEARCH =================
export const searchProspectus = async (req, res) => {
  try {
    const { fromDate, toDate, category, program, semester, session } = req.query;

    let filter = {};

    // DATE FILTER
    if (fromDate && toDate) {
      filter.date = {
        $gte: fromDate,
        $lte: toDate
      };
    }

    // OTHER FILTERS
    if (category) filter.category = category;
    if (program) filter.program = program;
    if (semester) filter.semester = semester;
    if (session) filter.session = session;

    const data = await Prospectus.find(filter).sort({ createdAt: -1 });

    res.json(data);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching data" });
  }
};