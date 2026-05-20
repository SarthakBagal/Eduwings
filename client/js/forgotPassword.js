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

  // ── Show/Hide password toggle ─────────────────────────────
  document.querySelectorAll(".toggle-pw").forEach(icon => {
    icon.addEventListener("click", function () {
      const input = document.getElementById(this.dataset.target)
      if (input.type === "password") {
        input.type = "text"
        this.classList.replace("fa-eye", "fa-eye-slash")
      } else {
        input.type = "password"
        this.classList.replace("fa-eye-slash", "fa-eye")
      }
    })
  })

  // ── STEP 1: Verify Email ──────────────────────────────────
  document.getElementById("verifyBtn").addEventListener("click", async function () {
    const email = document.getElementById("email").value.trim()

    if (!email) return showToast("Please enter your email.", "error")

    try {
      const res  = await fetch(`${API}/forgot-password/verify`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email })
      })
      const data = await res.json()

      if (res.ok) {
        // Fill user info card
        const name = data.user.name
        document.getElementById("userInitial").textContent = name.charAt(0).toUpperCase()
        document.getElementById("userName").textContent    = name
        document.getElementById("userEmail").textContent   = data.user.email
        document.getElementById("userRole").textContent    = data.user.role

        // Show step 2, hide step 1
        document.getElementById("step1").classList.add("hidden")
        document.getElementById("step2").classList.remove("hidden")

      } else {
        showToast(data.message || "Email not found.", "error")
      }

    } catch (err) {
      console.error("Verify error:", err)
      showToast("Cannot connect to server.", "error")
    }
  })

  // ── Back button ───────────────────────────────────────────
  document.getElementById("backBtn").addEventListener("click", function () {
    document.getElementById("step2").classList.add("hidden")
    document.getElementById("step1").classList.remove("hidden")
    document.getElementById("newPassword").value     = ""
    document.getElementById("confirmPassword").value = ""
  })

  // ── STEP 2: Reset Password ────────────────────────────────
  document.getElementById("resetBtn").addEventListener("click", async function () {
    const email           = document.getElementById("email").value.trim()
    const newPassword     = document.getElementById("newPassword").value.trim()
    const confirmPassword = document.getElementById("confirmPassword").value.trim()

    if (!newPassword)     return showToast("New password is required.", "error")
    if (!confirmPassword) return showToast("Please confirm your password.", "error")
    if (newPassword !== confirmPassword)
      return showToast("Passwords do not match.", "error")
    if (newPassword.length < 6)
      return showToast("Password must be at least 6 characters.", "error")

    try {
      const res  = await fetch(`${API}/forgot-password/reset`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, newPassword, confirmPassword })
      })
      const data = await res.json()

      if (res.ok) {
        showToast(data.message || "Password reset successfully!", "success")

        // Reset everything back to step 1
        setTimeout(() => {
          document.getElementById("email").value           = ""
          document.getElementById("newPassword").value     = ""
          document.getElementById("confirmPassword").value = ""
          document.getElementById("step2").classList.add("hidden")
          document.getElementById("step1").classList.remove("hidden")
        }, 2000)

      } else {
        showToast(data.message || "Something went wrong.", "error")
      }

    } catch (err) {
      console.error("Reset error:", err)
      showToast("Cannot connect to server.", "error")
    }
  })

  // ── Press Enter on email field to trigger verify ──────────
  document.getElementById("email").addEventListener("keydown", function (e) {
    if (e.key === "Enter") document.getElementById("verifyBtn").click()
  })

})