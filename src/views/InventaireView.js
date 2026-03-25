import CharacterProvider from "../services/CharacterProvider.js";
import CharactersList from "../components/CharactersList.js";

export default class InventaireView {
  static async render() {
    let section = document.getElementById("inventaire");
    const tousLesPersonnages = await CharacterProvider.fetchCharacters();

    let idsSauvegardes = [];
    const jsonIds = localStorage.getItem("inventaireJoueur");

    if (jsonIds !== null) {
      idsSauvegardes = JSON.parse(jsonIds);
    }

    if (idsSauvegardes.length === 0) {
      section.innerHTML = "<h1 class='text-center my-4'>Inventaire</h1><p class='text-center'>Votre inventaire est vide.</p>";
      return;
    }

    const personnagesDuJoueur = [];

    for (let i = 0; i < tousLesPersonnages.length; i++) {
      let trouve = false;
      for (let j = 0; j < idsSauvegardes.length; j++) {
        if (tousLesPersonnages[i].id === idsSauvegardes[j]) {
          trouve = true;
          break; // id trouvé
        }
      }
      if (trouve) {
        personnagesDuJoueur.push(tousLesPersonnages[i]);
      }
    }
    section.innerHTML = "<h1 class='text-center my-4'>Inventaire</h1>";
    section.innerHTML += CharactersList.getHtml(personnagesDuJoueur);
  }
}
