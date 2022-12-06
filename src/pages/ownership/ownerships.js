var URL = "http://localhost:8080/api/ownerships";
let router;
export function initOwnerships(navigoRouter) {
    router = navigoRouter
    getAllOwnerships();
}

async function getAllOwnerships() {

        const data = await fetch(URL).then(res => res.json());
        const tableRowsArray = data.map(
            ownership =>
                `
        <tr>
            
            <td>${ownership.id}</td>
            <td>${ownership.name}</td>
            </tr>
        `
        );
        const tableRowsString = tableRowsArray.join("");
        document.getElementById("tbody-ownership").innerHTML = tableRowsString;
}