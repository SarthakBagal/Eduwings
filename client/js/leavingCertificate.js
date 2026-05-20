
document.addEventListener("DOMContentLoaded", function () {

  const API = "http://localhost:5000/api";

  // ── Sidebar toggles ───────────────────────────────────────
  // [
  //   [".enquiry-toggle", ".enquiry-submenu"],
  //   [".cert-toggle",    ".cert-submenu"],
  //   [".user-toggle",    ".user-management"],
  // ].forEach(([btnSel, subSel]) => {
  //   const btn = document.querySelector(btnSel)
  //   const sub = document.querySelector(subSel)
  //   if (btn && sub) btn.addEventListener("click", () => sub.classList.toggle("show"))
  // })

  // const sidebarToggle = document.getElementById("sidebarToggle")
  // if (sidebarToggle) {
  //   sidebarToggle.addEventListener("click", () =>
  //     document.body.classList.toggle("collapsed")
  //   )
  // }

  // ── Toast ─────────────────────────────────────────────────
  function showToast(text, type) {
    const t = document.getElementById("toast")
    t.textContent   = text
    t.className     = type
    t.style.display = "block"
    setTimeout(() => (t.style.display = "none"), 4000)
  }

  // ── Helper: get trimmed value ─────────────────────────────
  function val(id) {
    const el = document.getElementById(id)
    return el ? el.value.trim() : ""
  }

  // ── Reset form ────────────────────────────────────────────
  function resetForm() {
    const fields = [
      "studentName", "category", "regNo",
      "dischargeNo", "dateOfLeaving",
      "contactNo", "section",
      "reason", "remark", "progress", "conduct"
    ]
    fields.forEach(id => {
      const el = document.getElementById(id)
      if (el) el.value = ""
    })
    document.getElementById("session").value = "2026-2027"
    document.getElementById("submitBtn").textContent = "Submit"
    window.history.replaceState({}, "", "leavingCertificate.html")
  }

  // ── Prefill if editing (?edit=ID in URL) ──────────────────
  const urlParams = new URLSearchParams(window.location.search)
  const editId    = urlParams.get("edit")

  if (editId) {
    fetch(`${API}/leaving-certificate/${editId}`)
      .then(res => res.json())
      .then(cert => {
        const set = (id, v) => {
          const el = document.getElementById(id)
          if (el) el.value = v || ""
        }
        set("studentName", cert.studentName)
        set("category",    cert.category)
        set("regNo",       cert.regNo)
        set("session",     cert.session)
        set("dischargeNo", cert.dischargeNo)
        set("contactNo",   cert.contactNo)
        set("section",     cert.section)
        set("reason",      cert.reason)
        set("remark",      cert.remark)
        set("progress",    cert.progress)
        set("conduct",     cert.conduct)

        if (cert.dateOfLeaving) {
          document.getElementById("dateOfLeaving").value =
            new Date(cert.dateOfLeaving).toISOString().split("T")[0]
        }

        document.getElementById("submitBtn").textContent = "Update"
      })
      .catch(err => {
        console.error("Prefill error:", err)
        showToast("Failed to load certificate data.", "error")
      })
  }

  // ── Submit / Update ───────────────────────────────────────
  const submitBtn = document.getElementById("submitBtn")
  if (submitBtn) {
    submitBtn.addEventListener("click", async function () {

      const studentName   = val("studentName")
      const category      = val("category")
      const regNo         = val("regNo")
      const session       = val("session")
      const dischargeNo   = val("dischargeNo")
      const dateOfLeaving = val("dateOfLeaving")
      const contactNo     = val("contactNo")
      const section       = val("section")
      const reason        = val("reason")
      const remark        = val("remark")
      const progress      = val("progress")
      const conduct       = val("conduct")

      // Validation
      if (!studentName)   return showToast("Student Name is required.", "error")
      if (!category)      return showToast("Please select a Category.", "error")
      if (!regNo)         return showToast("Student Reg. No is required.", "error")
      if (!dischargeNo)   return showToast("Discharge No. is required.", "error")
      if (!dateOfLeaving) return showToast("Date of Leaving is required.", "error")

      const payload = {
        studentName, category, regNo,
        session, dischargeNo, dateOfLeaving,
        contactNo, section,
        reason, remark, progress, conduct
      }

      try {
        const url    = editId
          ? `${API}/leaving-certificate/${editId}`
          : `${API}/leaving-certificate`
        const method = editId ? "PUT" : "POST"

        const res  = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })
        const data = await res.json()

        if (res.ok) {
          showToast(
            data.message || (editId ? "Updated successfully!" : "Submitted successfully!"),
            "success"
          )
          resetForm()
        } else {
          showToast(data.message || "Something went wrong.", "error")
        }

      } catch (err) {
        console.error("Submit error:", err)
        showToast("Cannot connect to server. Is backend running?", "error")
      }
    })
  }

})