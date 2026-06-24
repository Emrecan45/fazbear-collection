import Character from "../models/Character.js";
import Catalog from "./Catalog.js";
import RatingService from "./RatingService.js";
import I18n from "./I18n.js";

const CLE_EQUIP = "fazbear_equipements"; // { [characterId]: equipmentId } : equipement assigne (local au navigateur)

export default class CharacterProvider {

  // Filtre une liste de personnages selon les critères
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

  // Lit la table des equipements assignes depuis le localStorage
  static lireEquipements() {
    let str = localStorage.getItem(CLE_EQUIP);
    if (str === null) {
      return {};
    }
    return JSON.parse(str);
  }

  // Construit un objet Character a partir d'une entree du catalogue + la note partagee
  static construire(item, stat) {
    const enAnglais = I18n.getLang() === "en";
    const titre = (enAnglais && item.title_en) ? item.title_en : item.title;
    const description = (enAnglais && item.description_en) ? item.description_en : item.description;

    const perso = new Character(
      item.id,
      item.name,
      titre,
      item.stats,
      description,
      item.note,
      item.image,
      item.rarete
    );
    if (stat) {
      perso.note = stat.moyenne;
      perso.nombre = stat.nombre;
    } else {
      perso.note = "0.0";
      perso.nombre = 0;
    }
    return perso;
  }

  // Récupère tous les personnages du catalogue et les convertit en objets Character
  static async fetchCharacters() {
    const catalogue = await Catalog.getCharacters();
    const stats = await RatingService.chargerStats();

    const liste = [];
    for (let i = 0; i < catalogue.length; i++) {
      liste.push(this.construire(catalogue[i], stats[catalogue[i].id]));
    }
    return liste;
  }

  static async getCharacter(id) {
    const catalogue = await Catalog.getCharacters();

    for (let i = 0; i < catalogue.length; i++) {
      if (catalogue[i].id == id) {
        const stat = await RatingService.stat(catalogue[i].id);
        return this.construire(catalogue[i], stat);
      }
    }
    return null;
  }

  // Retourne les personnages que le joueur possède (stockés en localStorage)
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

  // Retourne l'equipmentId du joueur pour un personnage donné (null si aucun)
  static async getPlayerEquipmentId(characterId) {
    const equipements = this.lireEquipements();
    if (equipements[characterId] !== undefined) {
      return equipements[characterId];
    }
    return null;
  }

  // Met à jour l'équipement assigné à un personnage
  static async updateCharacterEquipment(characterId, equipmentId) {
    const equipements = this.lireEquipements();
    if (equipmentId === null) {
      delete equipements[characterId];
    } else {
      equipements[characterId] = equipmentId;
    }
    localStorage.setItem(CLE_EQUIP, JSON.stringify(equipements));
  }

  // Enregistre la note du visiteur (partagee) et renvoie la nouvelle moyenne
  static async updateCharacterNote(characterId, note) {
    return RatingService.voter(characterId, note);
  }
}
