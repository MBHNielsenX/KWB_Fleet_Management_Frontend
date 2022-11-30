import {SERVER_URL} from "../../../settings";

export async function initAllBrands(){

}

let specificCarModels = [];

async function displayAllBrands(){
    try{
        specificCarModels = await fetch(SERVER_URL+"specific-car-model")
            .then(res => res.json())
    } catch (e){
        console.error(e)
    }

    const rows = specificCarModels.map(specificCarModel =>
        `<tr>
            <td>${specificCarModel.brand}</td>
            <td>${specificCarModel.model}</td>
            <td>${specificCarModel.modelYear}</td>
        </tr>`)
        .join("")

    document.getElementById("table-body").innerHTML=rows
}