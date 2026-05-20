import mongoose from "mongoose";

const feesSchema = new mongoose.Schema({
    studentName: String,
    studentId: String,
    course: String,
    feesType: String,   // scholarship, bus, other, collection
    amount: Number,
    status: String,     // Paid / Pending
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Fees", feesSchema);