console.log("Script is connected and running!");

const token = localStorage.getItem("token");

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST"
      });

      if (res.ok) {
        // Redirect to login page
        window.location.href = "/login.html";
      } else {
        alert("Logout failed");
      }

    } catch (error) {
      alert("Server error");
    }
  });
}

document.querySelectorAll(".menu-header").forEach(header => {
  header.addEventListener("click", function () {

    const menuItem = this.parentElement;

    // Close other open menus (optional)
    document.querySelectorAll(".menu-item").forEach(item => {
      if (item !== menuItem) item.classList.remove("open");
    });

    menuItem.classList.toggle("open");
  });
});
