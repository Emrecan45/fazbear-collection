import RarityBadge from "./RarityBadge.js";
import FavoriteButton from "./FavoriteButton.js";

export default class EquipmentCard {

  static getHtml(eq, boutonFavori = true) {
    let badgeRarete = RarityBadge.getHtml(eq.rarete);
    let coeurHtml = "";
    if (boutonFavori === true) {
      coeurHtml = FavoriteButton.getHtml(eq.id, 'equipments', "position: absolute; top: 4px; right: 13px;");
    }
    return `
      <div class="col-md-4 mb-4">
        <div class="card card-compact h-100 border-white bg-black text-white">
          <div class="card-body">
            <div>
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h5 class="card-title mb-0">${eq.name}</h5>
                <span>${coeurHtml}</span>
              </div>
                <p class="card-text mb-0 d-flex justify-content-between align-items-center">
                  <span>Bonus : ${eq.bonusStat}</span>
                  ${badgeRarete}
                </p>
              </div>
          </div>
        </div>
      </div>
    `;
  }
}
