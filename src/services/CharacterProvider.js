import Character from "../models/Character.js";
import URL_API from "../config.js";"../config.js";

export default class CharacterProvider {
  static filterCharacters(personnages, criteres) {
    let resultats = [];

    for (let i = 0; i < personnages.length; i++) {
      let p = personnages[i];
      let correspond = true;

      if (criteres.search !== "") {
        let nomMin = p.name.toLowerCase();
        let searchMin = criteres.search.toLowerCase();
        if (nomMin.indexOf(searchMin) === -1) {
          correspond = false;
        }
      }

      if (criteres.rarete !== "" && p.rarete !== criteres.rarete) {
        correspond = false;
      }

      if (criteres.note !== "" && (parseInt(p.note) || 0) !== parseInt(criteres.note)) {
        correspond = false;
      }

      if (criteres.favoris === true) {
        let estDansFavoris = false;
        for (let j = 0; j < criteres.favorisList.length; j++) {
          if (criteres.favorisList[j] == p.id) { 
            estDansFavoris = true;
            break;
          }
        }
        if (estDansFavoris === false) {
          correspond = false;
        }
      }

      if (correspond === true) {
        resultats.push(p);
      }
    }
    return resultats;
  }

  static async fetchCharacters() {
    try {
      // récupèrer la table de personnages
      const resPersos = await fetch(`${URL_API}/characters`);

      const charactersJson = await resPersos.json();
      const listePersonnagesComplets = [];

      for (let i = 0; i < charactersJson.length; i++) {
        const item = charactersJson[i];
        const perso = new Character(
          item.id,
          item.name,
          item.title,
          item.stats,
          item.description,
          item.note,
          item.image,
          item.rarete
        );
        if (item.equipmentId !== undefined) {
          perso.equipmentId = item.equipmentId;
        }
        listePersonnagesComplets.push(perso);
      }

      return listePersonnagesComplets;
    } catch (err) {
      console.error("Erreur CharacterProvider :", err);
      return [];
    }
  }

  static async getCharacter(id) {
    try {
      const response = await fetch(`${URL_API}/characters/${id}`);
      const c = await response.json();
      const perso = new Character(
        c.id,
        c.name,
        c.title,
        c.stats,
        c.description,
        c.note,
        c.image,
        c.rarete
      );
      if (c.equipmentId !== undefined) {
        perso.equipmentId = c.equipmentId;
      }
      return perso;
    } catch (err) {
      console.error("Erreur getCharacter :", err);
    }
  }

  static async fetchPersonnagesPossedes() {
    const personnages = await this.fetchCharacters();
    
    let idsSauvegardes = [];
    let sauvegarde = localStorage.getItem("inventairePersonnages");
    if (sauvegarde !== null) {
      idsSauvegardes = JSON.parse(sauvegarde);
    }

    let possedes = [];
    for (let i = 0; i < personnages.length; i++) {
      let p = personnages[i];
      let aTrouve = false;
      for (let j = 0; j < idsSauvegardes.length; j++) {
        if (idsSauvegardes[j] === p.id) {
          aTrouve = true;
          break;
        }
      }
      if (aTrouve === true) {
        possedes.push(p);
      }
    }
    return possedes;
  }

  static async updateCharacterEquipment(characterId, equipmentId) {
    // On récupère le personnage
    const responseGet = await fetch(`${URL_API}/characters/${characterId}`);
    const personnage = await responseGet.json();

    // On modifie l'id de l'équipement
    personnage.equipmentId = equipmentId;

    // On écrase l'ancien personnage par le nouveau avec le nouvel équipement
    const responsePut = await fetch(`${URL_API}/characters/${characterId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(personnage)
    });

    const updated = await responsePut.json();
    return updated;
  }

  static async updateCharacterNote(characterId, note) {
    const responseGet = await fetch(`${URL_API}/characters/${characterId}`);
    const personnage = await responseGet.json();

    personnage.note = note;

    const responsePut = await fetch(`${URL_API}/characters/${characterId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(personnage)
    });

    const updated = await responsePut.json();
    return updated;
  }

  static async resetEquipments() {
    const personnages = await this.fetchCharacters();
    for (let i = 0; i < personnages.length; i++) {
      let p = personnages[i];
      if (p.equipmentId !== null && p.equipmentId !== undefined) {
        await this.updateCharacterEquipment(p.id, null);
      }
    }
  }
}
