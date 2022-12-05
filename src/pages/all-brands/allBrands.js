import {SERVER_URL} from "../../../settings.js";
let url = SERVER_URL+"/specific-car-model/all-with-color-mix-count"
import { checkRoleAdmin, checkTokenGet } from "../../js/loginSettings.js";

let specificCarModels = [];

export async function initAllBrands(){
    checkRoleAdmin()
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
        </tr>`)
        .join("")

    document.getElementById("table-body").innerHTML=rows

}
