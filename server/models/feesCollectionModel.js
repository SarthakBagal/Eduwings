import mongoose from "mongoose";

const feesCollectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  totalFees: {
    type: Number,
    required: true
  },

  paidAmount: {
    type: Number,
    default: 0
  },

  dueAmount: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: ["Paid", "Pending"],
    default: "Pending"
  }

}, { timestamps: true });


// ✅ AUTO CALCULATE BEFORE SAVE
feesCollectionSchema.pre("save", function(next) {
  this.dueAmount = this.totalFees - this.paidAmount;
  this.status = this.dueAmount === 0 ? "Paid" : "Pending";
  next();
});

const FeesCollection = mongoose.model("FeesCollection", feesCollectionSchema);

export default FeesCollection;



