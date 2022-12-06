import {SERVER_URL} from "../../../settings.js";
import {checkRoleAdmin, checkTokenDelete, checkTokenGet} from "../../js/loginSettings.js";

let url = SERVER_URL+"/specific-car-model/all-with-color-mix-count"
let deleteUrl = SERVER_URL+"/specific-car-model/"

let specificCarModels = [];

export async function initAllBrands(){
    checkRoleAdmin()
    document.getElementById("table-body").onclick = (element) =>{
        let id = element.target.id
        let brand = element.target.value
        if (id.startsWith("btn-add-color-mix-")){
            addColorMixRedirect(id, brand)
        if (id.startsWith("btn-add-color-mix-") || id.startsWith("link-view-color-mixes")){
            addColorMixRedirect(id)
        } else if (id.startsWith("btn-kebab-menu-")){
            displayKebabMenu(id)
        } else if (id.startsWith("link-delete-brand-")){
            deleteBrand(id)
        } else if (id.startsWith("link-edit-brand-")){
            editBrandRedirect(id)
        }

    }
    try{
        specificCarModels = await fetch(url, await checkTokenGet())
            .then(res => res.json())
    } catch (e){
        console.error(e)
    }

    const rows = specificCarModels.map(specificCarModel =>
        `<tr>
            <td>${specificCarModel.brand}</td>
            <td>${specificCarModel.model}</td>
            <td>${specificCarModel.modelYear}</td>
            <td>${specificCarModel.colorMixAmounts}</td>
            <td><button id="btn-add-color-mix-${specificCarModel.id}" value="${specificCarModel.brand}">Add Colormix</button></td>
            <td><button id="${specificCarModel.id}">Kebab menu</button></td>
            <ul id="kebab-menu-${specificCarModel.id}"></ul>
        </tr>`)
        .join("")

    document.getElementById("table-body").innerHTML=rows
}

async function getId(id){
    id = id.split('-')
    return id[id.length-1]
}

async function addColorMixRedirect(id, brand){
    router.navigate(`color-mix?id=${await getId(id)}&brand=${brand}`)
}

async function editBrandRedirect(id){
    router.navigate(`edit-brand?id=${await getId(id)}`)
}

async function displayKebabMenu(id){
    document.getElementById(id).innerHTML = `
    <li><a id="link-view-color-mixes-${id}"">View Color mixes</a></li>
    <li><a id="link-edit-brand-${id}">Edit Brand</a></li>
    <li><a id="link-delete-brand-${id}">Delete Brand</a></li>
    `;
}

async function deleteBrand(id){
    const confirmDeletion = confirm("Are you sure you wish to delete brand with id: " + await getId(id)+"?");
    try {
        if (confirmDeletion === true) {
            await fetch(deleteUrl + await getId(id), await checkTokenDelete())
            location.reload()
        }
    } catch (e){
        console.log(e)
    }
}
