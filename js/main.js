/* Data structures */

/* Type of works */
const workTypes = {
    backend: "backend",
    frontend: "frontend",
    analysis: "projectAnalysis"
}

/* Work types */
const prices = {
    [workTypes.backend]: 20.50,
    [workTypes.frontend]: 15.30,
    [workTypes.analysis]: 33.60
}

/* Discount codes */
let discountCodes = [
    "YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"
]

let AllValidInputs = true;

const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("discountCodeInput").style.color = "";

    /* Getting inputs */
    let firstName = document.getElementById("firstNameInput").value;
    let lastName = document.getElementById("lastNameInput").value;
    let email = document.getElementById("emailInput").value;
    let hoursOfWork = document.getElementById("hoursRequestedInput").value;
    hoursOfWork = parseFloat(hoursOfWork);
    let workType = document.getElementById("workTypeInput").value;
    let discountCode = document.getElementById("discountCodeInput").value;
    let workCommission = document.getElementById("workCommissionInput").value;

    let finalPrice = calculatePrice(workType, discountCode, hoursOfWork);

    /* If there are no issues can show a recup */
    if (AllValidInputs) {
        document.getElementById("recupSection").style.display = "block";
        showRecup(firstName, lastName, email, hoursOfWork, workType, finalPrice);
    } else {
        document.getElementById("recupSection").style.display = "none";
    }

})

/**
 * Calculate the price based on input parametes.
 * @param {string} workType 
 * @param {string} discountCode 
 * @param {number} hoursOfWork 
 * @returns the final price.
 */
function calculatePrice(workType, discountCode, hoursOfWork) {
    let finalPrice = -1;
    AllValidInputs = true;

    let arr = Object.values(workTypes);    /* Array with the values of workTypes */

    if (arr.includes(workType)) {
        switch (workType) {
            case workTypes.backend:
                finalPrice = hoursOfWork * prices[workTypes.backend];
                break;
            case workTypes.frontend:
                finalPrice = hoursOfWork * prices[workTypes.frontend];
                break;
            case workTypes.analysis:
                finalPrice = hoursOfWork * prices[workTypes.analysis];
                break;
            default:
        }
    }
    finalPrice = finalPrice.toFixed(2)

    if (discountCode !== "") {
        finalPrice = applyDiscount(discountCode, finalPrice)
    }

    return finalPrice
}

/**
 * Discount price based on the validity of the discount code, otherwise it shows an error message.
 * @param {string} discountCode 
 * @param {number} finalPrice 
 * @returns discounted final price
 */
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
        AllValidInputs = false;
        invalidDiscountWarn(discountCode);
        return finalPrice;
    }
}

/**
 * Shows an error message to the user.
 * @param {string} discountCode 
 */
function invalidDiscountWarn(discountCode) {
    document.getElementById("discountCodeInput").style.color = "red";
    alert(`Your discount code ${discountCode} is invalid or has expired.\nPlease try another one.`)
}

/**
 * Shows a little recup.
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} email 
 * @param {number} hoursOfWork 
 * @param {string} workType 
 * @param {string} finalPrice 
 */
function showRecup(firstName, lastName, email, hoursOfWork, workType, finalPrice) {
    document.getElementById("recup").innerHTML = `
        <b>${firstName} ${lastName}</b> has required a service of <b>${workType}</b> for <b>${hoursOfWork.toFixed(0)} hours</b>, for a total price of <b>${finalPrice}€</b>.
        We will send you and email at <b>${email}</b> to confirm the job.
    `;
}
