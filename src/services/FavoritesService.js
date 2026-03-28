export default class FavoritesService {
  
  static getStorageCle(type) {
    if (type === "equipments") {
      return "favorisEquipements";
    } else {
      return "favorisPersonnages";
    }
  }

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
