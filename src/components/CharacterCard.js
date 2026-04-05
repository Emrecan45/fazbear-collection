import RarityBadge from "./RarityBadge.js";
import FavoriteButton from "./FavoriteButton.js";

export default class CharacterCard {

  // Génère le HTML d'une card de personnage
  static getHtml(character, boutonFavori = true, origine) {
    let blocNote = "";
    let note = character.note;
    let nombreNotes = 0;
    if (character.notes && character.notes.length) {
      nombreNotes = character.notes.length;
    }

    // Affiche la note uniquement si elle existe et qu'il y a au moins un avis
    if (typeof note !== "undefined" && note > 0 && nombreNotes > 0) {
      blocNote = "<span class='text-warning'>★</span> <strong>" + note + "</strong> <span class='text-secondary'>(" + nombreNotes + " avis)</span>";
    }

    // mettre le coeur de favoris seulement si boutonFavori est true
    let coeurHtml = "";
    if (boutonFavori === true) {
      // style pour positionner le coeur en haut à droite de la card
      const style = "position: absolute; top: 4px; right: 13px;";
      coeurHtml = FavoriteButton.getHtml(character.id, 'characters', style);
    }

    // Construit le lien vers la page de détail selon d'ou on vient
    let href = "#/";
    if (origine === 'inventaire') {
      href += "inventaire/personnage/" + character.id;
    } else if (origine === 'catalogue') {
      href += "catalogue/personnage/" + character.id;
    } else {
      href += "personnage/" + character.id;
    }

    return `
      <div class="col-md-4 mb-4">
        <div class="card card-compact h-100 shadow-sm position-relative">
            
            ${coeurHtml}

            <img src="${character.image}" loading="lazy" class="card-img-top card-compact-img" alt="${character.name}">
            <div class="card-body info">
              <div class="d-flex justify-content-between align-items-start">
                <h5 class="card-title mb-0">${character.name}</h5>
                ${RarityBadge.getHtml(character.rarete)}
              </div>
              <h6 class="card-subtitle text-muted">${character.title}</h6>            
              
              <div class="d-flex justify-content-between align-items-end">
                <div>${blocNote}</div>
                <a href="${href}" class="btn btn-sm btn-outline-light">Détails</a>
              </div>
            </div>
        </div>
      </div>
    `;
  }
}
