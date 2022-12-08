import {checkRoleAdmin, checkTokenGet, checkTokenPut} from "../../../js/loginSettings.js";
var URL = "http://localhost:8080/api/color-types/"

export async function initEditColorTypes(match){
    document.getElementById("type-status").innerHTML = ""
    let id
    if (match?.params?.id) {
        id = match.params.id
        document.getElementById("hidden").value = id
        console.log("id" + id)
        try {
            await fetchColorType(id);
        } catch (err) {

        }
    }

    document.getElementById("btn-edit-color-type").onclick = (element) => {
        editBrand()
    }
}

async function fetchColorType(id){
    console.log(URL + id)
    try{
        const colorType = await fetch(URL + id).then(res => res.json())
        await insertPlaceholderText(colorType.type)
    }catch (e){
        console.log(e)
        document.getElementById("brand-status").innerHTML = "Brand with id: "+id+" could not be found."
    }
}

async function insertPlaceholderText(text){
    document.getElementById("input-type").placeholder = text
}

async function editBrand(){
    let id = document.getElementById("hidden").value
    const typeInput = document.getElementById("input-type").value;

    const updatedType = {
        id: id,
        type: typeInput
    };

    try {
        await fetch(URL, await checkTokenPut(updatedType))
        await insertPlaceholderText(updatedType)
        document.getElementById("type-status").innerHTML = "ColorType with id: "+id+" was successfully updated to " + typeInput
        setTimeout( () =>{
            router.navigate(`color-types`)
        }, 2000);
    }catch (e) {
        console.log(e)
        document.getElementById("type-status").innerHTML = "An error occurred while trying to edit colortype with id: "+id;
    }



}