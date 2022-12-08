
export function rowHighlight() {
    document.getElementById("table-body").onclick = (element) => {
        let id = element.target.id
        if (id.endsWith("-column-id")) {
            // the clicked row
            let row = document.getElementById(id).closest("tr")
            // the other rows
            let rows = document.getElementById("table-body").children
            for (let i = 0; i < rows.length; i++) {
                if (rows[i] !== row) {
                    rows[i].style.opacity = "0.5"
                }
            }
        }

    }


    document.getElementById("exampleModal").addEventListener("hidden.bs.modal", () => {
            let rows = document.getElementById("table-body").children
            for (let i = 0; i < rows.length; i++) {
                rows[i].style.opacity = "1"
            }

        }
    )
}