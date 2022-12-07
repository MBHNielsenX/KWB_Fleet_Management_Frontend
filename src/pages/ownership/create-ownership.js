import {SERVER_URL} from "../../../settings.js";
import {checkTokenGet, checkRoleAdmin} from "../../js/loginSettings.js";

let URL = SERVER_URL + "/ownership";

let router;

export function initCreateOwnership(navigoRouter) {
    checkRoleAdmin();
    router = navigoRouter
    document.getElementById("btn-create-ownership").onclick = addOwnership
}

async function addOwnership() {
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
}

