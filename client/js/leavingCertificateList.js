document.addEventListener("DOMContentLoaded", function () {

  const API      = "http://localhost:5000/api"
  const PER_PAGE = 10

  let allRecords  = []
  let filtered    = []
  let currentPage = 1;

  // ── Sidebar toggles ───────────────────────────────────────
  // ;

  // ── Toast ─────────────────────────────────────────────────
  function showToast(text, type) {
    const t = document.getElementById("toast")
    t.textContent   = text
    t.className     = type
    t.style.display = "block"
    setTimeout(() => (t.style.display = "none"), 3500)
  }

  // ── Format date to YYYY-MM-DD ─────────────────────────────
  function formatDate(dateStr) {
    if (!dateStr) return "—"
    return new Date(dateStr).toISOString().split("T")[0]
  }

  // ── Render table ──────────────────────────────────────────
  function renderTable(records, page) {
    const tbody = document.getElementById("tableBody")
    const start = (page - 1) * PER_PAGE
    const end   = start + PER_PAGE
    const slice = records.slice(start, end)

    if (!records.length) {
      tbody.innerHTML = `<tr><td colspan="8" class="table-msg">No records found.</td></tr>`
      document.getElementById("showingText").textContent = ""
      document.getElementById("pagination").innerHTML   = ""
      return
    }

    tbody.innerHTML = slice.map((cert, i) => `
      <tr>
        <td>${start + i + 1}</td>
        <td>${cert.regNo || "—"}</td>
        <td>${cert.studentName || "—"}</td>
        <td>${cert.section     || "—"}</td>
        <td>${cert.category    || "—"}</td>
        <td>${cert.contactNo   || "—"}</td>
        <td>${formatDate(cert.dateOfLeaving)}</td>
        <td>
          <button class="btn-print"   data-id="${cert._id}">Print</button>
          <span class="or-text">OR</span>
          <button class="btn-edit-lc" data-id="${cert._id}">Edit L.C</button>
        </td>
      </tr>
    `).join("")

    // Attach button events after rendering
    tbody.querySelectorAll(".btn-print").forEach(btn =>
      btn.addEventListener("click", () => printLC(btn.dataset.id))
    )
    tbody.querySelectorAll(".btn-edit-lc").forEach(btn =>
      btn.addEventListener("click", () => editLC(btn.dataset.id))
    )

    document.getElementById("showingText").textContent =
      `Showing ${start + 1} to ${Math.min(end, records.length)} of ${records.length} entries`

    renderPagination(records.length, page)
  }

  // ── Pagination ────────────────────────────────────────────
  function renderPagination(total, page) {
    const pages = Math.ceil(total / PER_PAGE)
    const pag   = document.getElementById("pagination")

    let html = `<button class="btn-page" id="prevBtn" ${page === 1 ? "disabled" : ""}>Previous</button>`
    for (let i = 1; i <= pages; i++) {
      html += `<button class="btn-page ${i === page ? "active" : ""}" data-page="${i}">${i}</button>`
    }
    html += `<button class="btn-page" id="nextBtn" ${page === pages ? "disabled" : ""}>Next</button>`
    pag.innerHTML = html

    pag.querySelectorAll("[data-page]").forEach(btn =>
      btn.addEventListener("click", () => {
        currentPage = parseInt(btn.dataset.page)
        renderTable(filtered, currentPage)
      })
    )

    document.getElementById("prevBtn").addEventListener("click", () => {
      if (currentPage > 1) { currentPage--; renderTable(filtered, currentPage) }
    })
    document.getElementById("nextBtn").addEventListener("click", () => {
      if (currentPage < pages) { currentPage++; renderTable(filtered, currentPage) }
    })
  }

  // ── Fetch from backend ────────────────────────────────────
  async function fetchRecords() {
    const studentName = document.getElementById("filterStudentName").value.trim()
    const regNo       = document.getElementById("filterRegNo").value.trim()
    const session     = document.getElementById("filterSession").value
    const category    = document.getElementById("filterCategory").value

    const params = new URLSearchParams()
    if (studentName) params.append("studentName", studentName)
    if (regNo)       params.append("regNo",       regNo)
    if (session)     params.append("session",     session)
    if (category)    params.append("category",    category)

    document.getElementById("tableBody").innerHTML =
      `<tr><td colspan="8" class="table-msg">
        <i class="fas fa-spinner fa-spin"></i> Loading...
      </td></tr>`

    try {
      const res = await fetch(`${API}/leaving-certificate?${params.toString()}`)
      if (!res.ok) throw new Error(`Server error: ${res.status}`)

      const data = await res.json()

      allRecords  = data
      filtered    = data
      currentPage = 1
      document.getElementById("tableSearch").value = ""
      renderTable(filtered, currentPage)

    } catch (err) {
      console.error("fetchRecords error:", err)
      document.getElementById("tableBody").innerHTML =
        `<tr><td colspan="8" class="table-msg" style="color:#c0392b">
          Failed to load. Is backend running?<br>
          <small>${err.message}</small>
        </td></tr>`
    }
  }

  // ── Search button ─────────────────────────────────────────
  document.getElementById("searchBtn").addEventListener("click", fetchRecords)

  // ── Press Enter in text inputs to trigger search ──────────
  ;["filterStudentName", "filterRegNo"].forEach(id => {
    document.getElementById(id).addEventListener("keydown", e => {
      if (e.key === "Enter") fetchRecords()
    })
  })

  // ── Inline table search (client-side) ─────────────────────
  document.getElementById("tableSearch").addEventListener("input", function () {
    const q = this.value.toLowerCase()
    filtered = allRecords.filter(c =>
      (c.studentName || "").toLowerCase().includes(q) ||
      (c.studentId   || "").toLowerCase().includes(q) ||
      (c.regNo       || "").toLowerCase().includes(q) ||
      (c.section     || "").toLowerCase().includes(q) ||
      (c.category    || "").toLowerCase().includes(q) ||
      (c.contactNo   || "").toLowerCase().includes(q)
    )
    currentPage = 1
    renderTable(filtered, currentPage)
  })

  // ── Export: Copy ──────────────────────────────────────────
  document.getElementById("copyBtn").addEventListener("click", () => {
    if (!allRecords.length) return showToast("No data to copy.", "error")
    const rows = allRecords.map((c, i) =>
      [i+1, c.studentId, c.studentName, c.section,
       c.category, c.contactNo, formatDate(c.dateOfLeaving)].join("\t")
    ).join("\n")
    navigator.clipboard.writeText(rows)
      .then(() => showToast("Copied to clipboard!", "success"))
  })

  // ── Export: CSV ───────────────────────────────────────────
  document.getElementById("csvBtn").addEventListener("click", () => {
    if (!allRecords.length) return showToast("No data to export.", "error")
    const header = "Sr No,Student Id,Student Name,Section,Category,Contact No,Issue Date"
    const rows   = allRecords.map((c, i) =>
      [i+1, c.studentId, c.studentName, c.section,
       c.category, c.contactNo, formatDate(c.dateOfLeaving)].join(",")
    ).join("\n")
    const blob = new Blob([header + "\n" + rows], { type: "text/csv" })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement("a")
    a.href = url
    a.download = "leaving_certificate_list.csv"
    a.click()
    URL.revokeObjectURL(url)
  })

  // ── Export: Print ─────────────────────────────────────────
  document.getElementById("printBtn").addEventListener("click", () => window.print())

  // ── Print single LC ───────────────────────────────────────
  function printLC(id) {
    window.open(`printLC.html?id=${id}`, "_blank")
  }

  // ── Edit LC ───────────────────────────────────────────────
  function editLC(id) {
    window.location.href = `leavingCertificate.html?edit=${id}`
  }

  // ── Load all records on page open ─────────────────────────
  fetchRecords()

})