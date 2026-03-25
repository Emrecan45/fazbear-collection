import CharacterCard from "../components/CharacterCard.js";

export default class CharactersView {
  static getHtml(characters) {
    if (characters.length === 0) {
      return "<p>Aucun personnage trouvé.</p>";
    }

    let html = '<div class="row">';

    for (let i = 0; i < characters.length; i++) {
      html += CharacterCard.getHtml(characters[i]);
    }

    html += "</div>";
    return html;
  }
}
