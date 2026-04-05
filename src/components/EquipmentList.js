import EquipmentCard from "./EquipmentCard.js";

export default class EquipmentList {

  // Génère le HTML de la liste des équipements pour une page donnée
  static getHtml(equipements, page = 1, itemsParPage = 6) {
    if (!equipements || equipements.length === 0) {
      return "<p class='text-center'>Aucun équipement trouvé.</p>";
    }

    // Calcule les indices de début et fin pour la page courante
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
