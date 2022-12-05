import {SERVER_URL} from "../../../settings.js";

let specificCarModels = [];

export async function initAllBrands(){

    try{
        specificCarModels = await fetch(SERVER_URL+"/specific-car-model/all-with-color-mix-count")
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
