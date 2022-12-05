import "https://unpkg.com/navigo"  //Will create the global Navigo object used below
import {loadHtml, adjustForMissingHash, setActiveLink, renderTemplate} from "./utils.js"

import { initCreateBrand } from "./src/pages/create-brand/createBrand.js"
import { initAllBrands } from "./src/pages/all-brands/allBrands.js";
import { initLogin } from "./src/pages/login/login.js";
import { initCreateOwnerships } from "./src/pages/ownership/create-ownership.js";

//Color
import { initColorTypes } from "./src/pages/color/colorTypes/colorTypeFunctions.js"

//Users
import { initCreateAdminLogin } from "./src/pages/createLogins/userAdmin/adminLogin.js";
import { initCreateBuyerLogin } from "./src/pages/createLogins/userBuyer/buyerLogin.js";
import { initCreateLeaserLogin } from "./src/pages/createLogins/userLeaser/leaserLogin.js";
import { initCreateEconomyLogin } from "./src/pages/createLogins/userEconomy/economyLogin.js";
import { initAllUserLogin } from "./src/pages/createLogins/allUsers/allUsersLogin.js";

window.addEventListener("load", async () => {
  const templateHome = await loadHtml("./src/pages/home/home.html")
  const templateCreateBrand = await loadHtml("./src/pages/create-brand/create-brand.html")
  const templateAllBrands = await loadHtml("./src/pages/all-brands/all-brands.html")
  const templateLogin = await loadHtml("./src/pages/login/login.html")
  const templateColorMix = await loadHtml("./src/pages/color/colorMix/color-mix.html")
  const templateColorTypes = await loadHtml("./src/pages/color/colorTypes/color-types.html")
  const templateCreateOwnerships = await loadHtml("./src/pages/ownership/create-ownership.html")


  //users
  const templateCreateAdminLogin = await loadHtml("./src/pages/createLogins/userAdmin/adminLogin.html")
  const templateCreateBuyerLogin = await loadHtml("./src/pages/createLogins/userBuyer/buyerLogin.html")
  const templateLeaserLogin = await loadHtml("./src/pages/createLogins/userLeaser/leaserLogin.html")
  const templateEconomyLogin = await loadHtml("./src/pages/createLogins/userEconomy/economyLogin.html")
  const templateAllUsersLogin = await loadHtml("./src/pages/createLogins/allUsers/allUsersLogin.html")


  const router = new Navigo("/", { hash: true });
  window.router = router

  adjustForMissingHash()
  router
    .hooks({
      before(done, match) {
        setActiveLink("topnav", match.url)
        done()
      }
    })
    .on({
      "/": () => renderTemplate(templateHome, "content"),

      "/create-brand": () => {
        renderTemplate(templateCreateBrand, "content")
        initCreateBrand()
      },
      "/all-brands": () => {
        renderTemplate(templateAllBrands, "content")
        initAllBrands()
      },
      "/create/login/admin": () => {
        renderTemplate(templateCreateAdminLogin, "content")
        initCreateAdminLogin()
      },
      "/create/login/buyer": () => {
        renderTemplate(templateCreateBuyerLogin, "content")
        initCreateBuyerLogin()
      },
      "/create/login/leaser": () => {
        renderTemplate(templateLeaserLogin, "content")
        initCreateLeaserLogin()
      },
      "/create/login/economy": () => {
        renderTemplate(templateEconomyLogin, "content")
        initCreateEconomyLogin()
      },
      "/users/all": () => {
        renderTemplate(templateAllUsersLogin, "content")
        initAllUserLogin()
      },
      "/login": () => {
        renderTemplate(templateLogin, "content")
        initLogin()
      },
      "/color-types": () => {
        renderTemplate(templateColorTypes, "content")
        initColorTypes(router)
      },
      "/create-ownerships": () => {
        renderTemplate(templateCreateOwnerships, "content")
        initCreateOwnerships(router)

      }
    })
    .notFound(() => renderTemplate("No page for this route found", "content"))
    .resolve()
});


window.onerror = (e) => alert(e)