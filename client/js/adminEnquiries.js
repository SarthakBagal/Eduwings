const form = document.getElementById("studentEnquiryForm");

form.addEventListener("submit", async (e) => {

e.preventDefault();

const formData = new FormData(form);

const data = Object.fromEntries(formData);

try{

const res = await fetch("http://localhost:5000/api/student-enquiries",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

});

const result = await res.json();

console.log(result);

alert("Enquiry Saved Successfully");

form.reset();

}catch(err){

console.log("Error:",err);

}

});

//==============================================================//

const tableBody = document.getElementById("enquiryTableBody");

async function loadEnquiries() {

  try {

    const res = await fetch("http://localhost:5000/api/student-enquiries");

    const result = await res.json();

    tableBody.innerHTML = "";

    result.data.forEach(enquiry => {

      const row = document.createElement("tr");

      row.innerHTML = `
      <td>${enquiry.date ? new Date(enquiry.date).toLocaleDateString() : ""}</td>
      <td>${enquiry.title || ""}</td>
      <td>${enquiry.firstName || ""}</td>
      <td>${enquiry.middleName || ""}</td>
      <td>${enquiry.lastName || ""}</td>
      <td>${enquiry.program || ""}</td>
      <td>${enquiry.semester || ""}</td>
      <td>${enquiry.session || ""}</td>
      <td>${enquiry.contactNo || ""}</td>
      <td>${enquiry.address || ""}</td>
      <td>${enquiry.school || ""}</td>
      <td>${enquiry.landmark || ""}</td>
      <td>${enquiry.percentage || ""}</td>
      <td>${enquiry.medium || ""}</td>
      <td>${enquiry.reference || ""}</td>
      `;

      tableBody.appendChild(row);

    });

  } catch (error) {

    console.log("Error loading enquiries:", error);

  }

}

loadEnquiries();

