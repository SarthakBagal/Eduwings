import mongoose from "mongoose";

const busFeesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  regNo: {
    type: String,
    required: true
  },
  session: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
}, { timestamps: true });

const BusFees = mongoose.model("BusFees", busFeesSchema);

export default BusFees;