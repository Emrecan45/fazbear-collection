export default class StatBar {
  static getHtml(nomStat, nomAffichage, valeurDeBase, couleur) {
    return `
      <div class="mb-3" data-stat="${nomStat}" data-base="${valeurDeBase}">
        <div class="stat-label text-white fs-5 mb-1">${nomAffichage} : ${valeurDeBase}</div>
        <progress class="w-100" value="${valeurDeBase}" max="100" style="height: 25px; accent-color: ${couleur};"></progress>
      </div>
    `;
  }
}
