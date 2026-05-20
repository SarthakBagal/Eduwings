const API_URL = "http://localhost:5000/api/createUsers/create-user"; // Change port if needed

    
 
    function toggleSidebar() {
      document.body.classList.toggle("collapsed");
    }
 
    function toggleSubmenu(id, item) {
      const sub = document.getElementById(id);
      sub.classList.toggle("show");
      document.querySelectorAll(".menu-item").forEach(el => el.classList.remove("active"));
      item.classList.add("active");
    }
 
    document.getElementById("checkAll").addEventListener("change", function () {
      document.querySelectorAll(".perm").forEach(c => c.checked = this.checked);
    });
 
    document.querySelectorAll(".perm").forEach(c => {
      c.addEventListener("change", function () {
        const total   = document.querySelectorAll(".perm").length;
        const checked = document.querySelectorAll(".perm:checked").length;
        document.getElementById("checkAll").checked = total === checked;
      });
    });
 
    function showMsg(text, type) {
      const el = document.getElementById("msg");
      el.textContent = text;
      el.className = type;
      el.style.display = "block";
      setTimeout(() => el.style.display = "none", 4000);
    }
 
    document.getElementById("submitBtn").addEventListener("click", submitForm)
    document.getElementById("resetBtn").addEventListener("click", resetForm)

    async function submitForm() {
      const userType        = document.getElementById("userType").value;
      const username        = document.getElementById("username").value.trim();
      const password        = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const permissions     = [...document.querySelectorAll(".perm:checked")].map(c => c.value);
 
      if (!userType || !username || !password || !confirmPassword)
        return showMsg("All fields are required.", "error");
      if (password !== confirmPassword)
        return showMsg("Passwords do not match.", "error");
      if (password.length < 6)
        return showMsg("Password must be at least 6 characters.", "error");
 
      try {
        const res  = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userType, username, password, confirmPassword, permissions })
        });
        const data = await res.json();
 
        if (res.ok) {
          showMsg(data.message || "User created successfully!", "success");
          resetForm();
        } else {
          showMsg(data.message || "Something went wrong.", "error");
        }
      } catch (err) {
        showMsg("Cannot connect to server. Is your backend running?", "error");
      }
    }
 
    function resetForm() {
      document.getElementById("userType").value = "";
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
      document.getElementById("confirmPassword").value = "";
      document.querySelectorAll(".perm, #checkAll").forEach(c => c.checked = false);
      document.getElementById("msg").style.display = "none";
    }

    