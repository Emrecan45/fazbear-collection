export default class CharacterCard {
  // fonction pour les couleurs de rareté
  static getBadgeColor(rarete) {
    switch (rarete.toLowerCase()) {
      case "mythique":
        return "danger"; // Rouge
      case "légendaire":
        return "warning text-dark"; // Jaune
      case "épique":
        return "info"; // Bleu clair
      case "rare":
        return "primary"; // Bleu
      default:
        return "secondary"; // Gris
    }
  }

  static getHtml(character) {
    let stars = "";
    let note = character.note;
    let badgeColor = this.getBadgeColor(character.rarete);

    for (let j = 1; j <= 5; j++) {
      if (j <= note) {
        stars += "<span>★</span>";
      } else {
        stars += "<span>☆</span>";
      }
    }

    return `
      <div class="col-md-4 mb-4">
        <div class="card card-compact h-100 shadow-sm">
            <img src="${character.image}" class="card-img-top card-compact-img" alt="${character.name}">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h5 class="card-title mb-0">${character.name}</h5>
                <span class="badge bg-${badgeColor}">${character.rarete}</span>
              </div>
              <h6 class="card-subtitle mb-2 text-muted">${character.title}</h6>            
              <ul class="list-group list-group-flush mb-3">
                <li class="list-group-item small">Force : ${character.stats.force}</li>
                <li class="list-group-item small">Agilité : ${character.stats.agilite}</li>
                <li class="list-group-item small">Intelligence : ${character.stats.intelligence}</li>
              </ul>
              
              <div class="d-flex justify-content-between align-items-center">
                <div class="text-warning">${stars}</div>
                <a href="#/personnage/${character.id}" class="btn btn-sm btn-outline-light">Détails</a>
              </div>
            </div>
        </div>
      </div>
    `;
  }
}