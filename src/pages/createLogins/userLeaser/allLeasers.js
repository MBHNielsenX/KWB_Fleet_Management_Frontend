import {SERVER_URL} from "../../../../settings.js";
import {checkRoleLeaser, checkTokenDelete, checkTokenGet} from "../../../js/loginSettings.js";
import {rowHighlight} from "../../../js/modulLoad.js";



let URL = SERVER_URL + "/users/leaser/"

let leaserUsers = []

let router;

export async function initGetAllLeaserUsers(match, navigoRouter) {
    router = navigoRouter;
    checkRoleLeaser();
    getLeaserUsers()
    // get last td in row and add event listener to it
    document.getElementById("editLeaser").onclick = toEditPage;
    document.getElementById("deleteLeaser").onclick = deleteLeaser;

    router = navigoRouter;
    if (match?.params?.id) {
        const id = match.params.id;
        try {
            getLeaserUsers();

        } catch (error) {
            document.getElementById("error").innerHTML = "Could not find Leaser: " + id;
        }
    }
}
export async function getLeaserUsers() {


    try {
        leaserUsers = await fetch(URL, await checkTokenGet())
            .then(res => res.json())

    } catch (e) {
        console.error(e)
    }

    const rows = leaserUsers.map(leaserUser =>
        `<tr>
            <td>${leaserUser.companyName}</td>
        <td>${leaserUser.companyEuVatNumber}</td>
        <td><a href="tel:${leaserUser.phoneNumber}">${leaserUser.phoneNumber}</a> <a href="mailto:${leaserUser.email}">${leaserUser.email}</a></td> 
    
        <td>${leaserUser.firstName} ${leaserUser.lastName}</td>
        <td>${leaserUser.username}</td>
        <td>${leaserUser.addressLine1}, ${leaserUser.city}, ${leaserUser.zipCode}, ${leaserUser.country}</td>
        <td>${leaserUser.addressLine2}</td>
        <td>${leaserUser.ownership}</td>
        <td>${leaserUser.status}</td>
        <td id="${leaserUser.id}-menu" data-bs-toggle="modal" data-bs-target="#exampleModal" class="click-event">
             <ul class="three-dots" >
                                    <li id="${leaserUser.id}-menu"  class="three-dots__dot"></li>
                                    <li id="${leaserUser.id}-menu"  class="three-dots__dot"></li>
                                    <li id="${leaserUser.id}-menu"  class="three-dots__dot"></li>
                                    
             </ul>
            </td>
        </tr>`
    )
    document.getElementById("table-body").innerHTML = rows.join("")
    let clickEvent = document.querySelectorAll(".click-event")
    // get all rows in table
    let rowsInTable = document.querySelectorAll("tr")
    // add event listener to all rows


    rowsInTable.forEach(row => row.addEventListener("click", rowHighlight))

    clickEvent.forEach(row => row.addEventListener("click", getIdFromModule))
}

async function getIdFromModule(evt) {
    const target = evt.target;
    if (!target.id.includes("-menu")) {
        return;

    }
    const id = target.id.replace("-menu", "");
    if (target.classList.contains("other-page")) {
        router.navigate("leaser?id=" + id);

    } else {

        const leaser = await fetch(URL + id).then((res) => res.json());
        document.getElementById("name").innerText = leaser.companyName;
        document.getElementById("id").innerText = leaser.id;
        console.log(id)
    }

}

function toEditPage() {
    const id = document.getElementById("id").innerText;
    router.navigate("/users/edit-leaser?id=" + id);
}

async function deleteLeaser(id) {
    id = document.getElementById("id").innerText;

    try {
        const response = await fetch(URL + id, await checkTokenDelete(id));
        if (response.status === 200) {
            document.getElementById("response-text-succes").style.display = "block";
            document.getElementById("response-text-error").style.display = "none";
            document.getElementById("response-text-succes").style.color = 'green'
            document.getElementById("response-text-succes").innerText = "Leaser deleted";
            setTimeout(() => {
                getLeaserUsers();
            }, 300);

        } else {
            document.getElementById("response-text-succes").style.display = "none";
            document.getElementById("response-text-error").style.display = "block";
            document.getElementById("response-text-error").innerText = "Failed to delete leaser";
            document.getElementById("response-text-error").style.color = 'red';
        }
    } catch (error) {
        console.log(error);
    }
}