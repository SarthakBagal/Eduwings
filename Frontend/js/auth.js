const message = document.getElementById("message");

// REGISTER
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      message.innerText = data.message;
    } catch (err) {
      message.innerText = "Server error";
    }
  });
}

// LOGIN

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const password = document.getElementById("logPassword").value;
    const year = document.getElementById("yearSelect").value;

    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ name, password, year })
      });

      const data = await res.json();

      if (res.ok) {
        message.style.color = "green";
        message.innerText = "Login successful ✅";
        // window.location.href = "dashboard.html";


        setTimeout(() => {
          window.location.href = `${API_BASE_URL}/dashboard`;
        }, 800);
      } else {
        message.style.color = "red";
        message.innerText = data.message;
      }
    } catch (error) {
      message.style.color = "red";
      message.innerText = "Server not reachable";
    }
  });
}

