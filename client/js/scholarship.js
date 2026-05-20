const table = document.querySelector("#studentTable tbody");

function loadStudents(){

fetch("/api/scholarship")
.then(res => res.json())
.then(students => {

table.innerHTML = "";

students.forEach((student,index)=>{

const row = document.createElement("tr");

row.innerHTML = `
<td>${index+1}</td>
<td>${student.name}</td>
<td>${student.category}</td>

<td>
<input type="text"
value="${student.reference || ""}"
id="ref-${student._id}">
</td>

<td>
<label class="toggle">
<input type="checkbox"
id="toggle-${student._id}"
${student.submitted ? "checked" : ""}>
<span class="slider"></span>
</label>
</td>
`;

table.appendChild(row);

// ADD EVENT LISTENER
const toggle = row.querySelector(`#toggle-${student._id}`);

toggle.addEventListener("change", function(){

const reference = document.getElementById(`ref-${student._id}`).value;

updateStudent(student._id,this.checked,reference);

});

});

})
.catch(err=>{
console.log("Error loading scholarship data",err);
});

}

loadStudents();


function updateStudent(id,submitted){

const reference = document.getElementById(`ref-${id}`).value

fetch(`/api/scholarship/${id}`,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
reference:reference,
submitted:submitted
})
})
.then(res=>res.json())
.then(data=>{
console.log("Student updated",data)

// 👇 ADD THIS
loadStudents();

})
.catch(err=>{
console.log("Update failed",err)
})

}

