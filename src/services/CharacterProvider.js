import Character from "../models/Character.js";

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
          if (criteres.favorisList[j] === p.id) {
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
      const resPersos = await fetch("http://localhost:3000/characters");

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
          item.rarete,
        );
        // Appliquer notes utilisateur depuis le localStorage
        let notesPerso = {};
        const notesStr = localStorage.getItem("notesPersonnages");
        if (notesStr) {
          notesPerso = JSON.parse(notesStr);
        }

        if (notesPerso[perso.id]) {
          perso.note = notesPerso[perso.id];
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
      const response = await fetch(`http://localhost:3000/characters/${id}`);
      const c = await response.json();
      return new Character(
        c.id,
        c.name,
        c.title,
        c.stats,
        c.description,
        c.note,
        c.image,
        c.rarete,
      );
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
        if (idsSauvegardes[j] == p.id) {
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
}
