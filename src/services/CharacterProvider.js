import Character from "../models/Character.js";

export default class CharacterProvider {
  static fetchCharacters = async () => {
    try {
      // récupèrer les tables
      const resPersos = await fetch("http://localhost:3000/characters");
      const resEquip = await fetch("http://localhost:3000/equipment");
      const resLiaisons = await fetch("http://localhost:3000/character_equipment");

      const charactersJson = await resPersos.json();
      const equipmentsJson = await resEquip.json();
      const liaisonsJson = await resLiaisons.json();

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

        const sonInventaire = [];

        // parcourir toutes les liaisons
        for (let j = 0; j < liaisonsJson.length; j++) {
          const lien = liaisonsJson[j];

          // si le lien appartient à ce personnage
          if (lien.characterId === item.id) {
            // On cherche l'equipement dans la liste complete
            for (let k = 0; k < equipmentsJson.length; k++) {
              const equip = equipmentsJson[k];
              if (equip.id === lien.equipmentId) {
                sonInventaire.push(equip);
              }
            }
          }
        }

        perso.assignEquipment(sonInventaire);
        listePersonnagesComplets.push(perso);
      }

      return listePersonnagesComplets;
    } catch (err) {
      console.error("Erreur CharacterProvider :", err);
      return [];
    }
  };

  static getCharacter = async (id) => {
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
  };
}
