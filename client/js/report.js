const reportTableBody = document.getElementById("reportTableBody");
const listSection = document.getElementById("listSection");
let allData = [];

// ================= EVENT LISTENERS =================
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchBtn").addEventListener("click", searchReport);
    document.getElementById("resetBtn").addEventListener("click", resetReport);
    document.getElementById("copyBtn").addEventListener("click", copyTable);
    document.getElementById("csvBtn").addEventListener("click", exportCSV);
    document.getElementById("excelBtn").addEventListener("click", exportExcel);
    document.getElementById("printBtn").addEventListener("click", printTable);
    document.getElementById("tableSearch").addEventListener("input", filterTable);
});

// ================= SEARCH =================
function searchReport() {
    const session = document.getElementById("sessionFilter").value;

    console.log("Searching session:", session);

    fetch(`http://localhost:5000/api/ProspectusSale/search?session=${session}`)
        .then(res => res.json())
        .then(data => {
            console.log("Data received:", data);
            allData = data;
            renderTable(data);
            listSection.style.display = "block";
        })
        .catch(err => {
            console.error("Error:", err);
            alert("Error fetching data!");
        });
}

// ================= RESET =================
function resetReport() {
    document.getElementById("sessionFilter").value = "2026-2027";
    reportTableBody.innerHTML = "";
    listSection.style.display = "none";
    document.getElementById("tableSearch").value = "";
    allData = [];
}

// ================= RENDER TABLE =================
function renderTable(data) {
    reportTableBody.innerHTML = "";

    if (data.length === 0) {
        reportTableBody.innerHTML = `<tr><td colspan="11">No records found</td></tr>`;
        return;
    }

    data.forEach((item, index) => {
        reportTableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.prospectusNo}</td>
                <td>${item.studentName}</td>
                <td>${item.program || "-"}</td>
                <td>${item.semester || "-"}</td>
                <td>${item.session || "-"}</td>
                <td>${item.contactNo || "-"}</td>
                <td>${item.category || "-"}</td>
                <td>${item.medium || "-"}</td>
                <td>${new Date(item.date).toLocaleDateString("en-IN")}</td>
                <td>${item.amount || 0}</td>
            </tr>
        `;
    });
}

// ================= TABLE FILTER =================
function filterTable() {
    const query = document.getElementById("tableSearch").value.toLowerCase();
    const filtered = allData.filter(item =>
        Object.values(item).some(val =>
            String(val).toLowerCase().includes(query)
        )
    );
    renderTable(filtered);
}

// ================= COPY =================
function copyTable() {
    const rows = document.querySelectorAll("#reportTable tr");
    let text = "";
    rows.forEach(row => {
        const cells = row.querySelectorAll("th, td");
        text += Array.from(cells).map(c => c.innerText).join("\t") + "\n";
    });
    navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
}

// ================= CSV =================
function exportCSV() {
    const rows = document.querySelectorAll("#reportTable tr");
    let csv = "";
    rows.forEach(row => {
        const cells = row.querySelectorAll("th, td");
        csv += Array.from(cells).map(c => `"${c.innerText}"`).join(",") + "\n";
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prospectus_sales_report.csv";
    a.click();
}

// ================= EXCEL =================
function exportExcel() {
    const rows = document.querySelectorAll("#reportTable tr");
    let csv = "";
    rows.forEach(row => {
        const cells = row.querySelectorAll("th, td");
        csv += Array.from(cells).map(c => c.innerText).join("\t") + "\n";
    });
    const blob = new Blob([csv], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prospectus_sales_report.xls";
    a.click();
}

// ================= PRINT =================
function printTable() {
    const table = document.getElementById("reportTable").outerHTML;
    const win = window.open("", "", "width=1000,height=600");
    win.document.write(`
        <html>
        <head>
            <title>Prospectus Sales Report</title>
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
            <h2>Prospectus Sales Report</h2>
            ${table}
        </body>
        </html>
    `);
    win.document.close();
    win.print();
}