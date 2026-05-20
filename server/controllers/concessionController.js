import Concession from "../models/concessionModel.js";

// GET all
export const getAllConcessions = async (req, res) => {
    try {
        const data = await Concession.find().sort({ createdAt: -1 });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST new
export const addConcession = async (req, res) => {
    try {
        const newData = await Concession.create(req.body);
        res.status(201).json({ message: "Saved successfully", data: newData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};