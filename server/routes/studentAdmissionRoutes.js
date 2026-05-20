import express from "express";
import {
    getStudents,
    saveStudent,
    deleteStudent
} from "../controllers/studentAdmissionController.js";

const router = express.Router();

router.get("/", getStudents);
router.post("/", saveStudent);
router.delete("/:id", deleteStudent);

export default router;