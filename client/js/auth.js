const message = document.getElementById("message");

// REGISTER
// const registerForm = document.getElementById("registerForm");
// if (registerForm) {
//   registerForm.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const email = document.getElementById("regEmail").value;
//     const password = document.getElementById("regPassword").value;

//     try {
//       const res = await fetch(`${API_BASE_URL}/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password })
//       });

//       const data = await res.json();
//       message.innerText = data.message;
//     } catch (err) {
//       message.innerText = "Server error";
//     }
//   });
// }

// LOGIN

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const password = document.getElementById("logPassword").value;

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, password })
      });

      const data = await res.json();

      if (res.ok) {
        message.style.color = "green";
        message.innerText = "Login successful ✅";

        // Redirect to protected dashboard
        setTimeout(() => {
          window.location.href = "../views/dashboard.html";
        }, 800);

      } else {
        message.style.color = "red";
        message.innerText = data.message || "Login failed";
      }

    } catch (error) {
      message.style.color = "red";
      message.innerText = "Server not reachable";
    }
  });
}


