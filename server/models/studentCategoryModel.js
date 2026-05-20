import mongoose from "mongoose";

const studentCategorySchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    currentCategory: {
        type: String,
        required: true
    },
    newCategory: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, { timestamps: true });

const StudentCategory = mongoose.model("StudentCategory", studentCategorySchema);

export default StudentCategory;