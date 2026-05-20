import express from "express"
import {createUser,getUsers,updateUser, deleteUser} from "../controllers/createUserController.js"

const router = express.Router()


router.post("/create-user",createUser)

router.get("/users",getUsers)

router.put("/users/:id",updateUser)    // Edit

router.delete("/users/:id",deleteUser)    // Delete


export default router

