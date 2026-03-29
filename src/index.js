import Utils from "./services/Utils.js";
import AccueilView from "./views/AccueilView.js";
import InventaireView from "./views/InventaireView.js";
import BoutiqueView from "./views/BoutiqueView.js";
import DetailCharacterView from "./views/DetailCharacterView.js";
import CatalogueView from "./views/CatalogueView.js";

function cacherToutesLesSections() {
  let sections = document.querySelectorAll(".section-page");
  for (let i = 0; i < sections.length; i++) {
    sections[i].style.display = "none";
    sections[i].innerHTML = "";
  }
}

async function router() {
  const request = Utils.parseRequestURL();
  // On cache tout avant d'afficher la bonne page
  cacherToutesLesSections();
  document.body.classList.remove('boutique', 'accueil');

  if (request.resource === "accueil" || request.resource === "" || request.resource === "/") {
    document.getElementById("accueil").style.display = "block";
    document.body.classList.add('accueil');
    await AccueilView.render();
  } 
  else if (request.resource === "catalogue") {
    document.getElementById("catalogue").style.display = "block";
    await CatalogueView.render(request.id || 'personnages'); 
  }
  else if (request.resource === "inventaire") {
    document.getElementById("inventaire").style.display = "block";
    await InventaireView.render();
  } else if (request.resource === "boutique") {
    document.getElementById("boutique").style.display = "block";
    document.body.classList.add('boutique');
    await BoutiqueView.render();
  } else if (request.resource === "personnage") {
    await DetailCharacterView.render(request.id);
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
