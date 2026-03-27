import EquipmentCard from "./EquipmentCard.js";

export default class EquipmentList {
  static getHtml(equipements, page = 1, itemsParPage = 6) {
    if (!equipements || equipements.length === 0) {
      return "<p class='text-center'>Aucun équipement trouvé.</p>";
    }

    let startIndex = (page - 1) * itemsParPage;
    let endIndex = startIndex + itemsParPage;
    let html = '<div class="row">';

    for (let i = startIndex; i < endIndex; i++) {
      if (i < equipements.length) {
        let eq = equipements[i];
        html += EquipmentCard.getHtml(eq);
      }
    }

    html += '</div>';
    return html;
  }
}
