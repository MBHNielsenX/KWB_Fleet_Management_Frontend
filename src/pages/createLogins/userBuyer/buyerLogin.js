import {SERVER_URL} from "../../../../settings.js";
import {checkRoleBuyer, checkToken2} from "../../../js/loginSettings.js";

let URL = SERVER_URL + "/users/buyer"

export async function initCreateBuyerLogin() {
    checkRoleBuyer();
    document.getElementById("buyer-create-login").onclick = buyerLogin
}

async function buyerLogin() {

    const firstName = document.getElementById("buyer-first-name")
    const lastName = document.getElementById("buyer-last-name")
    const email = document.getElementById("buyer-email")
    const phoneNumber = document.getElementById("buyer-phone-number")
    const password = document.getElementById("buyer-password")
    const username = document.getElementById("buyer-username")
    const companyName = document.getElementById("buyer-company-name")
    const companyEuVatNumber = document.getElementById("buyer-company-eu-vat-number")
    const addressLine1 = document.getElementById("buyer-address-line-1")
    const addressLine2 = document.getElementById("buyer-address-line-2")
    const city = document.getElementById("buyer-city")
    const zipCode = document.getElementById("buyer-zip-code")
    const country = document.getElementById("buyer-country")

    const buyerObj = {
        firstName: firstName.value,
        lastName: lastName.value,
        phoneNumber: phoneNumber.value,
        email: email.value,
        username: username.value,
        password: password.value,
        companyName: companyName.value,
        companyEuVatNumber: companyEuVatNumber.value,
        addressLine1: addressLine1.value,
        addressLine2: addressLine2.value,
        city: city.value,
        zipCode: zipCode.value,
        country: country.value
    }

    await fetch(URL, await checkToken2(buyerObj))
        .then((res) => {
            if (res.status >= 400) {
                document.getElementById("buyer-response-text-succes").style.display = "none";
                document.getElementById("buyer-response-text-error").style.display = "block";
                document.getElementById("buyer-response-text-error").innerHTML = 'Could not add user: ' + username.value;
                document.getElementById("buyer-response-text-error").style.color = 'red';
            } else {
                document.getElementById("buyer-response-text-succes").style.display = "block";
                document.getElementById("buyer-response-text-error").style.display = "none";
                document.getElementById("buyer-response-text-succes").style.color = 'green'
                document.getElementById("buyer-response-text-succes").innerHTML = 'Added user: ' + username.value
                return res.json()
            }
        })
}
