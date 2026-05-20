const form = document.getElementById("otherFeesForm");
const table = document.querySelector("#otherFeesTable tbody");

// ================= EVENT LISTENERS =================
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("copyBtn").addEventListener("click", copyTable);
    document.getElementById("csvBtn").addEventListener("click", exportCSV);
    document.getElementById("excelBtn").addEventListener("click", exportExcel);
    document.getElementById("printBtn").addEventListener("click", printTable);
});

// ================= LOAD DATA =================
function loadOtherFees() {
    fetch("http://localhost:5000/api/otherFees", { cache: "no-store" })
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
                    <td>${item.name}</td>
                    <td>${item.feesType}</td>
                    <td>${item.amount}</td>
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

    const name = document.getElementById("studentName").value.trim();
    const feesType = document.getElementById("feesType").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;

    if (!name || !feesType || !amount || !date) {
        alert("Please fill all fields!");
        return;
    }

    const newData = { name, feesType, amount, date };

    fetch("http://localhost:5000/api/otherFees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData)
    })
    .then(res => res.json())
    .then(data => {
        alert("Saved successfully!");
        loadOtherFees();
        form.reset();
    })
    .catch(err => {
        console.log("Save Error:", err);
        alert("Error saving data!");
    });
});

// ================= COPY =================
function copyTable() {
    const rows = document.querySelectorAll("#otherFeesTable tr");
    let text = "";
    rows.forEach(row => {
        const cells = row.querySelectorAll("th, td");
        text += Array.from(cells).map(c => c.innerText).join("\t") + "\n";
    });
    navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
}

// ================= CSV =================
function exportCSV() {
    const rows = document.querySelectorAll("#otherFeesTable tr");
    let csv = "";
    rows.forEach(row => {
        const cells = row.querySelectorAll("th, td");
        csv += Array.from(cells).map(c => `"${c.innerText}"`).join(",") + "\n";
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "other_fees.csv";
    a.click();
}

// ================= EXCEL =================
function exportExcel() {
    const rows = document.querySelectorAll("#otherFeesTable tr");
    let csv = "";
    rows.forEach(row => {
        const cells = row.querySelectorAll("th, td");
        csv += Array.from(cells).map(c => c.innerText).join("\t") + "\n";
    });
    const blob = new Blob([csv], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "other_fees.xls";
    a.click();
}

// ================= PRINT =================
function printTable() {
    const table = document.getElementById("otherFeesTable").outerHTML;
    const win = window.open("", "", "width=1000,height=600");
    win.document.write(`
        <html>
        <head>
            <title>Other Fees</title>
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
            <h2>Other Fees</h2>
            ${table}
        </body>
        </html>
    `);
    win.document.close();
    win.print();
}

// ================= INITIAL LOAD =================
loadOtherFees();