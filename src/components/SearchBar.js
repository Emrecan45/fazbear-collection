export default class SearchBar {
  static getHtml() {
    return `
      <div class="row mb-4">
        <div class="col-md-3 mb-2">
          <input type="text" id="searchInput" class="form-control border-0" placeholder="Rechercher par nom...">
        </div>
        <div class="col-md-3 mb-2">
          <select id="rareteFilter" class="form-select border-0">
            <option value="">Toutes les raretés</option>
            <option value="Commun">Commun</option>
            <option value="Rare">Rare</option>
            <option value="Épique">Épique</option>
            <option value="Légendaire">Légendaire</option>
            <option value="Mythique">Mythique</option>
          </select>
        </div>
        <div class="col-md-3 mb-2">
          <select id="noteFilter" class="form-select border-0">
            <option value="">Toutes les notes</option>
            <option value="1">1 étoile</option>
            <option value="2">2 étoiles</option>
            <option value="3">3 étoiles</option>
            <option value="4">4 étoiles</option>
            <option value="5">5 étoiles</option>
          </select>
        </div>
        <div class="col-md-3 mb-2 d-flex align-items-center">
          <input type="checkbox" id="favorisFilter" class="form-check-input me-2">
          <label for="favorisFilter" class="form-check-label text-white">Favoris uniquement</label>
        </div>
      </div>
    `;
  }
}