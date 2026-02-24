const yearSelect = document.getElementById("yearSelect");

const currentYear = new Date().getFullYear();

// generate academic years (past + future)
for (let i = currentYear - 3; i <= currentYear + 3; i++) {
  const option = document.createElement("option");
  option.value = `${i} - ${i + 1}`;
  option.textContent = `${i} - ${i + 1}`;

  // set current year as default
  if (i === currentYear) {
    option.selected = true;
  }

  yearSelect.appendChild(option);
}

// login submit
// document.getElementById("loginForm").addEventListener("submit", function (e) {
//   e.preventDefault();


//   const selectedYear = yearSelect.value;
//   alert("Login Succefull \n Selected Academic Year: " + selectedYear);
// });