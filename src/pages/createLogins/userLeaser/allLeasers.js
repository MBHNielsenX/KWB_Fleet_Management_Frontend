import {SERVER_URL} from "../../../../settings.js";
import {checkRoleLeaser, checkTokenGet} from "../../../js/loginSettings.js";

let URL = SERVER_URL + "/users/leaser"

let leaserUsers = []


export async function initGetAllLeaserUsers() {
    checkRoleLeaser();
    document.getElementById("table-body").onclick = (element) => {
        let id = element.target.id
        if (id.startsWith("btn-edit-leaser-user-")) {
            editLeaserUserRedirect(id)
        }

    }
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
                
            <td>
                <button id="btn-edit-leaser-user-${leaserUser.id}" class="btn btn-primary">Edit</button>
            </td>
        </tr>`
    )
    document.getElementById("table-body").innerHTML = rows.join("")

}

function editLeaserUserRedirect(id) {
    let leaserUserId = id.split("-").pop()
    window.location.href = "/editLeaserUser?id=" + leaserUserId
}