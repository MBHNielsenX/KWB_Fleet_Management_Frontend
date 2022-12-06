import {SERVER_URL} from "../../../settings.js";
import {checkRoleAdmin, checkTokenPut, checkTokenGet} from "../../js/loginSettings.js";
let url = SERVER_URL+"/specific-car-model/"

export async function initEditBrand(match){
    const id = match.params.id
    checkRoleAdmin()
    await fetchBrand(id)
    document.getElementById("btn-edit-brand").addEventListener("click", (e) => {
        e.preventDefault();
        editBrand(id)
    });
}

async function fetchBrand(id){
    try{
        const brand = await fetch(url+id, await checkTokenGet()).then(res => res.json())
        console.log(brand.brand)
        await insertPlaceholderText(brand)
    }catch (e){
        console.log(e)
        document.getElementById("brand-status").innerHTML = "Brand with id: "+id+" could not be found."
    }
}

async function insertPlaceholderText(brand){
    document.getElementById("model-info-header").innerHTML = brand.modelYear+", "+brand.brand+" "+brand.model
    document.getElementById("input-brand").value = brand.brand
    document.getElementById("input-model").value = brand.model
    document.getElementById("input-model-year").value = brand.modelYear
}

async function updatePlaceholderText(brand){
    document.getElementById("model-info-header").innerHTML = brand.modelYear+", "+brand.brand+" "+brand.model;
    document.getElementById("input-brand").value = "";
    document.getElementById("input-model").value = "";
    document.getElementById("input-model-year").value = "";
}

async function editBrand(id){
    const oldBrand = await fetch(url+id, await checkTokenGet()).then(res => res.json())

    const inputBrand = document.getElementById("input-brand").value;
    const inputModel = document.getElementById("input-model").value;
    const inputModelYear = document.getElementById("input-model-year").value;

    const updatedBrand = {
        id: id,
        brand: inputBrand,
        model: inputModel,
        modelYear: inputModelYear
    };

    try {
        await fetch(url, await checkTokenPut(updatedBrand))
        await insertPlaceholderText(updatedBrand)
        document.getElementById("brand-status").innerHTML = "Model with id: "+id+" was successfully updated from "+oldBrand.modelYear+", "+oldBrand.brand+" "+oldBrand.model+" to "
        +updatedBrand.modelYear+", "+updatedBrand.brand+" "+updatedBrand.model
    }catch (e) {
        console.log(e)
        document.getElementById("brand-status").innerHTML = "An error occurred while trying to edit brand with id: "+id;
    }



}

