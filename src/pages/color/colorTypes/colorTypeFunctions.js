var URL = "http://localhost:8080/api/color-types"
let router;

export function initColorTypes(navigoRouter) {

    document.getElementById("submit").onclick = addColorType;
    getAllColorTypes();
    router = navigoRouter
    document.getElementById("table").onclick = (element) =>{
        let id = element.target.id
        deleteColorType(id);
    }
}



async function getAllColorTypes() {
    document.getElementById("tbody-all").innerHTML = ""
    try{
        const data = await fetch(URL).then(res => res.json());
        console.log(data)
        const tableRowsArray = data.map(
            (colorType) =>
                `
        <tr>
            <td>${colorType.id}</td>
            <td>${colorType.type}</td>
            <button id="delete${colorType.id}">Delete</button>
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
    console.log(type)
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
    console.log(idToDelete)
    if(idToDelete.includes("delete")){
        idToDelete = idToDelete.split('delete')[1]
        URL = URL + "/" + idToDelete
        console.log(URL)
        await fetch(URL, {
            method: "DELETE",

        }).then((res) => res.json())
        location.reload();
    }


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


