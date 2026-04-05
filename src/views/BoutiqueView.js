import CharacterProvider from "../services/CharacterProvider.js";
import EquipmentProvider from "../services/EquipmentProvider.js";
import GachaService from "../services/GachaService.js";
import CharacterCard from "../components/CharacterCard.js";
import EquipmentCard from "../components/EquipmentCard.js";

export default class BoutiqueView {

  // Affiche la boutique avec les boutons d'invocation
  static async render() {
    const personnages = await CharacterProvider.fetchCharacters();
    const equipements = await EquipmentProvider.fetchEquipments();

    const section = document.getElementById("boutique");
    section.innerHTML = `
      <h1 class='text-center text-white my-4'>Boutique</h1>
      <div class='d-flex justify-content-center mb-3'>
        <button id='btn-invoquer-personnage' class='btn btn-outline-light btn-lg mx-2'>Invoquer un Animatronique</button>
        <button id='btn-invoquer-equipement' class='btn btn-outline-light btn-lg mx-2'>Invoquer un Équipement</button>
      </div>
      <div id='result-container' class='mt-4'></div>
    `;

    const btnPerso = document.getElementById('btn-invoquer-personnage');
    const btnEquip = document.getElementById('btn-invoquer-equipement');
    const resultContainer = document.getElementById('result-container');

    // Invoque un personnage aléatoire, l'ajoute à l'inventaire et l'affiche avec une animation
    btnPerso.onclick = function() {
      const obtenu = GachaService.tirageAleatoire(personnages);
      GachaService.ajouterPersonnageAInventaire(obtenu.id);
      btnPerso.disabled = true;
      btnEquip.disabled = true;
      resultContainer.innerHTML = `<div class="row justify-content-center card-invoc">${CharacterCard.getHtml(obtenu, false)}</div>`;
      resultContainer.offsetWidth; // Reinitialise l'état du rendu avant d'appliquer l'effet visuel
      resultContainer.querySelector(".card-invoc").classList.add("active");
      setTimeout(() => {
        btnPerso.disabled = false;
        btnEquip.disabled = false;
      }, 1000);
    };

    // Invoque un équipement aléatoire, l'ajoute à l'inventaire et l'affiche avec une animation
    btnEquip.onclick = function() {
      const obtenu = GachaService.tirageAleatoire(equipements);
      GachaService.ajouterEquipementAInventaire(obtenu.id);
      btnPerso.disabled = true;
      btnEquip.disabled = true;
      resultContainer.innerHTML = `<div class="row justify-content-center card-invoc">${EquipmentCard.getHtml(obtenu, false)}</div>`;
      resultContainer.offsetWidth;// Renitialise l'état du rendu avant d'appliquer l'effet visuel
      resultContainer.querySelector(".card-invoc").classList.add("active");
      setTimeout(() => {
        btnPerso.disabled = false;
        btnEquip.disabled = false;
      }, 1000);
    };
  }
}
