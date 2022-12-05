var URL = "http://localhost:8080/api/color-types"
let router;

export function initColorTypes(navigoRouter) {
    getAllColorTypes();
    router = navigoRouter
    document.getElementById("submit").onclick = addColorType;
    document.getElementById("table").onclick = (element) =>{
        let id = element.target.id
        if(id.includes("delete")) {
            deleteColorType(id);
        }
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
        const data = await fetch(URL).then(res => res.json());
        const tableRowsArray = data.map(
            (colorType) =>
                `
        <tr>
            <td id="color-type-id-${colorType.id}" value="${colorType.id}">${colorType.id}</td>
            <td><input readonly type='text' id="text${colorType.id}" value='${colorType.type}'></td>
            <td><button id="delete${colorType.id}">Delete</button></td>
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

    await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newColorType),
    })
        .then((res) => res.json())
    getAllColorTypes()

}

async function deleteColorType(idToDelete) {
    idToDelete = idToDelete.split('delete')[1]
    const response = await fetch(URL + "/" + idToDelete, {
        method: "DELETE",

    }).then((res) => res.json())
    location.reload();
}

async function editColorType(id) {
    const idToDelete = id.split('text')[1]
    const colorTypeId = document.getElementById("color-type-id-"+idToDelete).innerText
    const colorTypeText = document.getElementById(id).value;

    const editedColorType = {
        colorTypeId,
        colorTypeText
    };
    console.log(colorTypeId + " id")
    console.log(editedColorType)
    const data = await fetch(URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editedColorType),
    })
        .then((res) => res.json())

}





/*
async function editColorMix() {
    const colorMixId = document.getElementById("if4").value;
    const colorCode = document.getElementById("if1").value;
    const colorName = document.getElementById("if2").value;
    const colorTypeId = document.getElementById("if3").value;

    const editedColorMix = {
        colorMixId,
        colorCode,
        colorTypeId,
        colorName
    };

    console.log(editedColorMix)
    const id = await fetch(URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editedColorMix),
    })
        .then((res) => res.json())
}
*/


