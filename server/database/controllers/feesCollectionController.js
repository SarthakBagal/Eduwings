import FeesCollection from "../models/feesCollectionModel.js";

/* ================= ADD (SINGLE + BULK) ================= */
export const addFeesCollection = async (req, res) => {
  try {

    //  BULK INSERT
    if (Array.isArray(req.body)) {

      const formattedData = req.body.map(item => {
        const paid = item.paidAmount || 0;
        const total = item.totalFees;

        const due = total - paid;
        const status = due === 0 ? "Paid" : "Pending";

        return {
          ...item,
          paidAmount: paid,
          dueAmount: due,
          status
        };
      });

      const data = await FeesCollection.insertMany(formattedData);
      return res.status(201).json(data);
    }

    //  SINGLE INSERT
    const { totalFees, paidAmount = 0 } = req.body;

    const dueAmount = totalFees - paidAmount;
    const status = dueAmount === 0 ? "Paid" : "Pending";

    const newData = new FeesCollection({
      ...req.body,
      paidAmount,
      dueAmount,
      status
    });

    await newData.save();

    res.status(201).json(newData);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= GET ALL ================= */
export const getAllFeesCollection = async (req, res) => {
  try {
    const data = await FeesCollection.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= GET SINGLE ================= */
export const getSingleFeesCollection = async (req, res) => {
  try {
    const data = await FeesCollection.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= MAIN LOGIC ================= */
export const updateFeesCollection = async (req, res) => {
  try {

    const { paidAmount } = req.body;

    //  Get existing data
    const existing = await FeesCollection.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({ message: "Student not found" });
    }

    const totalFees = existing.totalFees;

    //  MAIN LOGIC
    const dueAmount = totalFees - paidAmount;
    const status = dueAmount === 0 ? "Paid" : "Pending";

    // UPDATE DB
    const updated = await FeesCollection.findByIdAndUpdate(
      req.params.id,
      {
        paidAmount,
        dueAmount,
        status
      },
      { returnDocument: 'after' }
    );

    res.status(200).json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= DELETE ================= */
export const deleteFeesCollection = async (req, res) => {
  try {

    const deleted = await FeesCollection.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};