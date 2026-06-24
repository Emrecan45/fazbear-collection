import Utils from "./services/Utils.js";
import I18n from "./services/I18n.js";
import AccueilView from "./views/AccueilView.js";
import InventaireView from "./views/InventaireView.js";
import BoutiqueView from "./views/BoutiqueView.js";
import DetailCharacterView from "./views/DetailCharacterView.js";
import CatalogueView from "./views/CatalogueView.js";
let header = null;

// Applique les libelles traduits aux elements statiques (nav, footer, bouton langue)
function appliquerTraductions() {
  let elements = document.querySelectorAll("[data-i18n]");
  for (let i = 0; i < elements.length; i++) {
    let cle = elements[i].getAttribute("data-i18n");
    elements[i].textContent = I18n.t(cle);
  }
  let bouton = document.getElementById("lang-btn");
  if (bouton !== null) {
    bouton.textContent = I18n.autreLangue();
  }
  document.documentElement.lang = I18n.getLang();
}

// Initialisation de l'application
async function initApp() {
  appliquerTraductions();

  let bouton = document.getElementById("lang-btn");
  bouton.addEventListener("click", function() {
    I18n.toggle();
    appliquerTraductions();
    router(); // re-render de la page courante dans la nouvelle langue
  });

  router();
}

// Fonction pour cacher toutes les sections avant d'afficher la bonne (pour SPA)
function cacherToutesLesSections() {
  let sections = document.querySelectorAll(".section-page");
  for (let i = 0; i < sections.length; i++) {
    sections[i].style.display = "none";
    sections[i].innerHTML = "";
  }
  header = document.getElementById("header-home");
  header.style.textDecoration = "none";
  header = document.getElementById("header-catalogue");
  header.style.textDecoration = "none";
  header = document.getElementById("header-inventaire");
  header.style.textDecoration = "none";
  header = document.getElementById("header-boutique");
  header.style.textDecoration = "none";
}

// Routeur
async function router() {
  const request = Utils.parseRequestURL();
  // On cache tout avant d'afficher la bonne page
  cacherToutesLesSections();
  document.body.classList.remove('boutique', 'accueil');

  if (request.resource === "accueil" || request.resource === "" || request.resource === "/") {
    header = document.getElementById("header-home");
    header.style.textDecoration = "underline";
    document.getElementById("accueil").style.display = "block";
    document.body.classList.add('accueil');
    await AccueilView.render();
  } 
  else if (request.resource === "catalogue") {
    header = document.getElementById("header-catalogue");
    header.style.textDecoration = "underline";
    // si demande un personnage via catalogue
    if (request.id === 'personnage' && request.verb) {
      document.getElementById("personnage").style.display = "block";
      await DetailCharacterView.render(request.verb, 'catalogue');
    } else {
      document.getElementById("catalogue").style.display = "block";
      await CatalogueView.render(request.id);
    }
  }
  else if (request.resource === "inventaire") {
    header = document.getElementById("header-inventaire");
    header.style.textDecoration = "underline";
    // si demande un personnage via inventaire
    if (request.id === 'personnage' && request.verb) {
      document.getElementById("personnage").style.display = "block";
      await DetailCharacterView.render(request.verb, 'inventaire');
    } else {
      document.getElementById("inventaire").style.display = "block";
      await InventaireView.render(request.id);
    }
  } else if (request.resource === "boutique") {
    header = document.getElementById("header-boutique");
    header.style.textDecoration = "underline";
    document.getElementById("boutique").style.display = "block";
    document.body.classList.add('boutique');
    await BoutiqueView.render();
  } else if (request.resource === "personnage") {
    const origine = request.verb;
    document.getElementById("personnage").style.display = "block";
    await DetailCharacterView.render(request.id, origine);
  }
}

// Écoute les changements de hash pour naviguer sans rechargement
window.addEventListener("hashchange", router);
window.addEventListener("load", initApp);
