import {checkRoleAdmin, checkTokenGet, checkTokenPut} from "../../../js/loginSettings.js";
var URL = "http://localhost:8080/api/color-types/"
let tableId = "table-body-test"
let id
export async function initEditColorTypes(match){
    document.getElementById("type-status").innerHTML = ""
    if (match?.params?.id) {
        id = match.params.id
        try {
            await fetchColorType(id);
        } catch (err) {

        }
    }

    document.getElementById("edit-color-type").onclick = (element) => {
        editBrand()
    }
}

async function fetchColorType(id){
    document.getElementById(tableId).innerHTML = ""
    let data = []
    try{
        const colorType = await fetch(URL + id).then(res => res.json())
        data.push(colorType)
        const tableRowsArray = data.map(
            (colorType) =>
                `
        <tr>
            
            <td><input placeholder="${colorType.type}" type="text" id="if1"></td>
            <td><button id="edit-color-type">Edit</button></td>
            
        `
        );
        document.getElementById(tableId).innerHTML = tableRowsArray.join("\n");
    }catch (e){
        console.log(e)
        document.getElementById("brand-status").innerHTML = "Brand with id: "+id+" could not be found."
    }
}





async function editBrand(){
    const typeInput = document.getElementById("if1").value;

    const updatedType = {
        id: id,
        type: typeInput
    };

    try {
        await fetch(URL, await checkTokenPut(updatedType))
        document.getElementById("type-status").innerHTML = "ColorType with id: "+id+" was successfully updated to " + typeInput
        setTimeout( () =>{
            router.navigate(`color-types`)
        }, 2000);
    }catch (e) {
        console.log(e)
        document.getElementById("type-status").innerHTML = "An error occurred while trying to edit colortype with id: "+id;
    }



}