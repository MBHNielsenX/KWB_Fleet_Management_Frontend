var URL = "http://localhost:8080/api/ownerships";
let router;

export function initOwnerships(navigoRouter) {
    document.getElementById("submit").onclick = addOwnership;
    getAllOwnerships();
}

async function getAllOwnerships() {
    document.getElementById("thRow").innerHTML = ""
    try{
        const data = await fetch(URL).then(res => res.json());
        console.log(data)
        const tableRowsArray = data.map(
            (ownership) =>
                `
            <tr>
            <td>${ownership.id}</td>
            <td>${ownership.ownership}</td>
         
        `
        );
        const tableRowsString = tableRowsArray.join("\n");
        document.getElementById("thRow").innerHTML = tableRowsString;
    } catch(err) {
        console.log(err);
    }
}