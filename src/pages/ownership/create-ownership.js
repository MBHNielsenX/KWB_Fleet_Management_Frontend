import { checkRoleAdmin} from "../../js/loginSettings";
import {SERVER_URL} from "../../../settings";
let url = SERVER_URL+"/ownerships"


export function initCreateOwnerships() {
    checkRoleAdmin();
        document.getElementById("btn-create-brand").onclick = addOwnership;
    }

    async function addOwnership() {
        const newOwnership = {
            ownershipID: document.getElementById("ownershipID").value,
            ownershipName: document.getElementById("ownershipName").value
        };

        await fetch(SERVER_URL + "/ownerships", await checkTokenPost(newOwnership))
            .then(response => {
                if (response.status === 200) {
                    document.getElementById("creation-status").style.color = "Green"
                    document.getElementById("creation-status").innerHTML
                        = toTitleCase(newOwnership.ownershipID)
                        + " "
                        + toTitleCase(newOwnership.ownershipName)
                        + " was successfully created"
                } else {
                    document.getElementById("creation-status").style.color = "Red"
                    document.getElementById("creation-status").innerHTML
                        = "An error occurred while adding the specified car"
                }
            })
    }

