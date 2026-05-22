import StudentAdmission from "../models/studentAdmissionModel.js";

// ================= GET ALL WITH FILTERS =================
export const getStudents = async (req, res) => {
    try {
        const {
            registrationNo,
            fromDate,
            toDate,
            studentId,
            studentName,
            program,
            semester,
            phone,
            address,
            category, 
            enrollmentNo,
            session
        } = req.query;

        let filter = {};

        if (registrationNo) filter.registrationNo = { $regex: registrationNo, $options: "i" };
        if (studentId) filter.studentId = { $regex: studentId, $options: "i" };
        if (studentName) filter.studentName = { $regex: studentName, $options: "i" };
        if (program) filter.program = program;
        if (semester) filter.semester = semester;
        if (phone) filter.phone = { $regex: phone, $options: "i" };
        if (address) filter.address = { $regex: address, $options: "i" };
        if (category) filter.category = category;
        if (enrollmentNo) filter.enrollmentNo = { $regex: enrollmentNo, $options: "i" };
        if (session) filter.session = session;

        if (fromDate && toDate) {
            filter.admissionDate = {
                $gte: new Date(fromDate),
                $lte: new Date(toDate)
            };
        }

        const data = await StudentAdmission.find(filter).sort({ createdAt: -1 });
        res.status(200).json(data);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error fetching students" });
    }
};

// ================= SAVE STUDENT =================
export const saveStudent = async (req, res) => {
    try {
        const data = await StudentAdmission.create(req.body);
        res.status(201).json({
            message: "Student saved successfully",
            data
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error saving student" });
    }
};

// ================= DELETE STUDENT =================
export const deleteStudent = async (req, res) => {
    try {
        const data = await StudentAdmission.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error deleting student" });
    }
};