let modeVue = 'characters';

export default class FilterService {
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

  static setMode(mode) {
    modeVue = mode;
  }

  static getFilters() {
    const search = document.getElementById("searchInput").value;
    const rarete = document.getElementById("rareteFilter").value;
    const note = document.getElementById("noteFilter").value;
    const favoris = document.getElementById("favorisFilter").checked;

    const favorisList = JSON.parse(localStorage.getItem("favorisPersonnages")) || []; // Recuperer la liste des favoris depuis le localStorage ou alor un tableau vide si elle n'existe pas

    return { search: search, rarete: rarete, note: note, favoris: favoris, favorisList: favorisList };
  }

  static setFilters(filters) {
    document.getElementById("searchInput").value = filters.search;
    document.getElementById("rareteFilter").value = filters.rarete;
    document.getElementById("noteFilter").value = filters.note;
    document.getElementById("favorisFilter").checked = filters.favoris;
  }
}
