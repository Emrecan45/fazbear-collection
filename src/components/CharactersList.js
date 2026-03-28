import CharacterCard from "./CharacterCard.js";

export default class CharactersList {
  static getHtml(characters, page = 1, itemsParPage = 6) {
    if (characters.length === 0) {
      return "<p class='text-center'>Aucun animatronique trouvé.</p>";
    }

    let startIndex = (page - 1) * itemsParPage;
    let endIndex = startIndex + itemsParPage;
    let html = '<div class="row">';

    for (let i = startIndex; i < endIndex; i++) {
      if (i < characters.length) {
        html += CharacterCard.getHtml(characters[i], true);
      }
    }

    html += "</div>";

    return html;
  }
}
