import { checkRoleAdmin, checkTokenGet, checkTokenPost, checkTokenDelete } from "../../js/loginSettings.js";
import { SERVER_URL } from "../../../settings.js";
import { handleHttpErrors } from "../../../utils.js";
let URL = SERVER_URL + "/blacklist";



export async function initCreateBlackList() {
    checkRoleAdmin();
    getAllBlackList();
    document.getElementById("blacklist-create-btn").onclick = createBlackList;
}


async function getAllBlackList() {
    const blackListRes = await fetch(URL, await checkTokenGet()).then(res => handleHttpErrors(res));
    let ul = document.getElementById("list-of-blacklist");
    let li = document.createElement("li");
    blackListRes.map(blackList => {
        li.innerHTML = blackList.vinNumber+ ", STATUS: " + blackList.status;
        ul.appendChild(li);
    });

}

async function createBlackList() {
    const vinNumber = document.getElementById("vin-number-input-blacklist")
    const obj = {
        vinNumber: vinNumber.value
    }

    const blackListRes = await fetch(URL, await checkTokenPost(obj));
    getAllBlackList();

}