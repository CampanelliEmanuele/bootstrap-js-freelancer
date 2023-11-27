const workTypes = {
    backend: "backend",
    frontend: "frontend",
    analysis: "projectAnalysis"
}



const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", function (event) {
    event.preventDefault();

    let firstName = document.getElementById("firstNameInput").value;
    let lastName = document.getElementById("lastNameInput").value;
    let email = document.getElementById("emailInput").value;
    let hoursOfWorks = document.getElementById("hoursRequestedInput").value;
    let workType = document.getElementById("workType").value;
    let discountCode = document.getElementById("discountCodeInput").value;
    let workCommission = document.getElementById("workCommissionInput").value;

    calculatePrice(workType, discountCode);

})

function calculatePrice(workType, discountCode) {
    let workTypesArr = Object.values(workTypes);    /* Array with the values of workTypes */
    if (workTypesArr.includes(workType)) {
        switch (workTypes) {
            case workType.backend:
                console.log("backend");
                break;
            case workType.frontend:
                console.log("frontend");
                break;
            case workType.analysis:
                console.log("analysis");
                break;
        }
    }
}