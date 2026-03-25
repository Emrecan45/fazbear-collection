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
}
