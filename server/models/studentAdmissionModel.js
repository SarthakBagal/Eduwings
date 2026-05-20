import mongoose from "mongoose";

const studentAdmissionSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        trim: true
    },
    registrationNo: {
        type: String,
        trim: true
    },
    enrollmentNo: {
        type: String,
        trim: true
    },
    studentName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    program: {
        type: String,
        trim: true
    },
    semester: {
        type: String,
        trim: true
    },
    session: {
        type: String,
        trim: true
    },
    admissionDate: {
        type: Date
    }
}, { timestamps: true });

const StudentAdmission = mongoose.model("StudentAdmission", studentAdmissionSchema);

export default StudentAdmission;