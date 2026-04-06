import FavoritesService from "../services/FavoritesService.js";

export default class FavoriteButton {

  // Génère le bouton coeur selon si l'élément est favori
  static getHtml(id, type = "characters", style = "") {
    let estFavori = FavoritesService.isFavorite(id, type);
    let coeurClass = "bi-heart";
    let coeurColor = "#6c757d";

    if (estFavori === true) {
      coeurClass = "bi-heart-fill";
      coeurColor = "#dc3545";
    }

    return `<i class="bi ${coeurClass} btn-favori" data-id="${id}" data-type="${type}" style="font-size: 1.5rem; cursor: pointer; color: ${coeurColor}; ${style}"></i>`;
  }

  // Connecte les clics sur les boutons favoris
  static gererFavoris() {
    let boutons = document.querySelectorAll(".btn-favori");

    for (let k = 0; k < boutons.length; k++) {
      boutons[k].onclick = function() {

        let id = this.getAttribute("data-id");
        let type = this.getAttribute("data-type") || "characters";

        // changement visuel du coeur et met a jour le localStorage
        let estMaintenant = FavoritesService.toggleFavorite(id, type);
        if (estMaintenant === true) {
          this.classList.remove("bi-heart");
          this.classList.add("bi-heart-fill");
          this.style.color = "#dc3545";
        } else {
          this.classList.remove("bi-heart-fill");
          this.classList.add("bi-heart");
          this.style.color = "#6c757d";
        }

        // Si le filtre favoris est actif = retirer la card de la liste
        let filtreFavoris = document.getElementById("favorisFilter");
        if (filtreFavoris && filtreFavoris.checked) {
          this.parentElement.parentElement.remove();
        }
      };
    }
  }
}
