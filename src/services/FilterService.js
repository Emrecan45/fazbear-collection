import FavoritesService from "./FavoritesService.js";

let modeVue = 'characters'; // personnages ou équipements

export default class FilterService {

  // Initialise les listeners sur les champs de filtre
  static init(onChange, mode) {
    if (mode) modeVue = mode;

    FilterService.setFilters({ search: "", rarete: "", note: "", favoris: false, favorisList: [] });
    document.getElementById("searchInput").oninput = onChange;
    document.getElementById("rareteFilter").onchange = onChange;
    document.getElementById("noteFilter").onchange = onChange;
    document.getElementById("favorisFilter").onchange = onChange;

    let resetBtn = document.getElementById("resetFiltersBtn");
    if (resetBtn) {
      resetBtn.onclick = function() {
        FilterService.setFilters({ search: "", rarete: "", note: "", favoris: false, favorisList: [] });
        onChange();
      };
    }
  }

  // Change le mode (equpements ou personnages) pour adapter les filtres
  static setMode(mode) {
    modeVue = mode;
  }

  // Lit les valeurs des champs de filtre et retourne les critères
  static getFilters() {
    const search = document.getElementById("searchInput").value;
    const rarete = document.getElementById("rareteFilter").value;
    const note = document.getElementById("noteFilter").value;
    const favoris = document.getElementById("favorisFilter").checked;

    let favorisType = 'characters';
    if (modeVue === 'equipements') {
      favorisType = 'equipments';
    }
    const favorisList = FavoritesService.getFavorites(favorisType); // Recuperer la liste des favoris via FavoritesService

    return { search: search, rarete: rarete, note: note, favoris: favoris, favorisList: favorisList };
  }

  // Applique des valeurs aux champs de filtre (utile pour le bouton de reset filtre)
  static setFilters(filters) {
    document.getElementById("searchInput").value = filters.search;
    document.getElementById("rareteFilter").value = filters.rarete;
    document.getElementById("noteFilter").value = filters.note;
    document.getElementById("favorisFilter").checked = filters.favoris;
  }
}
