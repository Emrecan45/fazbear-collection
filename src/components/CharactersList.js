import CharacterCard from "./CharacterCard.js";
import Pagination from "./Pagination.js";

export default class CharactersList {
  static getHtml(characters, page = 1, itemsParPage = 6) {
    if (characters.length === 0) {
      return "<p class='text-center'>Aucun animatronique trouvé.</p>";
    }

    let totalPages = parseInt(characters.length / itemsParPage);
    if (characters.length % itemsParPage !== 0) {
      totalPages = totalPages + 1;
    }

    let startIndex = (page - 1) * itemsParPage;
    let endIndex = startIndex + itemsParPage;
    let html = '<div class="row">';

    for (let i = startIndex; i < endIndex; i++) {
      if (i < characters.length) {
        html += CharacterCard.getHtml(characters[i]);
      }
    }

    html += "</div>";

    if (totalPages > 1) {
      html += Pagination.render(page, totalPages);
    }

    return html;
  }
}
