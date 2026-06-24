import I18n from "../services/I18n.js";

export default class AccueilView {

  // Affiche la page d'accueil avec la présentation du site
  static async render() {
    let section = document.getElementById("accueil");
    section.style.display = "block";

    section.innerHTML = `
      <div class="container mt-5">
        <h1 class='text-center text-white my-4'>${I18n.t("welcome_title")}</h1>

        <div class="row justify-content-center mt-5">
          <div class="col-md-8 text-center text-white" style="background-color: rgba(0, 0, 0, 0.7); padding: 40px;">

            <p class="fs-4 mb-5">${I18n.t("welcome_intro")}</p>

            <div class="mb-4">
              <h4 class="text-white">${I18n.t("welcome_draws_t")}</h4>
              <p class="fs-5"><a href="#/boutique" class="text-white">${I18n.t("word_shop")}</a> : ${I18n.t("welcome_draws")}</p>
            </div>

            <div class="mb-4">
              <h4 class="text-white">${I18n.t("welcome_collection_t")}</h4>
              <p class="fs-5">
                <a href="#/catalogue/personnages" class="text-white">${I18n.t("word_catalog")}</a> /
                <a href="#/inventaire/personnages" class="text-white">${I18n.t("word_inventory")}</a> : ${I18n.t("welcome_collection")}
              </p>
            </div>

            <div class="mb-4">
              <h4 class="text-white">${I18n.t("welcome_equip_t")}</h4>
              <p class="fs-5">${I18n.t("welcome_equip")}</p>
            </div>

            <div class="mb-4">
              <h4 class="text-white">${I18n.t("welcome_rating_t")}</h4>
              <p class="fs-5">${I18n.t("welcome_rating")}</p>
            </div>

          </div>
        </div>
      </div>
    `;
  }
}
