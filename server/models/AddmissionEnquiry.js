import mongoose from "mongoose";

const AddmissionEnquirySchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: false,
      trim: true
    },

    enquiryNo: {
      type: String,
      required: false
    },

    fromDate: {
      type: Date,
      required: false
    },

    toDate: {
      type: Date,
      required: false
    },

    session: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
);

const AddmissionEnquiry = mongoose.model(
  "AddmissionEnquirySchema",
  AddmissionEnquirySchema
);

export default AddmissionEnquiry;