import {SERVER_URL} from "../../../../settings.js";
import {checkRoleAdmin, checkTokenGet} from "../../../js/loginSettings.js";

let URL = SERVER_URL + "/users/admin"

let adminUsers = []


export async function initGetAllAdminUsers() {
    checkRoleAdmin();
    document.getElementById("table-body").onclick = (element) => {
        let id = element.target.id
        if (id.startsWith("btn-edit-economy-user-")) {
            editAdminUserRedirect(id)
        }
    }
    try {
        adminUsers = await fetch(URL, await checkTokenGet())
            .then(res => res.json())

    } catch (e) {
        console.error(e)
    }

    const rows = adminUsers.map(adminUser =>
        `<tr>      
         <td>${adminUser.userName}</td>
           <td>${adminUser.firstName} ${adminUser.lastName}</td>
        <td><a href="tel:${adminUser.phoneNumber}">${adminUser.phoneNumber}</a </td>
        <td> <a href="mailto:${adminUser.email}">${adminUser.email}</a></td> 
        <td>${adminUser.ownership}</td>
        <td>${adminUser.status}</td>
                
            <td>
                <button id="btn-edit-admin-user-${adminUser.id}" class="btn btn-primary">Edit</button>
            </td>
        </tr>`
    )
    document.getElementById("table-body").innerHTML = rows.join("")

}

function editAdminUserRedirect(id) {
    let adminUserId = id.split("-").pop()
    window.location.href = "/editAdminUser?id=" + adminUserId
}