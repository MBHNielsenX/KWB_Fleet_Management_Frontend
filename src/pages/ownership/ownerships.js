import { SERVER_URL } from "../../../settings.js";
import { checkTokenGet, checkRoleAdmin } from "../../js/loginSettings.js";
let URL = SERVER_URL + "/ownership";

let router;
export function initOwnerships(navigoRouter) {
    checkRoleAdmin();
    router = navigoRouter
    getAllOwnerships()
    document.getElementById
}

async function getAllOwnerships() {

        const data = await fetch(URL, await checkTokenGet()).then(res => res.json());
        const tableRowsArray = data.map(
            ownership =>
                `
        <tr>
            <td>${ownership.id}</td>
            <td>${ownership.name}</td>
            <td>${ownership.abbreviation}</td>
            </tr>
        `
        );
        const tableRowsString = tableRowsArray.join("");
        document.getElementById("tbody-ownership").innerHTML = tableRowsString;
}

function deleteOwnership(id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "id": document.getElementById("id").value
    });

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`${URL}/${id}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

