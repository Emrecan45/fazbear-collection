export default class EquipmentCard {
  static getBadgeColor(rarete) {
    switch (rarete.toLowerCase()) {
      case "mythique":
        return "primary";
      case "légendaire":
        return "warning text-dark";
      case "épique":
        return "info";
      case "rare":
        return "danger";
      default:
        return "secondary";
    }
  }

  static getHtml(eq) {
    let badgeColor = EquipmentCard.getBadgeColor(eq.rarete);

    return `
      <div class="col-md-4 mb-4">
        <div class="card card-compact h-100 shadow-sm border border-white bg-black text-white">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h5 class="card-title mb-0">${eq.name}</h5>
              <span class="badge bg-${badgeColor}">${eq.rarete}</span>
            </div>
            <p class="card-text">Bonus : ${eq.bonusStat}</p>
          </div>
        </div>
      </div>
    `;
  }
}
