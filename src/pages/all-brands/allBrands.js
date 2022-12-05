import {SERVER_URL} from "../../../settings.js";
let url = SERVER_URL+"/specific-car-model/all-with-color-mix-count"
import { checkRoleAdmin, checkTokenGet } from "../../js/loginSettings.js";

let specificCarModels = [];

export async function initAllBrands(){
    checkRoleAdmin()
    document.getElementById("table-body").onclick = (element) =>{
        let id = element.target.id
        if (id.startsWith("btn-add-color-mix-")){
            addColorMixRedirect(id)
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
            <td><button id="btn-add-color-mix-${specificCarModel.id}">Add Colormix</button></td>
            <td><button id="${specificCarModel.id}">Kebab menu</button></td>
        </tr>`)
        .join("")

    document.getElementById("table-body").innerHTML=rows
}

async function addColorMixRedirect(id){
    id = id.split('-')
    router.navigate(`color-mix?id=${id}`)
}
