import studentEnquiry from "../models/studentEnquiry.js";

export const createEnquiryAdmin = async (req,res)=>{

try{

const enquiry = new studentEnquiry(req.body);

await enquiry.save();

res.status(201).json({
success: true,    
message:"Enquiry saved successfully",
data:enquiry
});

}catch(error){

res.status(500).json({
success: false,    
message:"Server error",
error:error.message
});

}

};

import StudentEnquiry from "../models/studentEnquiry.js";

export const getAllStudentEnquiries = async (req, res) => {
  try {

    const enquiries = await StudentEnquiry.find();

    res.json({
      success: true,
      data: enquiries
    });

  } catch (error) {

    console.log(error);   // important for debugging

    res.status(500).json({
      success: false,
      message: "Error fetching student enquiries"
    });

  }
};


