import mongoose from "mongoose";

const otherFeesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  feesType: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  }
}, { timestamps: true });

const OtherFees = mongoose.model("OtherFees", otherFeesSchema);

export default OtherFees;
