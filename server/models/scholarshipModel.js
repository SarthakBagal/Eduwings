import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema({
  name: String,
  category: String,
  reference: String,
  submitted: Boolean
});

const Scholarship = mongoose.model("Scholarship", scholarshipSchema);

export default Scholarship;
