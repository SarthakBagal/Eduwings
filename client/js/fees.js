    document.addEventListener("DOMContentLoaded", () => {

    // Fetch data from backend
    fetch("http://localhost:5000/api/fees/all")
    .then(res => res.json())
    .then(data => {
        console.log("Fees Data:", data);
    })
    .catch(err => console.log(err));


    // Select all view buttons
    const viewButtons = document.querySelectorAll(".view-btn");

    viewButtons.forEach(button => {

        button.addEventListener("click", () => {

            const action = button.getAttribute("data-action");

            console.log("Clicked:", action);

            handleView(action);

        });

    });

});


function handleView(action){

    switch(action){

        case "scholarship":
            window.location.href = "scholarship.html";
            break;

        case "feesCollection":
            window.location.href = "feesCollection.html";
            break;

        case "busFees":
            window.location.href = "busFees.html";
            break;

        case "otherFees":
            window.location.href = "otherFees.html";
            break;

        case "concession":
            window.location.href = "concession.html";
            break;

        case "studentCategory":
            window.location.href = "studentCategory.html";
            break;

        case "feesStructure":
            window.location.href = "feesStructure.html";
            break;

        case "report":
            window.location.href = "report.html";
            break;

        default:
            alert("Page not found");

    }

}