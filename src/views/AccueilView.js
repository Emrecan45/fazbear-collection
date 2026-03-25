import CharacterProvider from "../services/CharacterProvider.js";
import CharactersView from "./CharactersView.js";

export default class AccueilView {
  static async render() {
    let section = document.getElementById("accueil");
    section.innerHTML = "<p>Chargement en cours...</p>";

    const personnages = await CharacterProvider.fetchCharacters();
    section.innerHTML =
      "<h1 class='text-center my-4'>Liste des personnages</h1>";
    section.innerHTML += CharactersView.getHtml(personnages);
  }
}
