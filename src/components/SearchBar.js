export default class SearchBar {
  static getHtml() {
    return `
      <div class="row mb-4 justify-content-center align-items-center">
        <div class="col-auto mb-2">
          <input type="text" id="searchInput" class="form-control form-card" placeholder="Rechercher par nom...">
        </div>
        <div class="col-auto mb-2">
          <select id="rareteFilter" class="form-select form-card">
            <option value="">Toutes les raretés</option>
            <option value="Commun">Commun</option>
            <option value="Rare">Rare</option>
            <option value="Épique">Épique</option>
            <option value="Légendaire">Légendaire</option>
            <option value="Mythique">Mythique</option>
          </select>
        </div>
        <div class="col-auto mb-2">
          <select id="noteFilter" class="form-select form-card">
            <option value="">Toutes les notes</option>
            <option value="1">★</option>
            <option value="2">★★</option>
            <option value="3">★★★</option>
            <option value="4">★★★★</option>
            <option value="5">★★★★★</option>
          </select>
        </div>
        <div class="col-auto mb-2 d-flex align-items-center">
          <input type="checkbox" id="favorisFilter" class="form-check-input me-2 form-card-checkbox">
          <label for="favorisFilter" class="form-check-label text-white">Favoris uniquement</label>
        </div>
        <div class="col-auto mb-2">
          <button id="resetFiltersBtn" class="btn btn-outline-light">Effacer les filtres</button>
        </div>
      </div>
    `;
  }
}