import {SERVER_URL} from "../../../../settings.js";
import {checkRoleBuyer, checkTokenGet} from "../../../js/loginSettings.js";
import {rowHighlight} from "../../../js/modulLoad.js";

let URL = SERVER_URL + "/users/buyer/"

let buyerUsers = []
let router;

export async function initGetAllBuyerUsers(match, navigoRouter){
    router = navigoRouter;
    checkRoleBuyer()
    getBuyerUsers()
    // get last td in row and add event listener to it
    document.getElementById("editBuyer").onclick = toEditPage;
    document.getElementById("deleteBuyer").onclick = deleteBuyer;

    router = navigoRouter;
    if (match?.params?.id) {
        const id = match.params.id;
        try {
            getBuyerUsers();

        } catch (error) {
            document.getElementById("error").innerHTML = "Could not find Buyer: " + id;
        }
    }
}

export async function getBuyerUsers() {


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
       <td id="${buyerUser.id}-menu" data-bs-toggle="modal" data-bs-target="#exampleModal" class="click-event">
             <ul class="three-dots" >
                                    <li id="${buyerUser.id}-menu"  class="three-dots__dot"></li>
                                    <li id="${buyerUser.id}-menu"  class="three-dots__dot"></li>
                                    <li id="${buyerUser.id}-menu"  class="three-dots__dot"></li>
                                    
             </ul>
            </td>
        </tr>`
    )
    document.getElementById("table-body").innerHTML = rows.join("")
    let clickEvent =  document.querySelectorAll(".click-event")
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
        router.navigate("movie-title?id=" + id);

    } else {

        const buyer = await fetch(URL + id).then((res) => res.json());
        document.getElementById("name").innerText = buyer.companyName;
        document.getElementById("id").innerText = buyer.id;
        console.log(id)
    }

}

function toEditPage() {
    const id = document.getElementById("id").innerText;
    router.navigate("create-buyer?id=" + id);
}

async function deleteBuyer(id) {
    id = document.getElementById("id").innerText;
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const response = await fetch(URL + id, options);
        if (response.status === 200) {
            document.getElementById("response-text-succes").style.display = "block";
            document.getElementById("response-text-error").style.display = "none";
            document.getElementById("response-text-succes").style.color = 'green'
               document.getElementById("response-text-succes").innerText = "Buyer deleted";
            setTimeout(() => {
                getBuyerUsers();
            }, 300);

        } else {
            document.getElementById("response-text-succes").style.display = "none";
            document.getElementById("response-text-error").style.display = "block";
            document.getElementById("response-text-error").innerText = "Failed to delete buyer";
            document.getElementById("response-text-error").style.color = 'red';
        }

    } catch (error) {
        console.log(error);
    }
}

