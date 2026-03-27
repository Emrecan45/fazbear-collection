import CharacterProvider from "../services/CharacterProvider.js";
import CharactersList from "../components/CharactersList.js";
import EquipmentProvider from "../services/EquipmentProvider.js";
import EquipmentList from "../components/EquipmentList.js";
import Pagination from "../components/Pagination.js";
import SearchBar from "../components/SearchBar.js";
import FilterService from "../services/FilterService.js";
import Utils from "../services/Utils.js";
import NavigationOnglet from "../components/NavigationOnglet.js";

export default class InventaireView {
  static async render() {
    let request = Utils.parseRequestURL();
    
    let mode = "personnages";
    if (request.id === "equipements") {
      mode = "equipements";
    }

    let section = document.getElementById("inventaire");
    let personnagesDuJoueur = await CharacterProvider.fetchPersonnagesPossedes();
    let equipementsDuJoueur = await EquipmentProvider.fetchEquipementsPossedes();

    section.innerHTML = "<h1 id='inventaire-title' class='text-center text-white my-4'>Inventaire</h1>" +
      "<div class='d-flex justify-content-center mb-3' id='view-mode-tabs'>" +
        "<a href='#/inventaire/personnages' id='tab-characters' class='btn btn-outline-light mx-1'>Animatroniques</a>" +
        "<a href='#/inventaire/equipements' id='tab-equipment' class='btn btn-outline-light mx-1'>Équipements</a>" +
      "</div>" +
      SearchBar.getHtml() +
      "<div id='content-area' class='mt-4'></div>";

    let contentArea = document.getElementById("content-area");

    if (mode === 'personnages' && personnagesDuJoueur.length === 0) {
      contentArea.innerHTML = "<p class='text-center text-white'>Votre inventaire d'animatroniques est vide, allez visiter la boutique !</p>" +
        "<img src='src/assets/img/Inventaire.png' alt='Inventaire vide' style='height: 450px; display: block; margin: 0 auto;'>";
      NavigationOnglet.gererOngletsActifs(mode);
      return;
    }

    if (mode === 'equipements' && equipementsDuJoueur.length === 0) {
      contentArea.innerHTML = "<p class='text-center text-white'>Votre inventaire d'équipements est vide, allez visiter la boutique !</p>" +
        "<img src='src/assets/img/Inventaire.png' alt='Inventaire vide' style='height: 450px; display: block; margin: 0 auto;'>";
      NavigationOnglet.gererOngletsActifs(mode);
      return;
    }

    contentArea.innerHTML = "<div id='characters-list'></div><div id='pagination'></div>";
    let itemsParPage = 6;

    function updateList(page) {
      window.scrollTo(0, 0);
      let filtres = FilterService.getFilters();

      if (mode === 'personnages') {
        let personnagesFiltres = CharacterProvider.filterCharacters(personnagesDuJoueur, filtres);
        let totalPages = Utils.calculerTotalPages(personnagesFiltres.length, itemsParPage);
        document.getElementById("characters-list").innerHTML = CharactersList.getHtml(personnagesFiltres, page, itemsParPage);
        document.getElementById("pagination").innerHTML = Pagination.render(page, totalPages);
      } else {
        let equipementsFiltres = EquipmentProvider.filterEquipments(equipementsDuJoueur, filtres);
        let totalPages = Utils.calculerTotalPages(equipementsFiltres.length, itemsParPage);
        document.getElementById("characters-list").innerHTML = EquipmentList.getHtml(equipementsFiltres, page, itemsParPage);
        document.getElementById("pagination").innerHTML = Pagination.render(page, totalPages);
      }

      Pagination.gererClics(function(pageCible) {
        updateList(pageCible);
      });
    }

    NavigationOnglet.gererOngletsActifs(mode);
    NavigationOnglet.setNoteFilter(mode);
    FilterService.setMode(mode);
    FilterService.init(function() { updateList(1); }, mode);
    updateList(1);
  }
}
