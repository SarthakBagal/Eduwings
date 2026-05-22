import StudentCategory from "../models/studentCategoryModel.js";

export const getAllCategories = async (req, res) => {
    try {
        const data = await StudentCategory.find().sort({ createdAt: -1 });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addCategory = async (req, res) => {
    try {
        const newData = await StudentCategory.create(req.body);
        res.status(201).json({ message: "Saved successfully", data: newData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};