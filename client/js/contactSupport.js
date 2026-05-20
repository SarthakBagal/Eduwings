// document.addEventListener("DOMContentLoaded", function () {

//   // ── Sidebar toggles ───────────────────────────────────────
//   ;[
//     [".enquiry-toggle", ".enquiry-submenu"],
//     [".cert-toggle",    ".cert-submenu"],
//     [".user-toggle",    ".user-management"],
//   ].forEach(([btnSel, subSel]) => {
//     const btn = document.querySelector(btnSel)
//     const sub = document.querySelector(subSel)
//     if (btn && sub) btn.addEventListener("click", () => sub.classList.toggle("show"))
//   })

//   const sidebarToggle = document.getElementById("sidebarToggle")
//   if (sidebarToggle) {
//     sidebarToggle.addEventListener("click", () =>
//       document.body.classList.toggle("collapsed")
//     )
//   }

// })