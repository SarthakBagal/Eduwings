const form = document.getElementById("busFeesForm");
const table = document.querySelector("#busTable tbody");
let allBusFees = [];

// ================= EVENT LISTENERS =================
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("copyBtn").addEventListener("click", copyTable);
    document.getElementById("csvBtn").addEventListener("click", exportCSV);
    document.getElementById("excelBtn").addEventListener("click", exportExcel);
    document.getElementById("printBtn").addEventListener("click", printTable);
    loadBusFees();
});

// ================= LOAD DATA =================
function loadBusFees() {
    fetch("http://localhost:5000/api/busFees", {
        cache: "no-store"
    })
    .then(res => res.json())
    .then(data => {
        allBusFees = data;
        table.innerHTML = "";

        if (data.length === 0) {
            table.innerHTML = `<tr><td colspan="5">No data found</td></tr>`;
            return;
        }

        data.forEach((item, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.regNo}</td>
                    <td>${item.session}</td>
                    <td>${item.date ? new Date(item.date).toLocaleDateString("en-IN") : "-"}</td>
                </tr>
            `;
            table.innerHTML += row;
        });
    })
    .catch(err => console.log("Load Error:", err));
}

// ================= FORM SUBMIT =================
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const regNo = document.getElementById("regNo").value.trim();
    const session = document.getElementById("session").value;
    const date = document.getElementById("date").value;

    if (!name || !regNo || !session || !date) {
        alert("Please fill all fields!");
        return;
    }

    const newData = { name, regNo, session, date };

    fetch("http://localhost:5000/api/busFees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData)
    })
    .then(res => {
        if (!res.ok) throw new Error("Failed to save");
        return res.json();
    })
    .then(data => {
        console.log("Saved:", data);
        loadBusFees();
        form.reset();
    })
    .catch(err => {
        console.log("Error:", err);
        alert("Error saving data!");
    });
});

// ================= COPY =================
function copyTable() {
    const rows = document.querySelectorAll("#busTable tr");
    let text = "";
    rows.forEach(row => {
        const cells = row.querySelectorAll("th, td");
        text += Array.from(cells).map(c => c.innerText).join("\t") + "\n";
    });
    navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
}

// ================= CSV =================
function exportCSV() {
    const rows = document.querySelectorAll("#busTable tr");
    let csv = "";
    rows.forEach(row => {
        const cells = row.querySelectorAll("th, td");
        csv += Array.from(cells).map(c => `"${c.innerText}"`).join(",") + "\n";
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bus_fees.csv";
    a.click();
}

// ================= EXCEL =================
function exportExcel() {
    const rows = document.querySelectorAll("#busTable tr");
    let csv = "";
    rows.forEach(row => {
        const cells = row.querySelectorAll("th, td");
        csv += Array.from(cells).map(c => c.innerText).join("\t") + "\n";
    });
    const blob = new Blob([csv], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bus_fees.xls";
    a.click();
}

// ================= PRINT =================
function printTable() {
    const table = document.getElementById("busTable").outerHTML;
    const win = window.open("", "", "width=1000,height=600");
    win.document.write(`
        <html>
        <head>
            <title>Bus Fees Collection</title>
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
            <h2>Bus Fees Collection</h2>
            ${table}
        </body>
        </html>
    `);
    win.document.close();
    win.print();
}