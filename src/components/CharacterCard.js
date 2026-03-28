import RarityBadge from "./RarityBadge.js";
import FavoriteButton from "./FavoriteButton.js";

export default class CharacterCard {

  static getHtml(character, boutonFavori = true) {
    let etoiles = "";
    let note = character.note;

    // Afficher les étoiles seulement si l'utilisateur a déjà donné une note au perso
    if (typeof note !== "undefined" && note > 0) {
      for (let j = 1; j <= 5; j++) {
        if (j <= note) {
          etoiles += "<span>★</span>";
        } else {
          etoiles += "<span>☆</span>";
        }
      }
    }

      // mettre le coeur de favoris seulement si boutonFavori est true
      let coeurHtml = "";
      if (boutonFavori === true) {
        // style pour positionner le coeur en haut à droite de la card
        const style = "position: absolute; top: 4px; right: 13px;"; 
        coeurHtml = FavoriteButton.getHtml(character.id, 'characters', style);
      }

    return `
      <div class="col-md-4 mb-4">
        <div class="card card-compact h-100 shadow-sm position-relative">
            
            ${coeurHtml}

            <img src="${character.image}" loading="lazy" class="card-img-top card-compact-img" alt="${character.name}">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h5 class="card-title mb-0">${character.name}</h5>
                ${RarityBadge.getHtml(character.rarete)}
              </div>
              <h6 class="card-subtitle mb-2 text-muted">${character.title}</h6>            
              
              <div class="d-flex justify-content-between align-items-center">
                <div class="text-warning">${etoiles}</div>
                <a href="#/personnage/${character.id}" class="btn btn-sm btn-outline-light">Détails</a>
              </div>
            </div>
        </div>
      </div>
    `;
  }
}
