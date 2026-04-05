export default class FavoritesService {

  // Retourne la cle de la valeur dans le localStorage pour le type donne (equipment ou personnage)
  static getStorageCle(type) {
    if (type === "equipments") {
      return "favorisEquipements";
    } else {
      return "favorisPersonnages";
    }
  }

  // Retourne la liste des ids favoris pour un type donné (soit personnage soit equipement)
  static getFavorites(type) {
    let cle = this.getStorageCle(type);
    let str = localStorage.getItem(cle);
    let resultat = [];

    if (str !== null) {
      resultat = JSON.parse(str);
    } else {
      resultat = [];
    }
    return resultat;
  }

  // Vérifie si un élément est dans les favoris
  static isFavorite(id, type) {
    let favs = this.getFavorites(type);
    let trouve = false;

    for (let i = 0; i < favs.length; i++) {
      if (favs[i] == id) {
        trouve = true;
        break;
      }
    }

    return trouve;
  }

  // Ajoute un élément aux favoris (si il n'est pas deja dans la liste)
  static addFavorite(id, type) {
    let cle = this.getStorageCle(type);
    let favs = this.getFavorites(type);
    let possede = false;

    for (let i = 0; i < favs.length; i++) {
      if (favs[i] == id) {
        possede = true;
        break;
      }
    }

    if (possede === false) {
      favs.push(id);
      let jsonStr = JSON.stringify(favs);
      localStorage.setItem(cle, jsonStr);
    }

    return favs;
  }

  // Retire un élément des favoris
  static removeFavorite(id, type) {
    let cle = this.getStorageCle(type);
    let favs = this.getFavorites(type);
    let nouveau = [];

    for (let i = 0; i < favs.length; i++) {
      if (favs[i] != id) {
        nouveau.push(favs[i]);
      }
    }

    let jsonStr = JSON.stringify(nouveau);
    localStorage.setItem(cle, jsonStr);

    return nouveau;
  }

  // Change l'état d'un favori : s'il est dejà favori ca le retire des favoris sinon ca l'ajoute aux favori
  static toggleFavorite(id, type) {
    let etatActuel = this.isFavorite(id, type);

    if (etatActuel === true) {
      this.removeFavorite(id, type);
      return false; // Ce n'est plus un favori
    } else {
      this.addFavorite(id, type);
      return true; // C'est devenu un favori
    }
  }
}
