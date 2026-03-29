import Equipment from "../models/Equipment.js";

export default class EquipmentProvider {
  static async fetchEquipments() {
    try {
      const response = await fetch("http://localhost:3000/equipment");
      const json = await response.json();

      const tableauObjets = [];
      for (let i = 0; i < json.length; i++) {
        const item = json[i];
        const nouvelEquipement = new Equipment(
          item.id,
          item.name,
          item.bonusStat,
          item.rarete,
        );
        tableauObjets.push(nouvelEquipement);
      }

      return tableauObjets;
    } catch (err) {
      console.error("Erreur EquipmentProvider :", err);
      return [];
    }
  }

  static filterEquipments(equipements, criteres) {
    let resultats = [];

    for (let i = 0; i < equipements.length; i++) {
      let e = equipements[i];
      let correspond = true;

      if (criteres.search !== "") {
        let nomMin = (e.name || "").toLowerCase();
        let searchMin = criteres.search.toLowerCase();
        if (nomMin.indexOf(searchMin) === -1) {
          correspond = false;
        }
      }

      if (criteres.rarete !== "") {
        let rareteEq = (e.rarete || "").toLowerCase();
        if (rareteEq !== criteres.rarete.toLowerCase()) {
          correspond = false;
        }
      }

      // Filtrer par type de bonus si la valeur note est utilisée pour les équipements
      if (criteres.note !== "") {
        let wanted = criteres.note.toLowerCase();
        let bonusTxt = (e.bonusStat || "").toLowerCase();
        if (bonusTxt.indexOf(wanted) === -1) {
          correspond = false;
        }
      }

      if (correspond === true) {
        resultats.push(e);
      }
    }

    return resultats;
  }

  static async fetchEquipementsPossedes() {
    const equipements = await this.fetchEquipments();
    
    let idsSauvegardes = [];
    let sauvegarde = localStorage.getItem("inventaireEquipements");
    if (sauvegarde !== null) {
      idsSauvegardes = JSON.parse(sauvegarde);
    }

    let possedes = [];
    for (let i = 0; i < equipements.length; i++) {
      let e = equipements[i];
      let aTrouve = false;
      for (let j = 0; j < idsSauvegardes.length; j++) {
        if (idsSauvegardes[j] == e.id) {
          aTrouve = true;
          break;
        }
      }
      if (aTrouve === true) {
        possedes.push(e);
      }
    }
    return possedes;
  }
}
