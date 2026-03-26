import CharacterProvider from "./CharacterProvider.js";

export default class FilterService {
  static init(onChange) {
    const filters = CharacterProvider.loadFilters();
    FilterService.setFilters(filters);

    function saveAndNotify() {
      const f = FilterService.getCurrentFilters();
      CharacterProvider.saveFilters(f);
      onChange();
    }

    document.getElementById("searchInput").oninput = saveAndNotify;
    document.getElementById("rareteFilter").onchange = saveAndNotify;
    document.getElementById("noteFilter").onchange = saveAndNotify;
    document.getElementById("favorisFilter").onchange = saveAndNotify;
  }

  static getCurrentFilters() {
    const search = document.getElementById("searchInput").value;
    const rarete = document.getElementById("rareteFilter").value;
    const note = document.getElementById("noteFilter").value;
    const favoris = document.getElementById("favorisFilter").checked;

    const favorisList = JSON.parse(localStorage.getItem("favorisPersonnages"));

    return { search: search, rarete: rarete, note: note, favoris: favoris, favorisList: favorisList };
  }

  static setFilters(filters) {
    document.getElementById("searchInput").value = filters.search;
    document.getElementById("rareteFilter").value = filters.rarete;
    document.getElementById("noteFilter").value = filters.note;
    document.getElementById("favorisFilter").checked = filters.favoris;
  }
}
