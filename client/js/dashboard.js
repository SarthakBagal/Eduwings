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

    // ── SUBMENU TOGGLES ───────────────────────────────────────

    // Enquiry submenu
    const enquiryToggle = document.querySelector(".enquiry-toggle");
    const enquirySubmenu = document.querySelector(".enquiry-submenu");
    if (enquiryToggle && enquirySubmenu) {
        enquiryToggle.addEventListener("click", () => {
            enquirySubmenu.classList.toggle("open");
        });
    }

    // Admission submenu
    const admissionBtn = document.getElementById("admissionBtn");
    const admissionMenu = document.getElementById("admissionMenu");
    const admissionArrow = document.getElementById("admissionArrow");
    if (admissionBtn && admissionMenu) {
        admissionBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            admissionMenu.classList.toggle("open");
            if (admissionArrow) admissionArrow.classList.toggle("rotate");
        });
    }

    // Certificate submenu
    const certificateToggle = document.querySelector(".certificate-toggle");
    const certificateSubmenu = document.querySelector(".certificate-submenu");
    if (certificateToggle && certificateSubmenu) {
        certificateToggle.addEventListener("click", () => {
            certificateSubmenu.classList.toggle("open");
        });
    }

    // User Management submenu
    const userToggle = document.querySelector(".user-toggle");
    const userManagement = document.querySelector(".user-management");
    if (userToggle && userManagement) {
        userToggle.addEventListener("click", () => {
            userManagement.classList.toggle("open");
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

    // Bell / notif wrapper click
    const notifWrapper = document.getElementById("notifWrapper");
    if (notifWrapper) {
        notifWrapper.addEventListener("click", function (e) {
            e.stopPropagation();
            notificationDropdown.classList.toggle("show");
            if (userDropdown) userDropdown.classList.remove("show");
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
    const userWrapper = document.getElementById("userWrapper");
    if (userWrapper) {
        userWrapper.addEventListener("click", function (e) {
            e.stopPropagation();
            userDropdown.classList.toggle("show");
            if (notificationDropdown) notificationDropdown.classList.remove("show");
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
            window.location.href = "createUser.html";
        });
    }

    // ── DOWNLOAD BACKUP ───────────────────────────────────────
    const downloadBackupBtn = document.getElementById("downloadBackupBtn");
    if (downloadBackupBtn) {
        downloadBackupBtn.addEventListener("click", () => {
            alert("Database backup download started!");
            // Add your backup download logic here
        });
    }

});

// ── SIDEBAR TOGGLE FUNCTION ───────────────────────────────────
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) sidebar.classList.toggle("collapsed");
}