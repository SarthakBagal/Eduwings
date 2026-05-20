import express from "express";
import {addFees,getAllFees,getStudentFees} from "../controllers/feesController.js";

const router = express.Router();

router.post("/add",addFees)

router.get("/all",getAllFees)

router.get("/:id",getStudentFees)

export default router