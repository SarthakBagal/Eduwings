import mongoose from "mongoose";

const prospectusSchema = new mongoose.Schema({

  date: {
    type: Date,   // ✅ better than String for filtering
    required: true
  },

  prospectusNo: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  section: {
    type: String,
    trim: true
  },

  category: {
    type: String,
    trim: true
  },

  studentName: {
    type: String,
    required: true,
    trim: true
  },

  firstName: {
    type: String,
    trim: true
  },

  middleName: {
    type: String,
    trim: true
  },

  lastName: {
    type: String,
    trim: true
  },

  program: {
    type: String,
    trim: true
  },

  semester: {
    type: String,
    trim: true
  },

  session: {
    type: String,
    trim: true
  },

  contactNo: {
    type: String,
    trim: true
  },

  amount: {
    type: Number
  },

  medium: {
    type: String
  },

  percentage: {
    type: Number
  },

  school: {
    type: String
  },

  address: {
    type: String
  }

}, { timestamps: true });

const ProspectusSale = mongoose.model("ProspectusSale", prospectusSchema);

export default ProspectusSale;