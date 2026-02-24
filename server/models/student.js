const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    rollNo: {
      type: String,
      required: true,
      unique: true
    },
    class: {
      type: String,
      required: true
    },
    section: String,
    parentName: String,
    parentContact: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
