import I18n from "../services/I18n.js";

export default class SearchBar {

  // Génere le HTML de la barre de recherche et les filtres
  static getHtml() {
    return `
      <div class="row mb-4 justify-content-center align-items-center gx-3">
        <div class="col-auto mb-2">
          <input type="text" id="searchInput" class="form-control form-card" placeholder="${I18n.t("search_placeholder")}">
        </div>
        <div class="col-auto mb-2">
          <select id="rareteFilter" class="form-select form-card">
            <option value="">${I18n.t("filter_all_raretes")}</option>
            <option value="Commun">${I18n.rarete("Commun")}</option>
            <option value="Rare">${I18n.rarete("Rare")}</option>
            <option value="Épique">${I18n.rarete("Épique")}</option>
            <option value="Légendaire">${I18n.rarete("Légendaire")}</option>
            <option value="Mythique">${I18n.rarete("Mythique")}</option>
          </select>
        </div>
        <div class="col-auto mb-2">
          <select id="noteFilter" class="form-select form-card">
            <option value="">${I18n.t("filter_all_notes")}</option>
            <option value="1">★</option>
            <option value="2">★★</option>
            <option value="3">★★★</option>
            <option value="4">★★★★</option>
            <option value="5">★★★★★</option>
          </select>
        </div>
        <div class="col-auto mb-2 d-flex align-items-center">
          <input type="checkbox" id="favorisFilter" class="form-check-input me-2 form-card-checkbox">
          <p class="text-white mb-0">${I18n.t("filter_favorites_only")}</p>
        </div>
        <div class="col-auto mb-2">
          <button id="resetFiltersBtn" class="btn btn-outline-light">${I18n.t("filter_reset")}</button>
        </div>
      </div>
    `;
  }
}
