import {checkRoleAdmin, checkTokenGet} from "../../../js/loginSettings.js";
import {SERVER_URL} from "../../../../settings.js"
import {initColorMix} from "../colorMix/colorMixFunctions.js";

let URL = SERVER_URL + "/color-mix/add/";
let allColorMixURL = SERVER_URL + "/color-mix/"
let ColorTypeURL = SERVER_URL + "/color-types"
let router;

let id


export function initAddColorMix(navigoRouter, match) {
    checkRoleAdmin()
        try {
            initColorMix(navigoRouter, match)
            getColorTypes();
            getPreExistingColorMix()
        } catch (err) {
    }
    const onClick = (event) => {
        if (event.target.id.startsWith("submit")) {
            addColorMix()
        }
    }
    window.addEventListener('click', onClick)
    router = navigoRouter
}
async function getPreExistingColorMix() {
    try {
        const data = await fetch(allColorMixURL, await checkTokenGet()).then(res => res.json())
        console.log(data)
        const optionsArray = data.map(
            colorMix =>
                `
                <option>${colorMix.colorCode} ${colorMix.colorTypesResponse.type}</option>
                `);
        const optionString = optionsArray.join("\n");
        document.getElementById("if0").innerHTML = optionString;
    } catch (err) {
        console.log(err);
    }
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

async function deleteColorMix(id) {
    const idDelete = document.getElementById("if1").value;
    URL = URL + "/" + idDelete
    console.log(URL)
    await fetch(URL, {
        method: "DELETE",

    }).then((res) => res.json()).then
    getSpecific(id)
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

    getSpecific(id)
}