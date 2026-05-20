document.addEventListener("DOMContentLoaded", function () {
 
  const API = "http://localhost:5000/api/createUsers"
  const ALL_PERMS = ["Admission", "Fees", "Certificates", "User Management", "Administrator"]
 
 
  // ── Modal elements ────────────────────────────────────────
  const editModal  = document.getElementById("editModal")
  const modalClose = document.getElementById("modalClose")
  const cancelBtn  = document.getElementById("cancelBtn")
  const saveBtn    = document.getElementById("saveBtn")
 
  if (modalClose) modalClose.addEventListener("click", closeEditModal)
  if (cancelBtn)  cancelBtn.addEventListener("click", closeEditModal)
 
  // Close modal when clicking outside
  if (editModal) {
    editModal.addEventListener("click", function (e) {
      if (e.target === this) closeEditModal()
    })
  }
 
  if (saveBtn) saveBtn.addEventListener("click", saveUser)
 
  // ── Toast ─────────────────────────────────────────────────
  function showToast(text, type) {
    const t = document.getElementById("toast")
    if (!t) return
    t.textContent = text
    t.className = type
    t.style.display = "block"
    setTimeout(() => t.style.display = "none", 3500)
  }
 
  // ── Get initials for avatar ───────────────────────────────
  function getInitials(name) {
    return name ? name.slice(0, 2).toUpperCase() : "U"
  }
 
  // ── Build a single user card ──────────────────────────────
  function buildCard(user) {
    const card = document.createElement("div")
    card.className = "user-card"
    card.dataset.id = user._id
 
    // Avatar circle
    const avatar = document.createElement("div")
    avatar.className = "user-avatar"
    avatar.textContent = getInitials(user.username)
 
    // User type as title
    const name = document.createElement("h3")
    name.textContent = user.userType
 
    // Username
    const uname = document.createElement("p")
    uname.className = "user-info"
    uname.textContent = "Username : " + user.username
 
    // Password
    const pwd = document.createElement("p")
    pwd.className = "user-info"
    pwd.textContent = "Password : " + user.plainPassword  
 
    // Permissions heading
    const permTitle = document.createElement("p")
    permTitle.className = "permissions-title"
    permTitle.textContent = "Permissions"
 
    // Permissions list
    const permList = document.createElement("div")
    permList.className = "permissions-list"
 
   ALL_PERMS.forEach(perm => {
  const has = user.permissions && user.permissions.includes(perm)
  const row = document.createElement("div")
  row.className = "perm-row"

  if (has) {
    // Only show tick if permission is granted
    row.innerHTML = `
      <span>${perm}</span>
      <i class="fas fa-check-circle" style="font-size:16px; color:#27ae60"></i>
    `
  } else {
    // Show plain text with no icon, or a dash
    row.innerHTML = `
      <span style="color:#bbb">${perm}</span>
      <span style="color:#bbb; font-size:14px">—</span>
    `
  }

  permList.appendChild(row)
})
 
    // Edit / Delete buttons
    const actions = document.createElement("div")
    actions.className = "card-actions"
 
    const editBtn = document.createElement("button")
    editBtn.className = "btn-edit"
    editBtn.textContent = "Edit"
    editBtn.addEventListener("click", () => openEditModal(user))
 
    const delBtn = document.createElement("button")
    delBtn.className = "btn-delete"
    delBtn.textContent = "Delete"
    delBtn.addEventListener("click", () => deleteUser(user._id, card))
 
    actions.appendChild(editBtn)
    actions.appendChild(delBtn)
 
    card.appendChild(avatar)
    card.appendChild(name)
    card.appendChild(uname)
    card.appendChild(pwd)
    card.appendChild(permTitle)
    card.appendChild(permList)
    card.appendChild(actions)
 
    return card
  }
 
  // ── Fetch and render all users ────────────────────────────
  async function loadUsers() {
    const grid = document.getElementById("cardsGrid")
    if (!grid) return
 
    grid.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading users...</div>'
 
    try {
      console.log("Fetching:", `${API}/users`)
 
      const res = await fetch(`${API}/users`)
 
      // console.log("Status:", res.status)
 
      const rawText = await res.text()
      // console.log("Raw response:", rawText)
 
      const users = JSON.parse(rawText)
 
      grid.innerHTML = ""
 
      if (!Array.isArray(users) || users.length === 0) {
        grid.innerHTML = '<div class="loading">No users found.</div>'
        return
      }
 
      users.forEach(user => grid.appendChild(buildCard(user)))
 
    } catch (err) {
      console.error("loadUsers error:", err)
      grid.innerHTML = `<div class="loading" style="color:#c0392b">
        Error: ${err.message}<br>
        Check console for details.
      </div>`
    }
  }
 
  // ── Delete user ───────────────────────────────────────────
  async function deleteUser(id, cardEl) {
    if (!confirm("Are you sure you want to delete this user?")) return
 
    try {
      const res  = await fetch(`${API}/users/${id}`, { method: "DELETE" })
      const data = await res.json()
 
      if (res.ok) {
        cardEl.remove()
        showToast(data.message || "User deleted.", "success")
      } else {
        showToast(data.message || "Delete failed.", "error")
      }
    } catch (err) {
      console.error("deleteUser error:", err)
      showToast("Cannot connect to server.", "error")
    }
  }
 
  // ── Open Edit modal ───────────────────────────────────────
  function openEditModal(user) {
    document.getElementById("editUserId").value   = user._id
    document.getElementById("editUserType").value = user.userType
    document.getElementById("editUsername").value = user.username
 
    document.querySelectorAll(".edit-perm").forEach(cb => {
      cb.checked = user.permissions && user.permissions.includes(cb.value)
    })
 
    editModal.classList.add("show")
  }
 
  function closeEditModal() {
    if (editModal) editModal.classList.remove("show")
  }
 
  // ── Save edited user ──────────────────────────────────────
  async function saveUser() {
    const id          = document.getElementById("editUserId").value
    const userType    = document.getElementById("editUserType").value
    const username    = document.getElementById("editUsername").value.trim()
    const permissions = [...document.querySelectorAll(".edit-perm:checked")].map(c => c.value)
 
    if (!username) return showToast("Username is required.", "error")
 
    try {
      const res  = await fetch(`${API}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userType, username, permissions })
      })
      const data = await res.json()
 
      if (res.ok) {
        showToast(data.message || "User updated.", "success")
        closeEditModal()
        loadUsers()
      } else {
        showToast(data.message || "Update failed.", "error")
      }
    } catch (err) {
      console.error("saveUser error:", err)
      showToast("Cannot connect to server.", "error")
    }
  }
 
  // ── Start ─────────────────────────────────────────────────
  loadUsers()
 
})