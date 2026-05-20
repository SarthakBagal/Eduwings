import mongoose from "mongoose";

const createUserSchema = new mongoose.Schema({

  userType:{
    type:String,
    required:true
  },

  username:{
    type:String,
    required:true,
    unique:true
  },

  password:{
    type:String,
    required:true
  }, // hashed (for login)

  plainPassword:{ 
    type: String, 
    required: true 
  },  // plain (for display only)

  permissions:[
    {
      type:String
    }
  ]

},{timestamps:true})

export default mongoose.model("createUser",createUserSchema)
