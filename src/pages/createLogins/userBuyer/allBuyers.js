import {SERVER_URL} from "../../../../settings.js";
import {checkRoleBuyer, checkTokenGet} from "../../../js/loginSettings.js";

let URL = SERVER_URL + "/users/buyer"

let buyerUsers = []


export async function initGetAllBuyerUsers() {
    checkRoleBuyer();
    document.getElementById("table-body").onclick = (element) => {
        let id = element.target.id
        if (id.startsWith("btn-edit-buyer-user-")) {
            editLeaserUserRedirect(id)
        }

    }
    try {
        buyerUsers = await fetch(URL, await checkTokenGet())
            .then(res => res.json())

    } catch (e) {
        console.error(e)
    }

    const rows = buyerUsers.map(buyerUser =>
        `<tr>
            <td>${buyerUser.companyName}</td>
        <td>${buyerUser.companyEuVatNumber}</td>
        <td><a href="tel:${buyerUser.phoneNumber}">${buyerUser.phoneNumber}</a> <a href="mailto:${buyerUser.email}">${buyerUser.email}</a></td> 
    
        <td>${buyerUser.firstName} ${buyerUser.lastName}</td>
        <td>${buyerUser.username}</td>
        <td>${buyerUser.addressLine1}, ${buyerUser.city}, ${buyerUser.zipCode}, ${buyerUser.country}</td>
        <td>${buyerUser.addressLine2}</td>
        <td>${buyerUser.ownership}</td>
        <td>${buyerUser.status}</td>
                
            <td>
                <button id="btn-edit-buyer-user-${buyerUser.id}" class="btn btn-primary">Edit</button>
            </td>
        </tr>`
    )
    document.getElementById("table-body").innerHTML = rows.join("")

}

function editLeaserUserRedirect(id) {
    let buyerUserId = id.split("-").pop()
    window.location.href = "/editLeaserUser?id=" + buyerUserId
}