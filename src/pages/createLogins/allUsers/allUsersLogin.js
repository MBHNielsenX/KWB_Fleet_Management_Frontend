import { SERVER_URL } from "../../../../settings.js";
import { checkRoleAdmin, checkToken1 } from "../../../js/loginSettings.js";
import { paginator } from "../../../../lib/paginator/paginate-bootstrap.js"

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

    const allAdminUsers = await fetch(URL_ADMIN,await checkToken1()).then(r => r.json())

    const tr =document.createElement("tr")

    allAdminUsers.forEach(adminUser => {

        tr.innerHTML = `
        <td>${adminUser.id}</td>
        <td>${adminUser.userName}</td>
        <td>${adminUser.firstName}  ${adminUser.lastName}</td>
        <td><a href="tel:${adminUser.phoneNumber}">${adminUser.phoneNumber}</a></td>
        <td><a href="mailto:${adminUser.email}">${adminUser.email}</a></td>
        <td><button id="${adminUser.id}-edit-btn">3 dot</button></td>
        `

        document.getElementById("admin-users-tbody").appendChild(tr)
    })

}
async function getEconomyUsers(){
    document.getElementById("economy-users-tbody").innerHTML = "";
    const allAdminUsers = await fetch(URL_ECONOMY,await checkToken1()).then(r => r.json())
    const tr =document.createElement("tr")
    allAdminUsers.forEach(economyUser => {
        tr.innerHTML = `
        <td>${economyUser.id}</td>
        <td>${economyUser.userName}</td>
        <td>${economyUser.firstName} ${economyUser.lastName}</td>
        <td><a href="tel:${economyUser.phoneNumber}">${economyUser.phoneNumber}</a></td>
        <td><a href="mailto:${economyUser.email}">${economyUser.email}</a></td>
        <td><button id="${economyUser.id}-edit-btn">3 dot</button></td>
        `
        document.getElementById("economy-users-tbody").appendChild(tr)
    })

}
async function getBuyerUsers(){

    document.getElementById("buyer-users-tbody").innerHTML = "";
    const allAdminUsers = await fetch(URL_BUYER,await checkToken1()).then(r => r.json())
    const tr =document.createElement("tr")
    allAdminUsers.forEach(buyerUser => {
        tr.innerHTML = `
        <td>${buyerUser.id}</td>
        <td>${buyerUser.username}</td>
        <td>${buyerUser.firstName} ${buyerUser.lastName}</td>
        <td><a href="tel:${buyerUser.phoneNumber}">${buyerUser.phoneNumber}</a></td>
        <td><a href="mailto:${buyerUser.email}">${buyerUser.email}</a></td>
        <td>${buyerUser.companyName}</td>
        <td>${buyerUser.companyEuVatNumber}</td>
        <td>${buyerUser.addressLine1}</td>
        <td>${buyerUser.addressLine2}</td>
        <td>${buyerUser.country}</td>
        <td>${buyerUser.city}</td>
        <td>${buyerUser.zipCode}</td>
        <td>${buyerUser.viewableCarModels}</td>
        <td><button id="${buyerUser.id}-edit-btn">3 dot</button></td>
        `
        document.getElementById("buyer-users-tbody").appendChild(tr)
    })

}
async function getLeaserUsers(){

    document.getElementById("leaser-users-tbody").innerHTML = "";
    const allAdminUsers = await fetch(URL_LEASER,await checkToken1()).then(r => r.json())
    const tr =document.createElement("tr")
    allAdminUsers.forEach(leaserUser => {
        tr.innerHTML = `
        <td>${leaserUser.id}</td>
        <td>${leaserUser.username}</td>
        <td>${leaserUser.firstName} ${leaserUser.lastName}</td>
        <td><a href="tel:${leaserUser.phoneNumber}">${leaserUser.phoneNumber}</a></td>
        <td><a href="mailto:${leaserUser.email}">${leaserUser.email}</a></td>
        <td>${leaserUser.companyName}</td>
        <td>${leaserUser.companyEuVatNumber}</td>
        <td>${leaserUser.addressLine1}</td>
        <td>${leaserUser.addressLine2}</td>
        <td>${leaserUser.country}</td>
        <td>${leaserUser.city}</td>
        <td>${leaserUser.zipCode}</td>
        <td>${leaserUser.viewableCarModels}</td>
        <td><button id="${leaserUser.id}-edit-btn">3 dot</button></td>
        `
        document.getElementById("leaser-users-tbody").appendChild(tr)
    })

}
function openTable(evt, tableId) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tableId).style.display = "block";
    evt.currentTarget.className += " active";
}





