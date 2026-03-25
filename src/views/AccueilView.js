import CharacterProvider from "../services/CharacterProvider.js";
import CharactersList from "../components/CharactersList.js";
import Pagination from "../components/Pagination.js";
import SearchBar from "../components/SearchBar.js";

export default class AccueilView {
  static async render() {
    let section = document.getElementById("accueil");
    section.innerHTML = "<h1 class='text-center text-white my-4'>Liste des animatroniques</h1>" + SearchBar.getHtml() + "<div id='characters-list'></div>";

    let personnages = await CharacterProvider.fetchCharacters();
    let itemsParPage = 6;

    function updateList(page) {
      window.scrollTo({ top: 0, behavior: "smooth" }); // remonter en haut de la page à chaque changement de page
      let favorisTexte = localStorage.getItem("favorisPersonnages");
      let mesFavoris = [];
      // lecture des favoris si existants dans le localStorage sinon liste vide
      if (favorisTexte !== null) {
        mesFavoris = JSON.parse(favorisTexte);
      }

      // Lecture des filtres
      let filtres = {
        search: document.getElementById("searchInput").value,
        rarete: document.getElementById("rareteFilter").value,
        note: document.getElementById("noteFilter").value,
        favoris: document.getElementById("favorisFilter").checked,
        favorisList: mesFavoris
      };

      CharacterProvider.saveFilters(filtres);

      let personnagesFiltres = CharacterProvider.filterCharacters(personnages, filtres);

      // Calcul des pages
      let totalPages = parseInt(personnagesFiltres.length / itemsParPage);
      if (personnagesFiltres.length % itemsParPage !== 0) {
        totalPages = totalPages + 1;
      }
      if (totalPages === 0) {
        totalPages = 1; // au moins une page vide si 0 résultat
      }

      // Affichage
      document.getElementById("characters-list").innerHTML = CharactersList.getHtml(personnagesFiltres, page, itemsParPage);

      // Gestion des clics sur les boutons de pagination
      Pagination.gererClics(function(pageCible) {
        updateList(pageCible);
      });
    }

    // Événements sur les filtres
    document.getElementById("searchInput").oninput = function() { 
      updateList(1); 
    };
    document.getElementById("rareteFilter").onchange = function() { 
      updateList(1); 
    };
    document.getElementById("noteFilter").onchange = function() { 
      updateList(1); 
    };
    document.getElementById("favorisFilter").onchange = function() { 
      updateList(1); 
    };

    // Lancement de l'affichage
    updateList(1);
  }
}