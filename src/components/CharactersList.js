import CharacterCard from "./CharacterCard.js";

export default class CharactersList {

  // Génère le HTML de la liste des personnages pour une page donnée
  static getHtml(characters, page = 1, itemsParPage = 6, origine) {
    if (characters.length === 0) {
      return "<p class='text-center'>Aucun animatronique trouvé.</p>";
    }

    // Calcule les indices de début et fin pour la page courante
    let startIndex = (page - 1) * itemsParPage;
    let endIndex = startIndex + itemsParPage;
    let html = '<div class="row">';

    for (let i = startIndex; i < endIndex; i++) {
      if (i < characters.length) {
        html += CharacterCard.getHtml(characters[i], true, origine);
      }
    }

    html += "</div>";

    return html;
  }
}
