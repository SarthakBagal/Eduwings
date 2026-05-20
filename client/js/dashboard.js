window.addEventListener("DOMContentLoaded", async () => {

    // ── AUTH CHECK ───────────────────────────────────────────
    try {
        const res = await fetch("http://localhost:5000/api/users/profile", {
            method: "GET",
            credentials: "include"
        });

        if (!res.ok) {
            window.location.href = "../views/login.html";
            return;
        }

        const data = await res.json();
        console.log("User data:", data);

    } catch (error) {
        window.location.href = "../views/login.html";
        return;
    }

// ── ADMISSION DROPDOWN ────────────────────────────────────
const admissionBtn = document.getElementById("admissionBtn");
const admissionMenu = document.getElementById("admissionMenu");
const admissionArrow = document.getElementById("admissionArrow");

if (admissionBtn && admissionMenu) {
    admissionBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        admissionMenu.classList.toggle("show");
        if (admissionArrow) admissionArrow.classList.toggle("rotate");
    });
}

    // ── SIDEBAR TOGGLE ────────────────────────────────────────
    const menuToggle = document.getElementById("menuToggle");
    if (menuToggle) {
        menuToggle.addEventListener("click", toggleSidebar);
    }

    // ── NOTIFICATION BELL ─────────────────────────────────────
    const bellIcon = document.getElementById("bellIcon");
    const notificationDropdown = document.getElementById("notificationDropdown");
    const markAllRead = document.getElementById("markAllRead");
    const userDropdown = document.getElementById("userDropdown");
    const powerBtn = document.getElementById("powerBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    // Bell click
    if (bellIcon) {
        bellIcon.addEventListener("click", function (e) {
            e.stopPropagation();
            notificationDropdown.classList.toggle("show");
            if (userDropdown) userDropdown.classList.remove("show");
        });
    }

    // Notification wrapper click (stop bubbling)
    const notifWrapper = document.querySelector(".notification-wrapper");
    if (notifWrapper) {
        notifWrapper.addEventListener("click", function (e) {
            e.stopPropagation();
        });
    }

    // Mark all read
    if (markAllRead) {
        markAllRead.addEventListener("click", function (e) {
            e.stopPropagation();
            document.querySelectorAll(".notification-item.unread").forEach(item => {
                item.classList.remove("unread");
            });
            const badge = document.getElementById("notifyBadge");
            if (badge) badge.style.display = "none";
        });
    }

    // ── USER DROPDOWN ─────────────────────────────────────────
    if (powerBtn) {
        powerBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            userDropdown.classList.toggle("show");
            if (notificationDropdown) notificationDropdown.classList.remove("show");
        });
    }

    // User wrapper click (stop bubbling)
    const userWrapper = document.querySelector(".user-wrapper");
    if (userWrapper) {
        userWrapper.addEventListener("click", function (e) {
            e.stopPropagation();
        });
    }

    // ── LOGOUT ────────────────────────────────────────────────
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async (e) => {
            e.stopPropagation();
            try {
                const res = await fetch("http://localhost:5000/api/auth/logout", {
                    method: "POST",
                    credentials: "include"
                });
                if (res.ok) {
                    window.location.href = "../views/login.html";
                } else {
                    alert("Logout failed");
                }
            } catch (error) {
                alert("Server error");
            }
        });
    }

    // ── CLOSE DROPDOWNS ON OUTSIDE CLICK ─────────────────────
    document.addEventListener("click", function () {
        if (notificationDropdown) notificationDropdown.classList.remove("show");
        if (userDropdown) userDropdown.classList.remove("show");
    });

    // ── QUICK LINKS ───────────────────────────────────────────
    const studentSearchCard = document.getElementById("studentSearchCard");
    if (studentSearchCard) {
        studentSearchCard.addEventListener("click", () => {
            window.location.href = "search.html";
        });
    }

    const addStudentCard = document.getElementById("addStudentCard");
    if (addStudentCard) {
        addStudentCard.addEventListener("click", () => {
            window.location.href = "student-admission.html";
        });
    }

    const createUserCard = document.getElementById("createUserCard");
    if (createUserCard) {
        createUserCard.addEventListener("click", () => {
            window.location.href = "user-management.html";
        });
    }

    // ── GENERIC MENU HEADERS ──────────────────────────────────
    document.querySelectorAll(".menu-header").forEach(header => {
        header.addEventListener("click", function () {
            const menuItem = this.parentElement;
            document.querySelectorAll(".menu-item").forEach(item => {
                if (item !== menuItem) item.classList.remove("open");
            });
            menuItem.classList.toggle("open");
        });
    });

});

// ── SIDEBAR TOGGLE FUNCTION ───────────────────────────────────
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) sidebar.classList.toggle("collapsed");
}