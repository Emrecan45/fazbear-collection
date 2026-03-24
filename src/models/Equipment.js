// src/models/Equipment.js

export default class Equipment {
  constructor(id, name, bonusStat, rarete) {
    this.id = id;
    this.name = name;
    this.bonusStat = bonusStat;
    this.rarete = rarete;
  }

  getBadgeColor() {
    switch (this.rarete.toLowerCase()) {
      case "légendaire":
        return "warning";
      case "mythique":
        return "danger";
      case "épique":
        return "info";
      case "rare":
        return "primary";
      default:
        return "secondary";
    }
  }
}
