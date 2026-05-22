import Section from "../models/sectionModel.js";

// GET all
export const getSections = async (req, res) => {
    try {
        const data = await Section.find().sort({ createdAt: -1 });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST insert
export const insertSection = async (req, res) => {
    try {
        const data = await Section.create(req.body);
        res.status(201).json({ message: "Section allocated successfully", data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE
export const deleteSection = async (req, res) => {
    try {
        await Section.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};