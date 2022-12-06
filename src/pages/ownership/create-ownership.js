import {SERVER_URL} from "../../../settings.js";
import {checkTokenGet, checkRoleAdmin} from "../../js/loginSettings.js";

let URL = SERVER_URL + "/ownership";

let router;

export function initCreateOwnership(navigoRouter) {
    checkRoleAdmin();
    router = navigoRouter
    document.getElementById("btn-create-ownership").onclick = addOwnership;
}

async function addOwnership() {

}
