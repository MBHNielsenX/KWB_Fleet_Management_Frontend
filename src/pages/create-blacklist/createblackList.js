import { checkRoleAdmin, checkTokenGet, checkTokenPost, checkTokenDelete, checkTokenPatch } from "../../js/loginSettings.js";
import { SERVER_URL } from "../../../settings.js";
import { handleHttpErrors } from "../../../utils.js";
let URL = SERVER_URL + "/blacklist";

let router;


export async function initCreateBlackList(navigoRouter) {
    checkRoleAdmin();
    getAllBlackList();
    document.getElementById("blacklist-create-btn").onclick = createBlackList;
    document.getElementById("blacklist-delete-btn").onclick = deleteBlackList;

    const onClick = (event) => {
        if (event.target.id.endsWith("-activated")) {
            let id = event.target.id.split("-")[0];
            deActivate(id);
        }else if (event.target.id.endsWith("-deactivated")) {
            let id = event.target.id.split("-")[0];
            activate(id);
        }
    }
    window.addEventListener('click', onClick);
    router = navigoRouter;
}


async function getAllBlackList() {
    const blackListRes = await fetch(URL, await checkTokenGet()).then(res => handleHttpErrors(res));
    let ul = document.getElementById("list-of-blacklist");
    blackListRes.map(blackList => {
        let activeOrNo = blackList.status == "ACTIVE" ? "activated" : "deactivated";
        ul.innerHTML += `<li>${blackList.vinNumber}, STATUS: ${blackList.status} <button id = "${blackList.vinNumber}-${activeOrNo}">${activeOrNo}</button></li>`
    });
}

async function createBlackList() {
    const vinNumber = document.getElementById("vin-number-input-blacklist")
    const obj = {
        vinNumber: vinNumber.value
    }

    await fetch(URL, await checkTokenPost(obj)).then(res => handleHttpErrors(res));
}

async function deleteBlackList() {
    const vinNumber = document.getElementById("vin-number-input-blacklist")


    await fetch(URL + "/" + vinNumber.value, await checkTokenDelete()).then(res => handleHttpErrors(res));

}

async function deActivate(vinNumber) {
    await fetch(URL + "/deactivate/" + vinNumber, await checkTokenPatch()).then(res => handleHttpErrors(res));
}

async function activate(vinNumber) {
    console.log("vinNumber: " + vinNumber);
    await fetch(URL + "/activate/" + vinNumber, await checkTokenPatch()).then(res => handleHttpErrors(res));
}


