import CharacterProvider from "../services/CharacterProvider.js";
import CharactersList from "../components/CharactersList.js";
import EquipmentProvider from "../services/EquipmentProvider.js";
import EquipmentList from "../components/EquipmentList.js";
import Pagination from "../components/Pagination.js";
import SearchBar from "../components/SearchBar.js";
import FilterService from "../services/FilterService.js";
import Utils from "../services/Utils.js";

export default class CatalogueView {
  static async render(mode) {
    let titre;
    if (mode === 'personnages') {
        titre = "Catalogue des Animatroniques";
    } else {
        titre = "Catalogue des Équipements";
    }
    let section = document.getElementById("catalogue");
    section.innerHTML = "<h1 id='catalogue-title' class='text-center text-white my-4'>" + titre + "</h1>" +
      "<div class='d-flex justify-content-center mb-3' id='view-mode-tabs'>" +
        "<a href='#/personnages' id='tab-characters' class='btn btn-outline-light mx-1'>Animatroniques</a>" +
        "<a href='#/equipements' id='tab-equipment' class='btn btn-outline-light mx-1'>Équipements</a>" +
      "</div>" +
      SearchBar.getHtml() +
      "<div id='characters-list'></div><div id='pagination'></div>";

    let personnages = await CharacterProvider.fetchCharacters();
    let equipements = await EquipmentProvider.fetchEquipments();
    let itemsParPage = 6;

    function setNoteFilter(modeActuel) { 
      let noteSelect = document.getElementById('noteFilter');
      if (!noteSelect) return;
      if (modeActuel === 'personnages') {
        noteSelect.innerHTML = '' +
          '<option value="">Toutes les notes</option>'+
          '<option value="1">★</option>'+
          '<option value="2">★★</option>'+
          '<option value="3">★★★</option>'+
          '<option value="4">★★★★</option>'+
          '<option value="5">★★★★★</option>';
      } else {
        noteSelect.innerHTML = '' +
          '<option value="">Types de bonus</option>'+
          '<option value="force">Force</option>'+
          '<option value="agilite">Agilité</option>'+
          '<option value="intelligence">Intelligence</option>';
      }
    }

    function updateList(page) {
      window.scrollTo(0, 0);

      let filtres = FilterService.getFilters();

      if (mode === 'personnages') {
        let personnagesFiltres = CharacterProvider.filterCharacters(personnages, filtres);
        let totalPages = Utils.calculerTotalPages(personnagesFiltres.length, itemsParPage);

        document.getElementById("characters-list").innerHTML = CharactersList.getHtml(personnagesFiltres, page, itemsParPage);
        document.getElementById("pagination").innerHTML = Pagination.render(page, totalPages);

      } else {
        let equipementsFiltres = EquipmentProvider.filterEquipments(equipements, filtres);
        let totalPages = Utils.calculerTotalPages(equipementsFiltres.length, itemsParPage);

        document.getElementById("characters-list").innerHTML = EquipmentList.getHtml(equipementsFiltres, page, itemsParPage);
        document.getElementById("pagination").innerHTML = Pagination.render(page, totalPages);
      }

      Pagination.gererClics(function(pageCible) {
        updateList(pageCible);
      });
    }

    // Onglets
    let tabCharacters = document.getElementById('tab-characters');
    let tabEquipment = document.getElementById('tab-equipment');

    if (mode === 'equipements') {
      tabEquipment.classList.add('active');
      tabCharacters.classList.remove('active');
    } else {
      tabCharacters.classList.add('active');
      tabEquipment.classList.remove('active');
    }

    setNoteFilter(mode);
    FilterService.setMode(mode);
    FilterService.init(function() {updateList(1);}, mode);

    updateList(1);
  }
}
