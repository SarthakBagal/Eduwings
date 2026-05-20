// ================= FORM =================
const form = document.getElementById("prospectusForm");

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const data = {
            date: document.getElementById("date").value,
            prospectusNo: document.getElementById("prospectusNo").value.trim(),
            section: document.getElementById("section").value,
            category: document.getElementById("category").value,

            studentName: document.getElementById("studentName").value.trim(),
            firstName: document.getElementById("firstName").value.trim(),
            middleName: document.getElementById("middleName").value.trim(),
            lastName: document.getElementById("lastName").value.trim(),

            program: document.getElementById("program").value,
            semester: document.getElementById("semester").value,
            session: document.getElementById("session").value,
            contactNo: document.getElementById("contactNo").value.trim(),

            amount: document.getElementById("amount").value,
            medium: document.getElementById("medium").value,
            percentage: document.getElementById("percentage").value,

            school: document.getElementById("school").value.trim(),
            address: document.getElementById("address").value.trim()
        };

        if (!data.date || !data.prospectusNo || !data.studentName) {
            alert("Please fill required fields ❌");
            return;
        }

        fetch("http://localhost:5000/api/ProspectusSale", { // ✅ FIXED
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(response => {
            alert("Data saved successfully ✅");
            form.reset();
        })
        .catch(err => {
            console.error(err);
            alert("Failed to save ❌");
        });
    });
}


// ================= SEARCH =================
const searchForm = document.getElementById("searchForm");
const salesTableBody = document.getElementById("salesTableBody");
const tableContainer = document.getElementById("tableContainer");
const exportBtns = document.getElementById("exportBtns");

if (searchForm) {
    searchForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const params = new URLSearchParams();

        const fromDate = document.getElementById("fromDate").value;
        const toDate = document.getElementById("toDate").value;
        const category = document.getElementById("searchCategory").value;
        const program = document.getElementById("searchProgram").value;
        const semester = document.getElementById("searchSemester").value;
        const session = document.getElementById("searchSession").value;

        if (fromDate) params.append("fromDate", fromDate);
        if (toDate) params.append("toDate", toDate);
        if (category) params.append("category", category);
        if (program) params.append("program", program);
        if (semester) params.append("semester", semester);
        if (session) params.append("session", session);

        fetch(`http://localhost:5000/api/ProspectusSale/search?${params.toString()}`) // ✅ FIXED
            .then(res => res.json())
            .then(data => {

                salesTableBody.innerHTML = "";

                if (data.length === 0) {
                    salesTableBody.innerHTML = `<tr><td colspan="8">No records found</td></tr>`;
                    tableContainer.style.display = "block";
                    exportBtns.style.display = "none";
                    return;
                }

                data.forEach(item => {
                    salesTableBody.innerHTML += `
                        <tr>
                            <td>${new Date(item.date).toLocaleDateString("en-IN")}</td>
                            <td>${item.prospectusNo}</td>
                            <td>${item.studentName}</td>
                            <td>${item.program}</td>
                            <td>${item.semester}</td>
                            <td>${item.contactNo || "-"}</td>
                            <td>${item.category}</td>
                            <td>${item.school || "-"}</td>
                        </tr>
                    `;
                });

                tableContainer.style.display = "block";
                exportBtns.style.display = "flex";
            })
            .catch(err => {
                console.error(err);
                alert("Error fetching data ❌");
            });
    });
}