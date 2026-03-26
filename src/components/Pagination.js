export default class Pagination {
  static render(page, totalPages) {
    let html = '<div class="d-flex justify-content-center align-items-center mt-4 mb-4">';
      if (page > 1) {
      let prev = page - 1;
        html += '<button id="btnPrev" class="btn btn-secondary me-3" data-page="' + prev + '">Précédent</button>';
      } else {
        html += '<button id="btnPrev" class="btn btn-secondary me-3 pagination-invisible">Précédent</button>';
      }
    html += '<span class="fw-bold text-white mx-3">Page ' + page + ' / ' + totalPages + '</span>';
      if (page < totalPages) {
      let next = page + 1;
        html += '<button id="btnNext" class="btn btn-secondary ms-3" data-page="' + next + '">Suivant</button>';
      } else {
        html += '<button id="btnNext" class="btn btn-secondary ms-3 pagination-invisible">Suivant</button>';
      }
    html += '</div>';
    return html;
  }

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