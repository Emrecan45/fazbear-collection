import CharacterProvider from "../services/CharacterProvider.js";
import EquipmentProvider from "../services/EquipmentProvider.js";
import GachaService from "../services/GachaService.js";
import CharacterCard from "../components/CharacterCard.js";
import EquipmentCard from "../components/EquipmentCard.js";

export default class BoutiqueView {
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

    btnPerso.onclick = function() {
      const obtenu = GachaService.tirageAleatoire(personnages);
      GachaService.ajouterPersonnageAInventaire(obtenu.id);
      resultContainer.innerHTML = `<div class="row justify-content-center">${CharacterCard.getHtml(obtenu, false)}</div>`;
    };

    btnEquip.onclick = function() {
      const obtenu = GachaService.tirageAleatoire(equipements);
      GachaService.ajouterEquipementAInventaire(obtenu.id);
      resultContainer.innerHTML = `<div class="row justify-content-center">${EquipmentCard.getHtml(obtenu, false)}</div>`;
    };
  }
}
