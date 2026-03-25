export default class CharacterCard {
  static getHtml(character) {
    let stars = "";
    let note = character.note;
    
    for (let j = 1; j <= 5; j++) {
      if (j <= note) {
        stars += "<span>★</span>";
      } else {
        stars += "<span>☆</span>";
      }
    }

    return `
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm">
          <img src="${character.image}" class="card-img-top" alt="${character.name}">
          <div class="card-body">
            <h5 class="card-title">${character.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${character.title}</h6>            
            <ul class="list-group list-group-flush mb-3">
              <li class="list-group-item small">Force : ${character.stats.force}</li>
              <li class="list-group-item small">Agilité : ${character.stats.agilite}</li>
              <li class="list-group-item small">Intelligence : ${character.stats.intelligence}</li>
            </ul>
            
            <div class="d-flex justify-content-between align-items-center">
              <div class="text-warning">${stars}</div>
              <a href="#/personnage/${character.id}" class="btn btn-sm btn-outline-secondary">Détails</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}