import User from "../models/createUser.js"
import bcrypt from "bcryptjs"


// CREATE USER
export const createUser = async(req,res)=>{

try{

const {userType,username,password,confirmPassword,permissions} = req.body

 if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" })
    }

const hashedPassword = await bcrypt.hash(password,10)

const user = new User({
userType,
username,
password:hashedPassword,    // used for login
plainPassword: password,   // used for display in permission panel
permissions
})

await user.save()

res.json({message:"User Created Successfully"})

} catch (error) {
    if (error.code === 11000)
      return res.status(400).json({ message: "Username already exists" })
    res.status(500).json({ message: error.message })
  }
}


// GET ALL USERS

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password") // hide hashed, keep plainPassword
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const { userType, username, permissions } = req.body
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { userType, username, permissions },
      { new: true }
    )
    res.json({ message: "User updated successfully", user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: "User deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}