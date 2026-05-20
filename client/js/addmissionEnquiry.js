document.addEventListener("DOMContentLoaded", function () {

  const API = "http://localhost:5000/api/addmission-enquiries";

  // ── Search button ─────────────────────────────────────────
  const searchBtn = document.getElementById("searchBtn")
  if (searchBtn) searchBtn.addEventListener("click", searchEnquiries)

  // ── Build full name from model fields ─────────────────────
  function fullName(e) {
    return [e.firstName, e.middleName, e.lastName]
      .filter(Boolean).join(" ") || "—"
  }

  // ── Render rows ───────────────────────────────────────────
  function renderTable(data) {
    const tbody = document.getElementById("enquiryTable")
    tbody.innerHTML = ""

    if (!data || data.length === 0) {
      const tr = document.createElement("tr")
      const td = document.createElement("td")
      td.colSpan = 9
      td.className = "table-empty"
      td.textContent = "No records found."
      tr.appendChild(td)
      tbody.appendChild(tr)
      return
    }

    data.forEach(e => {
      const row = document.createElement("tr")

      // Delete cell
      const delTd  = document.createElement("td")
      const delBtn = document.createElement("button")
      delBtn.textContent = "✕"
      delBtn.className   = "btn-delete-row"
      delBtn.addEventListener("click", () => deleteEnquiry(e._id, row))
      delTd.appendChild(delBtn)
      row.appendChild(delTd)

      // Data cells
      ;[
        e.date        || "—",
        e.enquiryNo   || "—",
        fullName(e),
        e.program     || "—",
        e.semester    || "—",
        e.contact     || "—",
        e.category    || "—",
        e.school      || "—"
      ].forEach(val => {
        const td = document.createElement("td")
        td.textContent = val
        row.appendChild(td)
      })

      tbody.appendChild(row)
    })
  }

  // ── Loading / message row ─────────────────────────────────
  function showMsg(msg) {
    const tbody = document.getElementById("enquiryTable")
    tbody.innerHTML = ""
    const tr = document.createElement("tr")
    const td = document.createElement("td")
    td.colSpan   = 9
    td.className = "table-loading"
    td.textContent = msg
    tr.appendChild(td)
    tbody.appendChild(tr)
  }

  // ── Load all on page open ─────────────────────────────────
  async function loadEnquiries() {
    showMsg("Loading...")
    try {
      const res  = await fetch(API)
      const json = await res.json()
      renderTable(json.data || json)
    } catch (err) {
      console.error("Load error:", err)
      showMsg("Failed to load. Is backend running?")
    }
  }

  // ── Search ────────────────────────────────────────────────
  async function searchEnquiries() {
    const name      = document.getElementById("studentName").value.trim()
    const enquiryNo = document.getElementById("enquiryNo").value.trim()
    const fromDate  = document.getElementById("fromDate").value
    const toDate    = document.getElementById("toDate").value
    const session   = document.getElementById("sessionFilter").value

    const params = new URLSearchParams()
    if (name)      params.append("name",      name)
    if (enquiryNo) params.append("enquiryNo", enquiryNo)
    if (fromDate)  params.append("fromDate",  fromDate)
    if (toDate)    params.append("toDate",    toDate)
    if (session)   params.append("session",   session)

    showMsg("Searching...")

    try {
      const res  = await fetch(`${API}/search?${params.toString()}`)
      const json = await res.json()
      renderTable(json.data || json)
    } catch (err) {
      console.error("Search error:", err)
      showMsg("Search failed. Is backend running?")
    }
  }

  // ── Delete ────────────────────────────────────────────────
  async function deleteEnquiry(id, rowEl) {
    if (!confirm("Delete this enquiry?")) return
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" })
      if (res.ok) {
        rowEl.remove()
      } else {
        alert("Delete failed.")
      }
    } catch (err) {
      console.error("Delete error:", err)
      alert("Cannot connect to server.")
    }
  }

  // ── Press Enter to search ─────────────────────────────────
  ;["studentName", "enquiryNo"].forEach(id => {
    const el = document.getElementById(id)
    if (el) el.addEventListener("keydown", e => {
      if (e.key === "Enter") searchEnquiries()
    })
  })

  // Load all records on page open
  loadEnquiries()

})