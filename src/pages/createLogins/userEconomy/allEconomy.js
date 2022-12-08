import {SERVER_URL} from "../../../../settings.js";
import {checkRoleEconomy, checkTokenGet} from "../../../js/loginSettings.js";

let URL = SERVER_URL + "/users/economy"

let economyUsers = []


export async function initGetAllEconomyUsers() {
    checkRoleEconomy();
    document.getElementById("table-body").onclick = (element) => {
        let id = element.target.id
        if (id.startsWith("btn-edit-economy-user-")) {
            editEconomyUserRedirect(id)
        }

    }
    try {
        economyUsers = await fetch(URL, await checkTokenGet())
            .then(res => res.json())

    } catch (e) {
        console.error(e)
    }

    const rows = economyUsers.map(economyUser =>
        `<tr style="opacity: 1">      
         <td>${economyUser.userName}</td>
           <td>${economyUser.firstName} ${economyUser.lastName}</td>
        <td><a href="tel:${economyUser.phoneNumber}">${economyUser.phoneNumber}</a </td>
        <td> <a href="mailto:${economyUser.email}">${economyUser.email}</a></td> 
        <td>${economyUser.ownership}</td>
        <td>${economyUser.status}</td>
                
          
            <td>
             <ul data-bs-toggle="modal" data-bs-target="#exampleModal" class="three-dots" >
                                    <li id="${economyUser.id}-column-id"  class="three-dots__dot"></li>
                                    <li id="${economyUser.id}-column-id"  class="three-dots__dot"></li>
                                    <li id="${economyUser.id}-column-id"  class="three-dots__dot"></li>
                                    
             </ul>
            </td>
        </tr>`
    )

    document.getElementById("table-body").innerHTML = rows.join("")





}

function editEconomyUserRedirect(id) {
    let economyUserId = id.split("-").pop()
    window.location.href = "/editLeaserUser?id=" + economyUserId
}