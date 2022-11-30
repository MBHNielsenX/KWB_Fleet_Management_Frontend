import "https://unpkg.com/navigo"  //Will create the global Navigo object used below
import {loadHtml, adjustForMissingHash, setActiveLink, renderTemplate} from "./utils.js"

import { initViewAllSpecificCars } from "./src/pages/viewAllSpecificCars/viewAllSpecificCars.js"
import { initColorMix } from "./src/pages/color/colorMix/colorMixFunctions.js"

window.addEventListener("load", async () => {
  const templateHome = await loadHtml("./src/pages/home/home.html")
  const templateViewAllCars = await loadHtml("./src/pages/viewAllSpecificCars/viewAllSpecificCars.html")

  const templateColorMix = await loadHtml("./src/pages/colorMix/tester.html")

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
      "/all-specific-cars": () => {
        renderTemplate(templateViewAllCars, "content")
        initViewAllSpecificCars()
      },
      "/tester": () => {
        renderTemplate(templateColorMix, "content")
        initColorMix()
      }
    })
    .notFound(() => renderTemplate("No page for this route found", "content"))
    .resolve()
});


window.onerror = (e) => alert(e)