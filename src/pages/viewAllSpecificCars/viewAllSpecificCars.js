import { checkRoleBuyer } from "../../js/loginSettings.js";

let router;

export async function initViewAllSpecificCars(match) {
    checkRoleBuyer();
    console.log("nej")
    const p = match?.params?.page;
}