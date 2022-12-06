var URL = "http://localhost:8080/api/ownerships";
let router;
export function initOwnerships(navigoRouter) {
    router = navigoRouter
    getAllOwnerships();
}

async function getAllOwnerships() {
    document.getElementById("tbody-all").innerHTML = ""
    try{
        const data = await fetch(URL).then(res => res.json());
        const tableRowsArray = data.map(
            (ownership) =>
                `
        <tr>
            
            <td><input readonly type='text' id="text${ownership.id}" value='${ownership.name}'></td>
        `
        );
        const tableRowsString = tableRowsArray.join("\n");
        document.getElementById("tbody-all").innerHTML = tableRowsString;
    } catch(err) {
        console.log(err);
    }
}