import CharacterProvider from "../services/CharacterProvider.js";
import CharactersList from "../components/CharactersList.js";
import EquipmentProvider from "../services/EquipmentProvider.js";
import EquipmentList from "../components/EquipmentList.js";
import Pagination from "../components/Pagination.js";
import SearchBar from "../components/SearchBar.js";
import FilterService from "../services/FilterService.js";
import Utils from "../services/Utils.js";
import NavigationOnglet from "../components/NavigationOnglet.js";
import FavoriteButton from "../components/FavoriteButton.js";

export default class CatalogueView {
  static async render(mode) {
    let section = document.getElementById("catalogue");
    section.innerHTML = "<h1 id='catalogue-title' class='text-center text-white my-4'>Catalogue</h1>" +
      "<div class='d-flex justify-content-center mb-3' id='view-mode-tabs'>" +
        "<a href='#/catalogue/personnages' id='tab-characters' class='btn btn-outline-light mx-1'>Animatroniques</a>" +
        "<a href='#/catalogue/equipements' id='tab-equipment' class='btn btn-outline-light mx-1'>Équipements</a>" +
      "</div>" +
      SearchBar.getHtml() +
      "<div id='characters-list'></div><div id='pagination'></div>";

    let personnages = await CharacterProvider.fetchCharacters();
    let equipements = await EquipmentProvider.fetchEquipments();
    let itemsParPage = 6;

    function updateList(page) {
      window.scrollTo(0, 0);

      let filtres = FilterService.getFilters();

      if (mode === 'personnages') {
        let personnagesFiltres = CharacterProvider.filterCharacters(personnages, filtres);
        let totalPages = Utils.calculerTotalPages(personnagesFiltres.length, itemsParPage);

        document.getElementById("characters-list").innerHTML = CharactersList.getHtml(personnagesFiltres, page, itemsParPage);
        document.getElementById("pagination").innerHTML = Pagination.render(page, totalPages);
        
        FavoriteButton.gererFavoris();

      } else {
        let equipementsFiltres = EquipmentProvider.filterEquipments(equipements, filtres);
        let totalPages = Utils.calculerTotalPages(equipementsFiltres.length, itemsParPage);

        document.getElementById("characters-list").innerHTML = EquipmentList.getHtml(equipementsFiltres, page, itemsParPage);
        document.getElementById("pagination").innerHTML = Pagination.render(page, totalPages);
        FavoriteButton.gererFavoris();
      }

      Pagination.gererClics(function(pageCible) {
        updateList(pageCible);
      });
    }

    NavigationOnglet.gererOngletsActifs(mode);
    NavigationOnglet.setNoteFilter(mode);
    
    FilterService.setMode(mode);
    FilterService.init(function() {updateList(1);}, mode);

    updateList(1);
  }
}
