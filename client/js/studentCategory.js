const form = document.getElementById("categoryForm");
const table = document.querySelector("#categoryTable tbody");

// ================= EVENT LISTENERS =================
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("copyBtn").addEventListener("click", copyTable);
    document.getElementById("csvBtn").addEventListener("click", exportCSV);
    document.getElementById("excelBtn").addEventListener("click", exportExcel);
    document.getElementById("printBtn").addEventListener("click", printTable);
});

// ================= LOAD DATA =================
function loadCategories() {
    fetch("http://localhost:5000/api/studentCategory", { cache: "no-store" })
    .then(res => res.json())
    .then(data => {
        table.innerHTML = "";

        if (data.length === 0) {
            table.innerHTML = `<tr><td colspan="5">No data found</td></tr>`;
            return;
        }

        data.forEach((item, index) => {
            table.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.studentName}</td>
                    <td>${item.currentCategory}</td>
                    <td>${item.newCategory}</td>
                    <td>${new Date(item.date).toLocaleDateString("en-IN")}</td>
                </tr>
            `;
        });
    })
    .catch(err => console.log("Load Error:", err));
}

// ================= FORM SUBMIT =================
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const studentName = document.getElementById("studentName").value.trim();
    const currentCategory = document.getElementById("currentCategory").value;
    const newCategory = document.getElementById("newCategory").value;
    const date = document.getElementById("date").value;

    if (!studentName || !currentCategory || !newCategory || !date) {
        alert("Please fill all fields!");
        return;
    }

    if (currentCategory === newCategory) {
        alert("Current and New category cannot be the same!");
        return;
    }

    const newData = { studentName, currentCategory, newCategory, date };

    fetch("http://localhost:5000/api/studentCategory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData)
    })
    .then(res => res.json())
    .then(data => {
        alert("Category changed successfully!");
        loadCategories();
        form.reset();
    })
    .catch(err => {
        console.log("Save Error:", err);
        alert("Error saving data!");
    });
});

// ================= COPY =================
function copyTable() {
    const rows = document.querySelectorAll("#categoryTable tr");
    let text = "";
    rows.forEach(row => {
        const cells = row.querySelectorAll("th, td");
        text += Array.from(cells).map(c => c.innerText).join("\t") + "\n";
    });
    navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
}

// ================= CSV =================
function exportCSV() {
    const rows = document.querySelectorAll("#categoryTable tr");
    let csv = "";
    rows.forEach(row => {
        const cells = row.querySelectorAll("th, td");
        csv += Array.from(cells).map(c => `"${c.innerText}"`).join(",") + "\n";
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "student_category.csv";
    a.click();
}

// ================= EXCEL =================
function exportExcel() {
    const rows = document.querySelectorAll("#categoryTable tr");
    let csv = "";
    rows.forEach(row => {
        const cells = row.querySelectorAll("th, td");
        csv += Array.from(cells).map(c => c.innerText).join("\t") + "\n";
    });
    const blob = new Blob([csv], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "student_category.xls";
    a.click();
}

// ================= PRINT =================
function printTable() {
    const table = document.getElementById("categoryTable").outerHTML;
    const win = window.open("", "", "width=1000,height=600");
    win.document.write(`
        <html>
        <head>
            <title>Student Category</title>
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
            <h2>Change Student Category</h2>
            ${table}
        </body>
        </html>
    `);
    win.document.close();
    win.print();
}

// ================= INITIAL LOAD =================
loadCategories();