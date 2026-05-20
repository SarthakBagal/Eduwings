import mongoose from "mongoose"
 
const leavingCertificateSchema = new mongoose.Schema({
 
  studentName: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },
 
  regNo: {
    type: String,
    required: true,
    unique: true
  },
 
  session: {
    type: String,
    required: true
  },
 
  dischargeNo: {
    type: String,
    required: true,
     unique: true
  },
 
  dateOfLeaving: {
    type: Date,
    required: true
  },
 
  reason: {
    type: String,
    default: ""
  },
 
  remark: {
    type: String,
    default: ""
  },
 
  progress: {
    type: String,
    default: ""
  },
 
  conduct: {
    type: String,
    default: ""
  },
  contactNo: { 
    type: String, 
    required:true,
     unique: true
  },
  section: { 
    type: String, 
    default: "" 
  },
 
}, { timestamps: true })
 
export default mongoose.model("LeavingCertificate", leavingCertificateSchema)