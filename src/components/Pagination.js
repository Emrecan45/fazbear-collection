import I18n from "../services/I18n.js";

export default class Pagination {

  // Génère les boutons Précédent / Suivant et le compteur de page (les boutons sont invisibles quand il n'y a pas de page precédente ou suivante)
  static render(page, totalPages) {
    let prevTxt = I18n.t("pagination_prev");
    let nextTxt = I18n.t("pagination_next");
    let html = '<div class="d-flex justify-content-center align-items-center mt-4 mb-4">';
      if (page > 1) {
      let prev = page - 1;
        html += '<button id="btnPrev" class="btn btn-sm btn-outline-light me-3" data-page="' + prev + '">' + prevTxt + '</button>';
      } else {
        html += '<button id="btnPrev" class="btn btn-sm btn-outline-light me-3 pagination-invisible">' + prevTxt + '</button>';
      }
    html += '<span class="fw-bold text-white mx-3">' + I18n.t("pagination_page") + ' ' + page + ' / ' + totalPages + '</span>';
      if (page < totalPages) {
      let next = page + 1;
        html += '<button id="btnNext" class="btn btn-sm btn-outline-light ms-3" data-page="' + next + '">' + nextTxt + '</button>';
      } else {
        html += '<button id="btnNext" class="btn btn-sm btn-outline-light ms-3 pagination-invisible">' + nextTxt + '</button>';
      }
    html += '</div>';
    return html;
  }

  // Connection des clics sur les boutons de pagination
  static gererClics(fonction) {
    let btnPrecedent = document.getElementById("btnPrev");
    let btnSuivant = document.getElementById("btnNext");

    if (btnPrecedent !== null) {
      btnPrecedent.addEventListener("click", function() {
        let pageCible = parseInt(btnPrecedent.getAttribute("data-page"));
        fonction(pageCible); 
      });
    }

    if (btnSuivant !== null) {
      btnSuivant.addEventListener("click", function() {
        let pageCible = parseInt(btnSuivant.getAttribute("data-page"));
        fonction(pageCible);
      });
    }
  }
}