import RarityBadge from "./RarityBadge.js";

export default class EquipmentCard {

  static getHtml(eq) {
    let badgeRarete = RarityBadge.getHtml(eq.rarete);
    return `
      <div class="col-md-4 mb-4">
        <div class="card card-compact h-100 shadow-sm border border-white bg-black text-white">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h5 class="card-title mb-0">${eq.name}</h5>
              ${badgeRarete}
            </div>
            <p class="card-text">Bonus : ${eq.bonusStat}</p>
          </div>
        </div>
      </div>
    `;
  }
}
