import { SERVER_URL } from "../../../../settings.js";
import { checkRoleAdmin, checkToken1 } from "../../../js/loginSettings.js";
import { paginator } from "../../../../lib/paginator/paginate-bootstrap.js"

let URL_ADMIN = SERVER_URL + "/api/users/admin";
let URL_ECONOMY = SERVER_URL + "/api/users/economy";
let URL_BUYER = SERVER_URL + "/api/users/buyer";
let URL_LEASER = SERVER_URL + "/api/users/leaser";




export async function initAllUserLogin(){
    checkRoleAdmin()

}


async function getAdminUsers(){}
async function getEconomyUsers(){}
async function getBuyerUsers(){}
async function getLeaserUsers(){}






