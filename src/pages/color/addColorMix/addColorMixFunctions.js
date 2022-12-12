import {checkRoleAdmin, checkTokenGet} from "../../../js/loginSettings.js";
import {SERVER_URL} from "../../../../settings.js"
import {initColorMix} from "../colorMix/colorMixFunctions.js";

let URL = SERVER_URL + "/color-mix/"
let brandColorMixURL = SERVER_URL + "/brand-color-mix/"
let ColorTypeURL = SERVER_URL + "/color-types"
let router;
let colorMixData = []
let id


export function initAddColorMix(navigoRouter, match) {
    if (match?.params?.id) {
        id = match.params.id
    }
    checkRoleAdmin()
        try {
            initColorMix(navigoRouter, match)
            getColorTypes();
            getPreExistingColorMix()
        } catch (err) {
    }
    const onClick = (event) => {
        if (event.target.id.startsWith("submit-color-mix")) {
            addColorMix()
        } else if (event.target.id.startsWith("pre-existing-submit")){
            const colorMixId = document.getElementById("if0").value
            createBrandColorMix(colorMixId)
        }
    }
    window.addEventListener('click', onClick)
    router = navigoRouter
}
async function getPreExistingColorMix() {
    try {
        const data = await fetch(URL, await checkTokenGet()).then(res => res.json())
        colorMixData = data
        console.log(data)
        const optionsArray = data.map(
            colorMix =>
                `
                <option value="${colorMix.id}">${colorMix.colorCode}   (${colorMix.colorTypesResponse.type})</option>
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
                <option value="${colorType.id}">${colorType.type}</option>
                `);
        const optionString = optionsArray.join("\n");
        document.getElementById("if3").innerHTML = optionString;
    } catch (err) {
        console.log(err);
    }
}



async function addColorMix() {
    const colorCode = document.getElementById("if1").value.trim();
    const colorName = document.getElementById("if2").value.trim();
    const colorTypeId = document.getElementById("if3").value;
    let colorMixExists = false
    for (let i = 0; i < colorMixData.length; i++) {
        console.log(colorMixData[i].colorCode)
        console.log(colorMixData[i].colorName)
        console.log(colorMixData[i].colorTypesResponse.id)
        if (colorCode === colorMixData[i].colorCode && colorTypeId === colorMixData[i].colorTypeId && colorName === colorMixData[i].colorName) {
            colorMixExists = true
        }
    }
    if(!colorMixExists){
        console.log("colorcode "+ colorCode)
        if(colorCode !== "" && colorName !== ""){
            const newColorMix = {
                colorCode,
                colorTypeId,
                colorName
            };
            console.log(newColorMix)

            const data = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newColorMix),
            })
                .then((res) => res.json())

            console.log(data)
            createBrandColorMix(data.id)
        }
    }



}

async function createBrandColorMix(colorMixId) {
    const specificCarModelId = id
    const brandColorMix = {
        specificCarModelId,
        colorMixId
    };
    console.log(brandColorMix)

    await fetch(brandColorMixURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(brandColorMix),
    })
        .then((res) => res.json())

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

async function deleteColorMix(id) {
    const idDelete = document.getElementById("if1").value;
    URL = URL + "/" + idDelete
    console.log(URL)
    await fetch(URL, {
        method: "DELETE",

    }).then((res) => res.json()).then
}