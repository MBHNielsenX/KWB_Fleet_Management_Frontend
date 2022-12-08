import {SERVER_URL} from "../../../settings.js";
import {checkTokenGet, checkRoleAdmin} from "../../js/loginSettings.js";

let URL = SERVER_URL + "/ownership";

let router;

export function initCreateOwnership(navigoRouter) {
    checkRoleAdmin();
    router = navigoRouter
    document.getElementById("submit-ownership").onclick = addOwnership
}

function addOwnership() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "name": document.getElementById("name").value,
        "abbreviation": document.getElementById("abbreviation").value
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("http://localhost:8080/api/ownership", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

