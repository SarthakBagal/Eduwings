import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    studentId: { type: String, required: true, trim: true },
    studentName: { type: String, required: true, trim: true },
    program: { type: String, trim: true },
    semester: { type: String, trim: true },
    session: { type: String, trim: true },
    category: { type: String, trim: true },
    section: { type: String, trim: true }
}, { timestamps: true });

const Section = mongoose.model("Section", sectionSchema);
export default Section;