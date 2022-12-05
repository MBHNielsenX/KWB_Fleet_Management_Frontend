import {SERVER_URL} from "../../../../settings.js";
import {checkRoleLeaser, checkTokenPost} from "../../../js/loginSettings.js";

let URL = SERVER_URL + "/users/leaser"

export async function initCreateLeaserLogin() {
    checkRoleLeaser();
    document.getElementById("leaser-create-login").onclick = leaserLogin
}

async function leaserLogin() {

    const firstName = document.getElementById("leaser-first-name")
    const lastName = document.getElementById("leaser-last-name")
    const email = document.getElementById("leaser-email")
    const phoneNumber = document.getElementById("leaser-phone-number")
    const password = document.getElementById("leaser-password")
    const username = document.getElementById("leaser-username")
    const companyName = document.getElementById("leaser-company-name")
    const companyEuVatNumber = document.getElementById("leaser-company-eu-vat-number")
    const addressLine1 = document.getElementById("leaser-address-line-1")
    const addressLine2 = document.getElementById("leaser-address-line-2")
    const city = document.getElementById("leaser-city")
    const zipCode = document.getElementById("leaser-zip-code")
    const country = document.getElementById("leaser-country")

    const leaserObj = {
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

    await fetch(URL, await checkTokenPost(leaserObj))
        .then((res) => {
            if (res.status >= 400) {
                document.getElementById("leaser-response-text-succes").style.display = "none";
                document.getElementById("leaser-response-text-error").style.display = "block";
                document.getElementById("leaser-response-text-error").innerHTML = 'Could not add user: ' + username.value;
                document.getElementById("leaser-response-text-error").style.color = 'red';
            } else {
                document.getElementById("leaser-response-text-succes").style.display = "block";
                document.getElementById("leaser-response-text-error").style.display = "none";
                document.getElementById("leaser-response-text-succes").style.color = 'green'
                document.getElementById("leaser-response-text-succes").innerHTML = 'Added user: ' + username.value
                return res.json()
            }
        })
}
