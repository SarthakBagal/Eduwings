let allSections = [];

// ================= EVENT LISTENERS =================
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("sectionForm").addEventListener("submit", insertSection);
    document.getElementById("copyBtn").addEventListener("click", copyTable);
    document.getElementById("csvBtn").addEventListener("click", exportCSV);
    document.getElementById("excelBtn").addEventListener("click", exportExcel);
    document.getElementById("printBtn").addEventListener("click", printTable);
    document.getElementById("tableSearch").addEventListener("input", filterTable);

    // Load on page open
    loadSections();
});

// ================= INSERT =================
function insertSection(e) {
    e.preventDefault();

    const program = document.getElementById("program").value;
    const semester = document.getElementById("semester").value;
    const session = document.getElementById("session").value;
    const category = document.getElementById("category").value;
    const section = document.getElementById("section").value;
    const studentName = document.getElementById("studentName").value.trim();
    const studentId = document.getElementById("studentId").value.trim();

    if (!program || !semester || !session || !category || !section || !studentName || !studentId) {
        alert("Please fill all fields!");
        return;
    }

    const data = { program, semester, session, category, section, studentName, studentId };

    fetch("http://localhost:5000/api/section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
        console.log("Inserted:", response);
        alert("Section allocated successfully!");
        document.getElementById("sectionForm").reset();
        loadSections();
    })
    .catch(err => {
        console.error("Error:", err);
        alert("Error inserting data!");
    });
}

// ================= LOAD =================
function loadSections() {
    fetch("http://localhost:5000/api/section", {
        cache: "no-store"
    })
    .then(res => res.json())
    .then(data => {
        allSections = data;
        renderTable(data);
    })
    .catch(err => console.error("Load Error:", err));
}

// ================= RENDER TABLE =================
function renderTable(data) {
    const tbody = document.getElementById("sectionTableBody");
    tbody.innerHTML = "";

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8">No data found</td></tr>`;
        return;
    }

    data.forEach((item, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.studentId || "-"}</td>
                <td>${item.studentName || "-"}</td>
                <td>${item.program || "-"}</td>
                <td>${item.semester || "-"}</td>
                <td>${item.category || "-"}</td>
                <td>${item.section || "-"}</td>
                <td>
                    <button class="delete-btn" data-id="${item._id}">
                        <i class="fa fa-times" style="color:red;"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    // Delete listeners
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            deleteSection(this.getAttribute("data-id"));
        });
    });
}

// ================= DELETE =================
function deleteSection(id) {
    if (!confirm("Are you sure you want to delete this record?")) return;

    fetch(`http://localhost:5000/api/section/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(() => loadSections())
    .catch(err => console.error("Delete Error:", err));
}

// ================= FILTER TABLE =================
function filterTable() {
    const query = document.getElementById("tableSearch").value.toLowerCase();
    const filtered = allSections.filter(item =>
        Object.values(item).some(val =>
            String(val).toLowerCase().includes(query)
        )
    );
    renderTable(filtered);
}

// ================= COPY =================
function copyTable() {
    const rows = document.querySelectorAll("#sectionTable tr");
    let text = "";
    rows.forEach(row => {
        const cells = row.querySelectorAll("th, td");
        text += Array.from(cells).map(c => c.innerText).join("\t") + "\n";
    });
    navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
}

// ================= CSV =================
function exportCSV() {
    const rows = document.querySelectorAll("#sectionTable tr");
    let csv = "";
    rows.forEach(row => {
        const cells = row.querySelectorAll("th, td");
        csv += Array.from(cells).map(c => `"${c.innerText}"`).join(",") + "\n";
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "section_allocation.csv";
    a.click();
}

// ================= EXCEL =================
function exportExcel() {
    const rows = document.querySelectorAll("#sectionTable tr");
    let csv = "";
    rows.forEach(row => {
        const cells = row.querySelectorAll("th, td");
        csv += Array.from(cells).map(c => c.innerText).join("\t") + "\n";
    });
    const blob = new Blob([csv], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "section_allocation.xls";
    a.click();
}

// ================= PRINT =================
function printTable() {
    const table = document.getElementById("sectionTable").outerHTML;
    const win = window.open("", "", "width=1000,height=600");
    win.document.write(`
        <html>
        <head>
            <title>Section Allocation</title>
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
            <h2>Section Allocation List</h2>
            ${table}
        </body>
        </html>
    `);
    win.document.close();
    win.print();
}