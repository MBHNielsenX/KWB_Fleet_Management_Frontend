import { SERVER_URL } from "../../../../settings.js";
import { checkRoleAdmin, checkTokenGet } from "../../../js/loginSettings.js";
import { paginator } from "../../../../lib/paginator/paginate-bootstrap.js"
import {
    rowHighlight,
    rowHighlightAdmin,
    rowHighlightBuyer,
    rowHighlightEconomy,
    rowHighlightLeaser
} from "../../../js/modulLoad.js";

let URL_ADMIN = SERVER_URL + "/users/admin";
let URL_ECONOMY = SERVER_URL + "/users/economy";
let URL_BUYER = SERVER_URL + "/users/buyer";
let URL_LEASER = SERVER_URL + "/users/leaser";




export async function initAllUserLogin(){
    checkRoleAdmin()
    await getAdminUsers()
    document.getElementById("admin-user-table").onclick = function() {
        openTable(event, 'admin-table-user')
        getAdminUsers()
    }
    document.getElementById("leaser-user-table").onclick = function() {
        openTable(event, 'leaser-table-user')
        getLeaserUsers()
    }
    document.getElementById("buyer-user-table").onclick = function() {
        openTable(event, 'buyer-table-user')
        getBuyerUsers()
    }
    document.getElementById("economy-user-table").onclick = function() {
        openTable(event, 'economy-table-user')
        getEconomyUsers()
    }

}


async function getAdminUsers(){

    document.getElementById("admin-users-tbody").innerHTML = "";

    const allAdminUsers = await fetch(URL_ADMIN,await checkTokenGet()).then(r => r.json())

    const tr =document.createElement("tr")

    allAdminUsers.forEach(adminUser => {

        tr.innerHTML = `

        <td>${adminUser.userName}</td> 
        <td>${adminUser.firstName}  ${adminUser.lastName}</td>
        <td><a href="tel:${adminUser.phoneNumber}">${adminUser.phoneNumber}</a></td>  
        <td> <a href="mailto:${adminUser.email}">${adminUser.email}</a></td>
        <td>${adminUser.status}</td>
        <td id="admin-menu">
             <ul data-bs-toggle="modal" data-bs-target="#exampleModalAdmin" class="three-dots" >
                                    <li id="${adminUser.id}-column-id"  class="three-dots__dot"></li>
                                    <li id="${adminUser.id}-column-id"  class="three-dots__dot"></li>
                                    <li id="${adminUser.id}-column-id"  class="three-dots__dot"></li>
                                    
             </ul>
            </td>
        `

        document.getElementById("admin-users-tbody").appendChild(tr)
        rowHighlightAdmin()
    })

}
async function getEconomyUsers(){
    document.getElementById("economy-users-tbody").innerHTML = "";
    const allAdminUsers = await fetch(URL_ECONOMY,await checkTokenGet()).then(r => r.json())
    const tr =document.createElement("tr")
    allAdminUsers.forEach(economyUser => {
        tr.innerHTML = `
        <td>${economyUser.userName}</td>
        <td>${economyUser.firstName} ${economyUser.lastName}</td>
        <td><a href="tel:${economyUser.phoneNumber}">${economyUser.phoneNumber}</a></td> 
        <td><a href="mailto:${economyUser.email}">${economyUser.email}</a></td> 
        <td>${economyUser.ownership}</td>
        <td>${economyUser.status}</td>
        <td id="economy-menu">
             <ul data-bs-toggle="modal" data-bs-target="#exampleModalEconomy" class="three-dots" >
                                    <li id="${economyUser.id}-column-id"  class="three-dots__dot"></li>
                                    <li id="${economyUser.id}-column-id"  class="three-dots__dot"></li>
                                    <li id="${economyUser.id}-column-id"  class="three-dots__dot"></li>
                                    
             </ul>
            </td>
        `
        document.getElementById("economy-users-tbody").appendChild(tr)
        rowHighlightEconomy()
    })

}
async function getBuyerUsers(){

    document.getElementById("buyer-users-tbody").innerHTML = "";
    const allAdminUsers = await fetch(URL_BUYER,await checkTokenGet()).then(r => r.json())
    const tr =document.createElement("tr")
    allAdminUsers.forEach(buyerUser => {

        tr.innerHTML = `
       <td>${buyerUser.companyName}</td>
        <td>${buyerUser.companyEuVatNumber}</td>
        <td><a href="tel:${buyerUser.phoneNumber}">${buyerUser.phoneNumber}</a> <a href="mailto:${buyerUser.email}">${buyerUser.email}</a></td> 
    
        <td>${buyerUser.firstName} ${buyerUser.lastName}</td>
        <td>${buyerUser.username}</td>
        <td>${buyerUser.addressLine1}, ${buyerUser.city}, ${buyerUser.zipCode}, ${buyerUser.country}</td>
        <td>${buyerUser.addressLine2}</td>
        <td>${buyerUser.viewableCarModels}</td>
        <td>${buyerUser.status}</td>
        <td id="buyer-menu">
             <ul data-bs-toggle="modal" data-bs-target="#exampleModalBuyer" class="three-dots" >
                                    <li id="${buyerUser.id}-column-id"  class="three-dots__dot"></li>
                                    <li id="${buyerUser.id}-column-id"  class="three-dots__dot"></li>
                                    <li id="${buyerUser.id}-column-id"  class="three-dots__dot"></li>
                                    
             </ul>
            </td>
        `
        document.getElementById("buyer-users-tbody").appendChild(tr)
        rowHighlightBuyer()
    })

}
async function getLeaserUsers(){

    document.getElementById("leaser-users-tbody").innerHTML = "";
    const allAdminUsers = await fetch(URL_LEASER,await checkTokenGet()).then(r => r.json())
    const tr =document.createElement("tr")

    allAdminUsers.forEach(leaserUser => {

        tr.innerHTML = `
        <td>${leaserUser.companyName}</td>
        <td>${leaserUser.companyEuVatNumber}</td>
        <td><a href="tel:${leaserUser.phoneNumber}">${leaserUser.phoneNumber}</a> <a href="mailto:${leaserUser.email}">${leaserUser.email}</a></td> 
    
        <td>${leaserUser.firstName} ${leaserUser.lastName}</td>
        <td>${leaserUser.username}</td>
        <td>${leaserUser.addressLine1}, ${leaserUser.city}, ${leaserUser.zipCode}, ${leaserUser.country}</td>
        <td>${leaserUser.addressLine2}</td>
        <td>${leaserUser.ownership}</td>
        <td>${leaserUser.status}</td>
       <td id="leaser-menu">
             <ul data-bs-toggle="modal" data-bs-target="#exampleModalLeaser" class="three-dots" >
                                    <li id="${leaserUser.id}-column-id"  class="three-dots__dot"></li>
                                    <li id="${leaserUser.id}-column-id"  class="three-dots__dot"></li>
                                    <li id="${leaserUser.id}-column-id"  class="three-dots__dot"></li>
                                    
             </ul>
            </td>
        `
        document.getElementById("leaser-users-tbody").appendChild(tr)
        rowHighlightLeaser()
    })

}
function openTable(evt, tableId) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("filter-tabs__tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("filter-tabs__tab-links");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tableId).style.display = "block";
    evt.currentTarget.className += " active";
}





