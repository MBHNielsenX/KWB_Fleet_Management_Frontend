import {SERVER_URL} from "../../../../settings.js";
import {checkRoleAdmin,checkToken2} from "../../../js/loginSettings.js";

let URL = SERVER_URL + "/users/admin"

export async function initCreateAdminLogin() {
    checkRoleAdmin();
    document.getElementById("admin-create-login").onclick = adminLogin
}

async function adminLogin() {

    const firstName = document.getElementById("admin-first-name")
    const lastName = document.getElementById("admin-last-name")
    const email = document.getElementById("admin-email")
    const phoneNumber = document.getElementById("admin-phone-number")
    const password = document.getElementById("admin-password")
    const username = document.getElementById("admin-username")

    const adminObj = {
        firstName: firstName.value,
        lastName: lastName.value,
        phoneNumber: phoneNumber.value,
        email: email.value,
        userName: username.value,
        password: password.value
    }

    await fetch(URL, await checkToken2(adminObj))
        .then((res) => {
            if (res.status >= 400) {
                document.getElementById("admin-response-text-succes").style.display = "none";
                document.getElementById("admin-response-text-error").style.display = "block";
                document.getElementById("admin-response-text-error").innerHTML = 'Could not add user: ' + username.value;
                document.getElementById("admin-response-text-error").style.color = 'red';
            } else {
                document.getElementById("admin-response-text-succes").style.display = "block";
                document.getElementById("admin-response-text-error").style.display = "none";
                document.getElementById("admin-response-text-succes").style.color = 'green'
                document.getElementById("admin-response-text-succes").innerHTML = 'Added user: ' + username.value
                return res.json()
            }
        })
}
