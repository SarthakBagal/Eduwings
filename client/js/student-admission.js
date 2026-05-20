// ================= EVENT LISTENERS =================
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("admissionForm").addEventListener("submit", saveStudent);
});

// ================= SAVE STUDENT =================
function saveStudent(e) {
    e.preventDefault();

    const data = {
        studentId: document.getElementById("studentId").value.trim(),
        registrationNo: document.getElementById("registrationNo").value.trim(),
        enrollmentNo: document.getElementById("enrollmentNo").value.trim(),
        admissionDate: document.getElementById("admissionDate").value,
        studentName: document.getElementById("studentName").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        category: document.getElementById("category").value,
        address: document.getElementById("address").value.trim(),
        program: document.getElementById("program").value,
        semester: document.getElementById("semester").value,
        session: document.getElementById("session").value
    };

    if (!data.studentId || !data.studentName || !data.admissionDate) {
        alert("Please fill required fields!");
        return;
    }

    fetch("http://localhost:5000/api/studentAdmission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
        console.log("Saved:", response);
        alert("Student saved successfully!");
        document.getElementById("admissionForm").reset();
    })
    .catch(err => {
        console.error("Error:", err);
        alert("Error saving student!");
    });
}