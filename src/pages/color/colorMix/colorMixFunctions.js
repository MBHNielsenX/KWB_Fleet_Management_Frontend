import {checkRoleAdmin, checkTokenGet} from "../../../js/loginSettings.js";
import {SERVER_URL} from "../../../../settings.js"
import {rowHighlight} from "../../../js/modulLoad.js";

let URL = SERVER_URL + "/color-mix/c-mix/";
let specificCarURL = SERVER_URL + "/specific-car-model/"
let specificColorMix = SERVER_URL + "/color-mix/"
let deleteURL = SERVER_URL + "/brand-color-mix/"
let router;

let id


export function initColorMix(navigoRouter, match) {
    checkRoleAdmin()

    if (match?.params?.id) {
        id = match.params.id
        try {
            getSpecificCar(id);
        } catch (err) {

        }
    }
    const onClick = (event) => {
        if (event.target.id.startsWith("submit")) {
            addColorMixRedirect(id)
        } else if (event.target.id.endsWith("edit-color-mix")) {

        } else if (event.target.id.endsWith("delete-color-mix")) {

        }
    }
    window.addEventListener('click', onClick)
    router = navigoRouter
}

async function getSpecificCar(id) {
    try {
        const data = await fetch(specificCarURL + id, await checkTokenGet()).then(res => res.json())
        if (Object.keys(data).length === 0) {
            throw new Error("No colormix found for id: " + id)
        }
        console.log(data)
        document.getElementById("header-title").innerHTML ="Colormixes for: " + data.brand + " " + data.model + " " + data.modelYear;
    } catch (err) {
        console.log(err)
    }
    getColormixes(id)
}


async function getColormixes(id) {
    document.getElementById("table-body").innerHTML = ""
    try {
        const data = await fetch(URL + id, await checkTokenGet()).then(res => res.json())
        if (Object.keys(data).length === 0) {
            throw new Error("No colormix found for id: " + id)
        }
        console.log(data)
        const tableRowsArray = data.map(
            colorMix =>
                `
        <tr>
            <td>${colorMix.id}</td>
            <td>${colorMix.colorCode}</td>
            <td>${colorMix.colorName}</td>
            <td>${colorMix.colorTypesResponse.type}</td>
            <td id="${colorMix.id}" data-bs-toggle="modal" data-bs-target="#exampleModal" class="click-event">
               <ul  class="three-dots" >
                                    <li id="${colorMix.id}-menu"  class="three-dots__dot"></li>
                                    <li id="${colorMix.id}-menu"  class="three-dots__dot"></li>
                                    <li id="${colorMix.id}-menu"  class="three-dots__dot"></li>
                                    
             </ul>
            </td>
            
        </tr>
            `);
        document.getElementById("table-body").innerHTML = tableRowsArray.join("\n");
        let clickEvent = document.querySelectorAll(".click-event")
        let rowsInTable = document.querySelectorAll("tr")
        rowsInTable.forEach(row => row.addEventListener("click", rowHighlight))
        clickEvent.forEach(row => row.addEventListener("click", getIdFromModule))
    } catch(err) {
        console.log(err);
    }
}


async function checkBrandColorMix() {
    const colorMixId = document.getElementById("hidden-id").innerText;
    const data = await fetch(deleteURL + id + "/" + colorMixId, await checkTokenGet()).then(res => res.json());
    if (Object.keys(data).length === 0) {
        throw new Error("No BrandColorMix found")
    } else {
        console.log(data.id)
        deleteColorMix(data.id)
    }
}

async function getIdFromModule(evt) {
    const target = evt.target;
    if (!target.id.includes("-menu")) {
        return;
    }
    const id = target.id.replace("-menu", "");
    if (target.classList.contains("other-page")) {
        addColorMixRedirect(id)

    } else {

        const colorMix = await fetch(specificColorMix + id).then((res) => res.json());
        console.log(colorMix)
        document.getElementById("hidden-name").innerText = colorMix.colorName;
        document.getElementById("hidden-id").innerText = colorMix.id;
        console.log(id)
    }

}


async function deleteColorMix(brandColorMixId) {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const response = await fetch(deleteURL + brandColorMixId, options);
        if (response.status === 200) {
            document.getElementById("response-text-succes").style.display = "block";
            document.getElementById("response-text-error").style.display = "none";
            document.getElementById("response-text-succes").style.color = 'green'
            document.getElementById("response-text-succes").innerText = "BrandColorMix deleted";
            setTimeout(() => {
                getBuyerUsers();
            }, 300);

        } else {
            document.getElementById("response-text-succes").style.display = "none";
            document.getElementById("response-text-error").style.display = "block";
            document.getElementById("response-text-error").innerText = "Failed to delete BrandColorMix";
            document.getElementById("response-text-error").style.color = 'red';
        }
    } catch (error) {
        console.log(error);
    }
}


async function editColorMix() {
    const colorMixId = document.getElementById("if4").value;
    const colorCode = document.getElementById("if1").value;
    const colorName = document.getElementById("if2").value;
    const colorTypeId = document.getElementById("if3").value;

    const editedColorMix = {
        colorMixId,
        colorCode,
        colorTypeId,
        colorName
    };

    console.log(editedColorMix)
    const id = await fetch(URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editedColorMix),
    })
        .then((res) => res.json())
}


async function addColorMixRedirect(id) {
    router.navigate(`color-mix/add?id=${id}`)
}