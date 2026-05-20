document.addEventListener("DOMContentLoaded", function () {

  const API = "http://localhost:5000/api";

  // ── Sidebar toggles ───────────────────────────────────────
  // ;[
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
    ;["studentName", "regId", "date", "className",
      "category", "semester"].forEach(id => {
      const el = document.getElementById(id)
      if (el) el.value = ""
    })
    document.getElementById("session").value = "2026-2027"
    document.getElementById("submitBtn").textContent = "Submit"
    window.history.replaceState({}, "", "bonafiedCertificate.html")
  }

  // ── Prefill if editing (?edit=ID in URL) ──────────────────
  const urlParams = new URLSearchParams(window.location.search)
  const editId    = urlParams.get("edit")

  if (editId) {
    fetch(`${API}/bonafied-certificate/${editId}`)
      .then(res => res.json())
      .then(cert => {
        const set = (id, v) => {
          const el = document.getElementById(id)
          if (el) el.value = v || ""
        }
        set("studentName", cert.studentName)
        set("regId",       cert.regId)
        set("className",   cert.className)
        set("session",     cert.session)
        set("category",    cert.category)
        set("semester",    cert.semester)

        if (cert.date) {
          document.getElementById("date").value =
            new Date(cert.date).toISOString().split("T")[0]
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

      const studentName = val("studentName")
      const regId       = val("regId")
      const date        = val("date")
      const className   = val("className")
      const session     = val("session")
      const category    = val("category")
      const semester    = val("semester")

      // Validation
      if (!studentName) return showToast("Student Name is required.", "error")
      if (!regId)       return showToast("Student Reg. ID is required.", "error")
      if (!date)        return showToast("Date is required.", "error")
      if (!className)   return showToast("Please select a Class.", "error")
      if (!category)    return showToast("Please select a Category.", "error")
      if (!semester)    return showToast("Please select a Semester.", "error")

      const payload = { studentName, regId, date, className, session, category, semester }

      try {
        const url    = editId
          ? `${API}/bonafied-certificate/${editId}`
          : `${API}/bonafied-certificate`
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