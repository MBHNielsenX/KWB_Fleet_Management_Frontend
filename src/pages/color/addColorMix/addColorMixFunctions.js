import {checkRoleAdmin, checkTokenGet} from "../../../js/loginSettings.js";
import {SERVER_URL} from "../../../../settings.js"

let URL = SERVER_URL + "/color-mix/add/";
let ColorTypeURL = SERVER_URL + "/color-types"
let router;

let id
let brand

export function initAddColorMix(navigoRouter, match) {
    checkRoleAdmin()
    if (match?.params?.id) {
        id = match.params.id
        brand = match.params.brand
        console.log(brand)
        try {
            getSpecific(id, brand);
            getColorTypes();
        } catch (err) {

        }
    }
    const onClick = (event) => {
        let id = event.target.id.split('-')[event.target.id.split('-').length-1]
        if (event.target.id.startsWith("submit")) {
            addColorMix()
        }
    }
    window.addEventListener('click', onClick)
    router = navigoRouter
}
async function getColorTypes() {
    try {
        const data = await fetch(ColorTypeURL, await checkTokenGet()).then(res => res.json())
        console.log(data)
        const optionsArray = data.map(
            colorType =>
                `
                <option>${colorType.type}</option>
                `);
        const optionString = optionsArray.join("\n");
        document.getElementById("if3").innerHTML = optionString;
    } catch (err) {
        console.log(err);
    }
}

async function getSpecific(id, brand) {
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
            <td>${colorMix.colorTypesResponse.id}</td>
            </tr>
            `);
        const tableRowsString = tableRowsArray.join("\n");
        document.getElementById("tbody-all").innerHTML = tableRowsString;
        document.getElementById("header-title").innerHTML = brand;
    } catch(err) {
        console.log(err);
    }
}

async function deleteColorMix(id, brand) {
    const idDelete = document.getElementById("if1").value;
    URL = URL + "/" + idDelete
    console.log(URL)
    await fetch(URL, {
        method: "DELETE",

    }).then((res) => res.json()).then
    getSpecific(id, brand)
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


async function addColorMix() {
    const colorCode = document.getElementById("if1").value;
    const colorName = document.getElementById("if2").value;
    const colorTypeId = document.getElementById("if3").value;

    const newColorMix = {
        colorCode,
        colorTypeId,
        colorName
    };
    console.log(newColorMix)

    await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newColorMix),
    })
        .then((res) => res.json())

    getSpecific(id, brand)
}