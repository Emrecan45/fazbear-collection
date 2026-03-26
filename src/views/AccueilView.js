import CharacterProvider from "../services/CharacterProvider.js";
import CharactersList from "../components/CharactersList.js";
import Pagination from "../components/Pagination.js";
import SearchBar from "../components/SearchBar.js";
import FilterService from "../services/FilterService.js";
import Utils from "../services/Utils.js";

export default class AccueilView {
  static async render() {
    let section = document.getElementById("accueil");
    section.innerHTML = "<h1 class='text-center text-white my-4'>Liste des animatroniques</h1>" + SearchBar.getHtml() + "<div id='characters-list'></div><div id='pagination'></div>";

    let personnages = await CharacterProvider.fetchCharacters();
    let itemsParPage = 6;

    function updateList(page) {
      window.scrollTo(0, 0); // remonter en haut de la page à chaque changement de page

      let filtres = FilterService.getCurrentFilters();

      let personnagesFiltres = CharacterProvider.filterCharacters(personnages, filtres);

      // Calculer le nombre total de pages en fonction du nombre de résultats filtrés et du nombre d'items par page
      let totalPages = Utils.calculerTotalPages(personnagesFiltres.length, itemsParPage);

      // Affichage
      document.getElementById("characters-list").innerHTML = CharactersList.getHtml(personnagesFiltres, page, itemsParPage);
      document.getElementById("pagination").innerHTML = Pagination.render(page, totalPages);

      // Gestion des clics sur les boutons de pagination
      Pagination.gererClics(function(pageCible) {
        updateList(pageCible);
      });
    }

    // Initialiser le SearchBar
    FilterService.init(function() { 
      updateList(1); 
    });

    // Lancement de l'affichage
    updateList(1);
  }
}
