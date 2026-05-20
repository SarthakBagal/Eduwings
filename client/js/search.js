let allStudents = [];

// ================= EVENT LISTENERS =================
document.addEventListener("DOMContentLoaded", function () {

    // Init — show only Student Id field
    document.querySelectorAll(".search-field").forEach(field => {
        field.style.display = "none";
    });
    const defaultField = document.getElementById("field-studentId");
    if (defaultField) defaultField.style.display = "block";

    document.getElementById("showBtn").addEventListener("click", loadStudents);
    document.getElementById("copyBtn").addEventListener("click", copyTable);
    document.getElementById("csvBtn").addEventListener("click", exportCSV);
    document.getElementById("excelBtn").addEventListener("click", exportExcel);
    document.getElementById("printBtn").addEventListener("click", printTable);
    document.getElementById("tableSearch").addEventListener("input", filterTable);

    // Column toggle
    document.querySelectorAll(".col-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            document.querySelectorAll(".col-btn").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            document.querySelectorAll(".search-field").forEach(field => {
                field.style.display = "none";
            });
            const col = this.getAttribute("data-col");
            const field = document.getElementById(`field-${col}`);
            if (field) field.style.display = "block";
        });
    });
});

// ================= LOAD STUDENTS =================
function loadStudents() {
    const regNo = document.getElementById("searchRegNo").value.trim();
    const fromDate = document.getElementById("fromDate").value;
    const toDate = document.getElementById("toDate").value;

    const activeBtn = document.querySelector(".col-btn.active");
    const activeCol = activeBtn ? activeBtn.getAttribute("data-col") : null;

    const params = new URLSearchParams();

    if (regNo) params.append("registrationNo", regNo);
    if (fromDate) params.append("fromDate", fromDate);
    if (toDate) params.append("toDate", toDate);

    if (activeCol === "studentId") {
        const val = document.getElementById("searchStudentId").value.trim();
        if (val) params.append("studentId", val);
    } else if (activeCol === "name") {
        const val = document.getElementById("searchName").value.trim();
        if (val) params.append("studentName", val);
    } else if (activeCol === "program") {
        const val = document.getElementById("searchProgram").value;
        if (val) params.append("program", val);
    } else if (activeCol === "semester") {
        const val = document.getElementById("searchSemester").value;
        if (val) params.append("semester", val);
    } else if (activeCol === "phone") {
        const val = document.getElementById("searchPhone").value.trim();
        if (val) params.append("phone", val);
    } else if (activeCol === "address") {
        const val = document.getElementById("searchAddress").value.trim();
        if (val) params.append("address", val);
    } else if (activeCol === "category") {
        const val = document.getElementById("searchCategory").value;
        if (val) params.append("category", val);
    } else if (activeCol === "enrollmentNo") {
        const val = document.getElementById("searchEnrollmentNo").value.trim();
        if (val) params.append("enrollmentNo", val);
    } else if (activeCol === "session") {
        const val = document.getElementById("searchSession").value;
        if (val) params.append("session", val);
    }

    fetch(`http://localhost:5000/api/studentAdmission?${params.toString()}`)
        .then(res => res.json())
        .then(data => {
            allStudents = data;
            renderTable(data);
            document.getElementById("studentsSection").style.display = "block";
        })
        .catch(err => {
            console.error("Error:", err);
            alert("Error fetching students!");
        });
}

// ================= RENDER TABLE =================
function renderTable(data) {
    const tbody = document.getElementById("studentsTableBody");
    tbody.innerHTML = "";

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="10">No students found</td></tr>`;
        return;
    }

    data.forEach((item, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.studentId || "-"}</td>
                <td>${item.studentName}</td>
                <td>${item.semester || "-"}</td>
                <td>${item.program || "-"}</td>
                <td>${item.category || "-"}</td>
                <td>${item.phone || "-"}</td>
                <td>${item.admissionDate ? new Date(item.admissionDate).toLocaleDateString("en-IN") : "-"}</td>
                <td>${item.session || "-"}</td>
                <td>
                    <button class="delete-btn" data-id="${item._id}">
                        <i class="fa fa-times" style="color:red;"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            deleteStudent(this.getAttribute("data-id"));
        });
    });
}

// ================= DELETE =================
function deleteStudent(id) {
    if (!confirm("Are you sure you want to delete this student?")) return;

    fetch(`http://localhost:5000/api/studentAdmission/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(() => loadStudents())
    .catch(err => console.error("Error:", err));
}

// ================= FILTER TABLE =================
function filterTable() {
    const query = document.getElementById("tableSearch").value.toLowerCase();
    const filtered = allStudents.filter(item =>
        Object.values(item).some(val =>
            String(val).toLowerCase().includes(query)
        )
    );
    renderTable(filtered);
}

// ================= COPY =================
function copyTable() {
    const rows = document.querySelectorAll("#studentsTable tr");
    let text = "";
    rows.forEach(row => {
        const cells = row.querySelectorAll("th, td");
        text += Array.from(cells).map(c => c.innerText).join("\t") + "\n";
    });
    navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
}

// ================= CSV =================
function exportCSV() {
    const rows = document.querySelectorAll("#studentsTable tr");
    let csv = "";
    rows.forEach(row => {
        const cells = row.querySelectorAll("th, td");
        csv += Array.from(cells).map(c => `"${c.innerText}"`).join(",") + "\n";
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
}

// ================= EXCEL =================
function exportExcel() {
    const rows = document.querySelectorAll("#studentsTable tr");
    let csv = "";
    rows.forEach(row => {
        const cells = row.querySelectorAll("th, td");
        csv += Array.from(cells).map(c => c.innerText).join("\t") + "\n";
    });
    const blob = new Blob([csv], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.xls";
    a.click();
}

// ================= PRINT =================
function printTable() {
    const table = document.getElementById("studentsTable").outerHTML;
    const win = window.open("", "", "width=1000,height=600");
    win.document.write(`
        <html>
        <head>
            <title>Student Search</title>
            <style>
                body { font-family: Poppins, sans-serif; padding: 20px; }
                h2 { margin-bottom: 15px; font-size: 16px; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #ddd; padding: 8px; font-size: 12px; text-align: left; }
                th { background: #f1f1f1; font-weight: 600; }
                tr:nth-child(even) { background: #f9fbff; }
            </style>
        </head>
        <body>
            <h2>Student Search Results</h2>
            ${table}
        </body>
        </html>
    `);
    win.document.close();
    win.print();
}