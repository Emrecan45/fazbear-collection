import Utils from '../services/Utils.js';

export default class Character {
  constructor(id, name, title, stats, description, note, image, rarete) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.stats = stats;
    this.description = description;
    this.note = note;
    this.image = image;
    this.rarete = rarete;

    this.inventory = [];
  }

  assignEquipment(equipmentList) {
    this.inventory = equipmentList;
  }

  getStatFinale(nomStat, equipement) {
    let base = this.stats[nomStat];
    if (equipement !== null && equipement.bonusStat !== undefined) {
      const bonus = Utils.parseBonusStat(equipement.bonusStat);
      if (bonus && bonus.stat === nomStat) {
          return base + bonus.valeur;
      }
    }
    return base;
  }
}
