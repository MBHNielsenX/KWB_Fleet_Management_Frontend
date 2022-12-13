import {SERVER_URL} from "../../../../settings.js";
import {checkRoleLeaser, checkTokenGet, checkTokenPut} from "../../../js/loginSettings.js";


let URL = SERVER_URL + "/users/leaser"

let id;
let tableId = "edit-form"

export async function initEditLeaser(match) {
    document.getElementById("response-text-succes").innerHTML = ""
    if (match?.params?.id) {
        id = match.params.id
        try {
            await fetchLeaserData(id);
        } catch (err) {

        }
    }

    document.getElementById("edit").onclick = () => {

        editLeaser()
    }

}

async function fetchLeaserData() {

    document.getElementById(tableId).innerHTML = ""
    let data = []
    try {
        const leaserUser = await fetch(URL + "/" + id).then(res => res.json())
        data.push(leaserUser)
        const tableRowsArray = data.map(
            (leaserUser) =>
                `
        <div class="floating">
                <input type="text" id="if1" class="floating__input" placeholder="Username" value="${leaserUser.username}">
                <label for="if1" class="floating__label" data-content="Username"></label>
            </div>
            <div class="floating">
                <input type="text" id="if2" class="floating__input" placeholder="Password" value="${leaserUser.password}">
                <label for="if2" class="floating__label" data-content="Password"></label>
            </div>

            <div class="floating">
                <input type="text" id="if3" class="floating__input" placeholder="eMail" value="${leaserUser.email}">
                <label for="if3" class="floating__label" data-content="eMail"></label>
            </div>

            <div class="floating">
                <input type="text" id="if4" class="floating__input" placeholder="Firstname" value="${leaserUser.firstName}">
                <label for="if4" class="floating__label" data-content="Firstname"></label>
            </div>

            <div class="floating">
                <input type="text" id="if5" class="floating__input" placeholder="Lastname" value="${leaserUser.lastName}">
                <label for="if5" class="floating__label" data-content="Lastname"></label>
            </div>
            <div class="floating">
                <input type="text" id="if6" class="floating__input" placeholder="Address 1" value="${leaserUser.addressLine1}">
                <label for="if6" class="floating__label" data-content="Address 1"></label>
            </div>
            <div class="floating">
                <input type="text" id="if7" class="floating__input" placeholder="Address 2" value="${leaserUser.addressLine2}">
                <label for="if7" class="floating__label" data-content="Address 2"></label>
            </div>
            <div class="floating">
                <input type="text" id="if8" class="floating__input" placeholder="Company Name" value="${leaserUser.companyName}">
                <label for="if8" class="floating__label" data-content="Company Name"></label>
            </div>
            <div class="floating">
                <input type="text" id="if9" class="floating__input" placeholder="Company EU VAT Number" value="${leaserUser.companyEuVatNumber}">
                <label for="if9" class="floating__label" data-content="Company EU VAT Number"></label>
            </div>
            <div class="floating">
                <input type="text" id="if10" class="floating__input" placeholder="Phone" value="${leaserUser.phoneNumber}">
                <label for="if10" class="floating__label" data-content="Phone"></label>
            </div>

            <div class="floating">
                <input type="text" id="if11" class="floating__input" placeholder="City" value="${leaserUser.city}">
                <label for="if11" class="floating__label" data-content="City"></label>
            </div>

            <div class="floating">
                <input type="text" id="if12" class="floating__input" placeholder="Country" value="${leaserUser.country}">
                <label for="if12" class="floating__label" data-content="Country"></label>
            </div>

            <div class="floating">
                <input type="text" id="if13" class="floating__input" placeholder="Zip Code" value="${leaserUser.zipCode}">
                <label for="if13" class="floating__label" data-content="Zip Code"></label>
            </div>
            <button class="primary-button" type="submit" id="edit">Edit Leaser User</button>
            
        `
        );

        document.getElementById(tableId).innerHTML = tableRowsArray.join("\n");

    } catch (e) {
        console.log(e)
        document.getElementById("response-text-succes").innerHTML = "Buyer with id: " + id + " could not be found."
    }
}

async function editLeaser() {
    const usernameInput = document.getElementById("if1").value;
    const passwordInput = document.getElementById("if2").value;
    const emailInput = document.getElementById("if3").value;
    const firstNameInput = document.getElementById("if4").value;
    const lastNameInput = document.getElementById("if5").value;
    const addressLine1Input = document.getElementById("if6").value;
    const addressLine2Input = document.getElementById("if7").value;
    const companyNameInput = document.getElementById("if8").value;
    const companyEuVatNumberInput = document.getElementById("if9").value;
    const phoneNumberInput = document.getElementById("if10").value;
    const cityInput = document.getElementById("if11").value;
    const countryInput = document.getElementById("if12").value;
    const zipCodeInput = document.getElementById("if13").value;


    const updatedLeaser = {
        id: id,
        username: usernameInput,
        password: passwordInput,
        email: emailInput,
        firstName: firstNameInput,
        lastName: lastNameInput,
        addressLine1: addressLine1Input,
        addressLine2: addressLine2Input,
        companyName: companyNameInput,
        companyEuVatNumber: companyEuVatNumberInput,
        phoneNumber: phoneNumberInput,
        city: cityInput,
        country: countryInput,
        zipCode: zipCodeInput


    };

    console.log(updatedLeaser)
    try {
        await fetch(URL, await checkTokenPut(updatedLeaser))

        router.navigate("/users/all-leasers")
        document.getElementById("response-text-succes").innerHTML = "Buyer: " + companyNameInput + " was successfully updated";

    } catch (e) {
        console.log(e)
    }
}