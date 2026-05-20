import mongoose from "mongoose"
 
const bonafiedCertificateSchema = new mongoose.Schema({
 
  studentName: { type: String, required: true },
  regId:       { type: String, required: true, unique: true },
  date:        { type: Date,   required: true },
  className:   { type: String, required: true },
  session:     { type: String, required: true },
  category:    { type: String, required: true },
  semester:    { type: String, required: true }
 
}, { timestamps: true })
 
export default mongoose.model("BonafiedCertificate", bonafiedCertificateSchema)