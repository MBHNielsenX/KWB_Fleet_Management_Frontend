import {checkRoleAdmin, checkTokenGet} from "../../../js/loginSettings.js";
import {SERVER_URL} from "../../../../settings.js"

let URL = SERVER_URL + "/color-mix/c-mix/";
let specificCarURL = SERVER_URL + "/specific-car-model/"
let allColorMix = SERVER_URL + "/color-mix/"
let ColorTypeURL = SERVER_URL + "/color-types"
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
    } catch(err) {
        console.log(err);
    }
}

async function getAllColorMixes() {
    document.getElementById("tbody-all").innerHTML = ""
    try{
        const data = await fetch(URL, await checkTokenGet()).then(res => res.json());
        console.log(data)
        const tableRowsArray = data.map(
            (colorMix) =>
                `
        <tr>
            <td>${colorMix.id}</td>
            <td>${colorMix.colorName}</td>
            <td>${colorMix.colorCode}</td>
            <td>${colorMix.colorTypeId}</td>
        `
        );
        const tableRowsString = tableRowsArray.join("\n");
        document.getElementById("tbody-all").innerHTML = tableRowsString;
    } catch(err) {
        console.log(err);
    }
}


async function deleteColorMix() {
    const id = document.getElementById("if1").value;
    URL = URL + "/" + id
    console.log(URL)
    await fetch(URL, {
        method: "DELETE",

    }).then((res) => res.json()).then
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