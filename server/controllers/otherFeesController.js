import OtherFees from "../models/otherFeesModel.js";

// ================= ADD DATA =================
export const addOtherFees = async (req, res) => {
  try {
    console.log("Incoming Data:", req.body); // 🔍 DEBUG

    const newData = await OtherFees.create(req.body);

    res.status(201).json({
      message: "Data saved successfully",
      data: newData
    });

  } catch (error) {
    console.error("Error saving:", error.message);

    res.status(500).json({
      message: "Failed to save data",
      error: error.message
    });
  }
};

// ================= GET ALL DATA =================
export const getAllOtherFees = async (req, res) => {
  try {
    const data = await OtherFees.find().sort({ createdAt: -1 });

    res.status(200).json(data);

  } catch (error) {
    console.error("Fetch Error:", error.message);

    res.status(500).json({
      message: "Failed to fetch data"
    });
  }
};
