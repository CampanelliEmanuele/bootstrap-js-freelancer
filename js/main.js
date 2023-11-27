const workTypes = {
    backend: "backend",
    frontend: "frontend",
    analysis: "projectAnalysis"
}

const prices = {
    [workTypes.backend]: 20.50,
    [workTypes.frontend]: 15.30,
    [workTypes.analysis]: 33.60
}

let discountCodes = [
    "YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"
]

const submitBtn = document.getElementById("submitBtn")

submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("discountCodeInput").style.color = "";

    let firstName = document.getElementById("firstNameInput").value;
    let lastName = document.getElementById("lastNameInput").value;
    let email = document.getElementById("emailInput").value;
    let hoursOfWorks = document.getElementById("hoursRequestedInput").value;
    hoursOfWorks = parseFloat(hoursOfWorks).toFixed(2);
    let workType = document.getElementById("workTypeInput").value;
    let discountCode = document.getElementById("discountCodeInput").value;
    let workCommission = document.getElementById("workCommissionInput").value;

    let price = calculatePrice(workType, discountCode, hoursOfWorks);

})

function calculatePrice(workType, discountCode, hoursOfWorks) {
    let finalPrice = -1;

    let arr = Object.values(workTypes);    /* Array with the values of workTypes */

    if (arr.includes(workType)) {
        switch (workType) {
            case workTypes.backend:
                finalPrice = hoursOfWorks * prices[workTypes.backend];
                break;
            case workTypes.frontend:
                finalPrice = hoursOfWorks * prices[workTypes.frontend];
                break;
            case workTypes.analysis:
                finalPrice = hoursOfWorks * prices[workTypes.analysis];
                break;
            default:
        }
    }
    finalPrice = finalPrice.toFixed(2)

    if (discountCode !== "") {
        finalPrice = applyDiscount(discountCode, finalPrice)
    }

    console.log(discountCodes)
    console.log(finalPrice)

    return finalPrice
}

function applyDiscount(discountCode, finalPrice) {
    /* If there is a valid discount code */
    if (discountCodes.includes(discountCode)) {
        /* Removing the entered discount code from the array */
        discountCodes = discountCodes.filter(code => {
            return code !== discountCode;
        })

        /* Apply the discount */
        return (finalPrice * 0.75).toFixed(2);
    } else {
        invalidDiscountWarn(discountCode);
        return finalPrice;
    }
}

function invalidDiscountWarn(discountCode) {
    document.getElementById("discountCodeInput").style.color = "red";
    alert("Your discount code is invalid or has expired.\nPlease try another one.")
}