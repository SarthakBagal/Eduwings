const table = document.querySelector("#feesTable tbody");

// LOAD DATA 
function loadFees() {
    fetch("http://localhost:5000/api/feesCollection", {
        method: "GET",
        cache: "no-store"
    })
    .then(res => res.json())
    .then(data => {

        table.innerHTML = "";

        if (data.length === 0) {
            table.innerHTML = `<tr><td colspan="7">No data found</td></tr>`;
            return;
        }

        data.forEach((item, index) => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.totalFees}</td>

                <td>
                    <input type="number" value="${item.paidAmount}" id="paid-${item._id}">
                </td>

                <td id="due-${item._id}">
                    ${item.dueAmount}
                </td>

                <td class="${item.status === 'Paid' ? 'paid' : 'pending'}" id="status-${item._id}">
                    ${item.status}
                </td>

                <td>
                    <button id="btn-${item._id}">Update</button>
                </td>
            `;

            table.appendChild(row);

            //  Event Listener (CSP FIX)
            document.getElementById(`btn-${item._id}`)
                .addEventListener("click", () => {
                    updateFees(item._id);
                });
        });

    })
    .catch(err => {
        console.log("Error:", err);
        showMessage("Failed to load data ❌", "error");
    });
}

// ========= Update Fees ==========
function updateFees(id) {

    const paidInput = document.getElementById(`paid-${id}`);
    const paidAmount = Number(paidInput.value);

    const originalAmount = Number(paidInput.defaultValue);

    // ================= VALIDATION =================
    if (paidAmount === originalAmount) {
        showMessage("No changes made ⚠️", "error");
        return;
    }

    fetch(`http://localhost:5000/api/feesCollection/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ paidAmount })
    })
    .then(res => {

        //  MAIN FIX HERE
        if (!res.ok) {
            throw new Error("Server Error");
        }

        return res.json();
    })
    .then(data => {
        console.log("Updated:", data);

        showMessage("Fees updated successfully ✅", "success");

        loadFees();
    })
    .catch(err => {
        console.log("Update error:", err);

        showMessage("Fees Update failed ❌", "error");
    });
}

// ================= MESSAGE FUNCTION =================
function showMessage(message, type) {
    const box = document.getElementById("messageBox");

    box.innerText = message;

    // reset classes
    box.className = "";

    if (type === "success") {
        box.classList.add("success");
    } else {
        box.classList.add("error");
    }

    box.classList.remove("hidden");

    // auto hide after 3 sec
    setTimeout(() => {
        box.classList.add("hidden");
    }, 2000);
}

// ================= INITIAL LOAD =================
loadFees();