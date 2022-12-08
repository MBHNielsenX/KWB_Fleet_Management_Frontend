var URL = "http://localhost:8080/api/color-types"
let router;

let colorTypes = []

export async function initColorTypes(navigatorRouter) {
    getAllColorTypes()
    router = navigatorRouter
    document.getElementById("submit-new-color-type").onclick = (element) =>{
        addColorType();
    }
    document.getElementById("table").onclick = (element) =>{
        let id = element.target.id
        if(id.includes("3dots")){
            //document.getElementById()
        }
        /*
        if(id.includes("delete")) {
            deleteColorType(id);
        }

         */
    }

    document.getElementById("exampleModal").onclick = (element) =>{

    }


    document.getElementById("table").ondblclick = (element) =>{
        let id = element.target.id
        if(id.includes("text")){
            changeTdToInput(id);
        }
        var el = document.getElementById(id);
        el.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                console.log("Enter clicked "  + id)
                let field = document.getElementById(id)
                field.readOnly = true
                editColorType(id)
            }
        });
    }

}

function changeTdToInput(id){
    const field = document.getElementById(id)
    field.readOnly = false
}



async function getAllColorTypes() {
    document.getElementById("tbody-all").innerHTML = ""
    try{
        colorTypes = await fetch(URL).then(res => res.json());
        const tableRowsArray = colorTypes.map(
            (colorType) =>
                `
        <tr>
            
            <td><input readonly type='text' id="text${colorType.id}" value='${colorType.type}'></td>
           
             <td>
             <ul data-bs-toggle="modal" data-bs-target="#exampleModal" class="three-dots" >
                                    <li id="3dots${colorType.id}-column-id"  class="three-dots__dot"></li>
                                    <li id="3dots${colorType.id}-column-id"  class="three-dots__dot"></li>
                                    <li id="3dots${colorType.id}-column-id"  class="three-dots__dot"></li>
                                    
             </ul>
            </td>
        `
        );
        const tableRowsString = tableRowsArray.join("\n");
        document.getElementById("tbody-all").innerHTML = tableRowsString;
    } catch(err) {
        console.log(err);
    }
}


async function addColorType() {
    const type = document.getElementById("if1").value;
    const newColorType = {
        type
    };

    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newColorType),
    })
        .then((res) => res.json())
    //window.location.reload();
    if(response.ok){
        colorTypes.add(response)
    }
    getAllColorTypes()
}

async function deleteColorType(idToDelete) {
    idToDelete = idToDelete.split('delete')[1]
    var r = confirm("If you delete this Color Type all associated color mixes will be deleted.");
    if (r==true)
    {
        const response = await fetch(URL + "/" + idToDelete, {
            method: "DELETE",

        }).then((res) => res.json())
        if(response.ok){
            colorTypes = colorTypes.filter(type => type.id !== response.id);
        }
        getAllColorTypes()
    }
}

async function editColorType(idFromJs) {
    const id = idFromJs.split('text')[1]
    const type = document.getElementById(idFromJs).value;
    const editedColorType = {
        id,
        type
    };
    const data = await fetch(URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editedColorType),
    })
        .then((res) => res.json())
    if(document.getElementById(idFromJs).value === data.type){
        document.getElementById(idFromJs).style.boxShadow = "0px 0px 20px 1px #00FF00";
    }else {
        document.getElementById(idFromJs).style.boxShadow = "0px 0px 20px 1px #FF0000";
    }
    setTimeout( () =>{
        document.getElementById(idFromJs).style.boxShadow = "none";
    }, 2000);

}
