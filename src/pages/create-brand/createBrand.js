import {SERVER_URL} from "settings.js"
SERVER_URL += "/specific-car-model"

export async function initCreateBrand(){
    document.getElementById("btn-create-brand").onclick = addBrand
}

async function addBrand(){
    const newBrand = {
        brand: document.getElementById("input-brand").value,
        model: document.getElementById("input-model").value,
        modelYear: document.getElementById("input-model-year").value
    };

    const opts = {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(newBrand)
    };

    await fetch(SERVER_URL, opts)
        .then(response => {
            if (response.status === 200){
                document.getElementById("creation-status").style.color = "Green"
                document.getElementById("creation-status").innerHTML
                    = toTitleCase(newBrand.brand)
                    +" "
                    +toTitleCase(newBrand.model)
                    +", "
                    +newBrand.modelYear
                    +" was successfully created"
            } else {
                document.getElementById("creation-status").style.color = "Red"
                document.getElementById("creation-status").innerHTML
                = "An error occurred while adding the specified car"
            }
        })
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
        }
    );
}