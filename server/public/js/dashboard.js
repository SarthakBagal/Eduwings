const token = localStorage.getItem("token");

if (!token) {
  // not logged in → kick back to login
  window.location.href = "login.html";
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});

function toggleMenu(element) {
  const menuItem = element.parentElement;

  // Close other open menus (optional)
  document.querySelectorAll('.menu-item').forEach(item => {
    if (item !== menuItem) item.classList.remove('open');
  });

  menuItem.classList.toggle('open');
}
