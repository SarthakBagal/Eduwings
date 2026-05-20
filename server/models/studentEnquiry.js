import mongoose from "mongoose";

const studentEnquirySchema = new mongoose.Schema({

date:{
type:String,
required:true
},

enquiryNo:{
type:Number,
required:true
},

section:String,

category:String,

title:String,

firstName:{
type:String,
required:true
},

middleName:String,

lastName:{
type:String,
required:true
},

program:String,

semester:String,

session:String,

contact:String,

address:String,

school:String,

landmark:String,

percentage:Number,

medium:String,

reference:String

},{timestamps:true});

const StudentEnquiry = mongoose.model("StudentEnquiry",studentEnquirySchema);

export default StudentEnquiry;