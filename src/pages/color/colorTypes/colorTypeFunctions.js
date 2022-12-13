import {checkRoleAdmin, checkTokenGet, checkTokenPost, checkTokenDelete} from "../../../js/loginSettings.js";

import { SERVER_URL } from "../../../../settings.js";
let URL = SERVER_URL + "/color-types/"

let router;
let tableId = "table-body"

let colorTypes = []
let targetId

export async function initColorTypes(navigatorRouter) {
    checkRoleAdmin()
    await getAllColorTypes()
    router = navigatorRouter

    document.getElementById("submit-new-color-type").onclick = () =>{
        addColorType();
    }

    document.getElementById("modal-content").onclick = (element) =>{
        let id = element.target.id
        console.log(targetId)

        if(id.includes("delete")){
            deleteColorType(targetId)
        }
        if(id.includes("edit")){
            router.navigate(`edit-color-types?id=${targetId}`)
        }
    }

}



async function getAllColorTypes() {
    document.getElementById(tableId).innerHTML = ""
    try{
        colorTypes = await fetch(URL, checkTokenGet).then(res => res.json());
        const tableRowsArray = colorTypes.map(
            (colorType) =>
                `
        <tr>
            <td>${colorType.type}</td>
          
             <td id="${colorType.id}-menu" data-bs-toggle="modal" data-bs-target="#exampleModal">
             <ul  class="three-dots" >
                                    <li id="${colorType.id}-column-id"  class="three-dots__dot"></li>
                                    <li id="${colorType.id}-column-id"  class="three-dots__dot"></li>
                                    <li id="${colorType.id}-column-id"  class="three-dots__dot"></li>
                                   
             </ul>
            </td>
        `
        );
        const tableRowsString = tableRowsArray.join("\n");
        document.getElementById(tableId).innerHTML = tableRowsString;
        rowHighlightColorType();

    } catch(err) {
        console.log(err);
    }
}


async function addColorType() {
    const type = document.getElementById("if1").value;
    const newColorType = {
        type
    };

    const response = await fetch(URL, await checkTokenPost(newColorType))
        .then((res) => res.json())
    //window.location.reload();
    if(response.ok){
        colorTypes.add(response)
    }
    await getAllColorTypes()
}

async function deleteColorType(idToDelete) {
    var r = confirm("If you delete this Color Type all associated color mixes will be deleted.");
    if (r==true)
    {
        const response = await fetch(URL + idToDelete, await checkTokenDelete()).then((res) => res.json())
        if(response.ok){
            colorTypes = colorTypes.filter(type => type.id !== response.id);
        }
        await getAllColorTypes()
    }
}

function rowHighlightColorType() {
    document.getElementById(tableId).onclick = (element) => {
        let id = element.target.id
        if (id.endsWith("-column-id") || id.endsWith("-menu")) {
            if(id.endsWith("-column-id")){
                targetId = id.split('-column-id')[0]
            }
            else{
                targetId = id.split('-menu')[0]
            }
            console.log(targetId)
            // the clicked row
            let row = document.getElementById(id).closest("tr")
            // the other rows
            let rows = document.getElementById(tableId).children
            for (let i = 0; i < rows.length; i++) {
                if (rows[i] !== row) {
                    rows[i].style.opacity = "0.5"
                }
            }
        }

    }

    document.getElementById("exampleModal").addEventListener("hidden.bs.modal", () => {
            let rows = document.getElementById(tableId).children
            for (let i = 0; i < rows.length; i++) {
                rows[i].style.opacity = "1"
            }

        }
    )

}
