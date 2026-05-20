import BusFees from "../models/busFeesModel.js";

// ================= ADD (SINGLE + BULK) =================
export const addBusFees = async (req, res) => {
  try {

    // 🔥 BULK INSERT
    if (Array.isArray(req.body)) {

      const data = await BusFees.insertMany(req.body);

      return res.status(201).json(data);
    }

    // 🔥 SINGLE INSERT
    const data = await BusFees.create(req.body);

    res.status(201).json(data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};


// ================= GET ALL =================
export const getAllBusFees = async (req, res) => {
  try {
    const data = await BusFees.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};