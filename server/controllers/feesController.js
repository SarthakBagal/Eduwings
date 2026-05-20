import Fees from "../models/feesModel.js";

/* Add Fees */

export const addFees = async(req,res)=>{

try{

const newFees = new Fees(req.body)

await newFees.save()

res.status(201).json({
success:true,
message:"Fees added successfully",
data:newFees
})

}catch(error){

res.status(500).json({
success:false,
message:error.message
})

}

}


/* Get All Fees */

export const getAllFees = async(req,res)=>{

try{

const fees = await Fees.find()

res.status(200).json(fees)

}catch(error){

res.status(500).json({
message:error.message
})

}

}


/* Get Single Student Fees */

export const getStudentFees = async(req,res)=>{

try{

const fees = await Fees.findById(req.params.id)

res.status(200).json(fees)

}catch(error){

res.status(500).json({
message:error.message
})

}

}