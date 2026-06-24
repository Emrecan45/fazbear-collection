let cache = null;

export default class Catalog {

  // Charge le catalogue statique (db.json) une seule fois et le garde en cache
  static async load() {
    if (cache !== null) {
      return cache;
    }

    const base = import.meta.env.BASE_URL;
    const response = await fetch(base + "db.json");
    const data = await response.json();

    // Les images sont stockees en chemin absolu "/assets/..." : on les prefixe avec le base
    for (let i = 0; i < data.characters.length; i++) {
      const c = data.characters[i];
      if (c.image && c.image.charAt(0) === "/") {
        c.image = base + c.image.slice(1);
      }
    }

    cache = data;
    return cache;
  }

  static async getCharacters() {
    const data = await this.load();
    return data.characters;
  }

  static async getEquipment() {
    const data = await this.load();
    return data.equipment;
  }
}
