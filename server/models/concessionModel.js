import mongoose from "mongoose";

const concessionSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    concessionType: {
        type: String,
        required: true
    },
    concessionAmount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Concession = mongoose.model("Concession", concessionSchema);

export default Concession;