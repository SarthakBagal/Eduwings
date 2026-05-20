window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("http://localhost:5000/api/users/profile", {
      method: "GET",
      credentials: "include"
    });

    if (!res.ok) {
      // Not logged in → redirect
      window.location.href = "../views/login.html";
      return;
    }

    const data = await res.json();
    console.log("User data:", data);

  } catch (error) {
    // Server not reachable
    window.location.href = "../views/login.html";
  }
});

async function loadEnquiryCount() {
  const res = await fetch("http://localhost:5000/api/enquiries/count");
  const data = await res.json();

  document.getElementById("totalEnquiries").innerText = data.total;
}

loadEnquiryCount();

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  console.log("Logout")
  logoutBtn.addEventListener("click", async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });

      if (res.ok) {
        // Redirect to login page
        window.location.href = "../views/login.html";
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

const enquiryToggle = document.querySelector(".enquiry-toggle");
const enquirySubmenu = document.querySelector(".enquiry-submenu");

const userToggle = document.querySelector(".user-toggle");
const userManagement = document.querySelector(".user-management");

const certificateToggle = document.querySelector(".certificate-toggle");
const certificateSubmenu = document.querySelector(".certificate-submenu");

enquiryToggle.addEventListener("click", () => {
  enquirySubmenu.classList.toggle("show");
});

userToggle.addEventListener("click", () => {
  userManagement.classList.toggle("show");
});

certificateToggle.addEventListener("click", () => {
  certificateSubmenu.classList.toggle("show");
});

