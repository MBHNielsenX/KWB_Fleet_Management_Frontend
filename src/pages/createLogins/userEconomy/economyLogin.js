import {SERVER_URL} from "../../../../settings.js";
import {checkRoleEconomy,checkTokenPost} from "../../../js/loginSettings.js";

let URL = SERVER_URL + "/users/economy"

export async function initCreateEconomyLogin() {
    checkRoleEconomy();
    document.getElementById("economy-create-login").onclick = economyLogin
}

async function economyLogin() {

    const firstName = document.getElementById("economy-first-name")
    const lastName = document.getElementById("economy-last-name")
    const email = document.getElementById("economy-email")
    const phoneNumber = document.getElementById("economy-phone-number")
    const password = document.getElementById("economy-password")
    const username = document.getElementById("economy-username")

    const economyObj = {
        firstName: firstName.value,
        lastName: lastName.value,
        phoneNumber: phoneNumber.value,
        email: email.value,
        userName: username.value,
        password: password.value
    }

    await fetch(URL, await checkTokenPost(economyObj))
        .then((res) => {
            if (res.status >= 400) {
                document.getElementById("economy-response-text-succes").style.display = "none";
                document.getElementById("economy-response-text-error").style.display = "block";
                document.getElementById("economy-response-text-error").innerHTML = 'Could not add user: ' + username.value;
                document.getElementById("economy-response-text-error").style.color = 'red';
            } else {
                document.getElementById("economy-response-text-succes").style.display = "block";
                document.getElementById("economy-response-text-error").style.display = "none";
                document.getElementById("economy-response-text-succes").style.color = 'green'
                document.getElementById("economy-response-text-succes").innerHTML = 'Added user: ' + username.value
                return res.json()
            }
        })
}
