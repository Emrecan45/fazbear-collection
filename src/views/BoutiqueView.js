import EquipmentProvider from "../services/EquipmentProvider.js";

export default class BoutiqueView {
  static async render() {
    let section = document.getElementById("boutique");
    const equipements = await EquipmentProvider.fetchEquipments();
    section.innerHTML = "<h1 class='text-center my-4'>Boutique</h1>";
    // TODO: Créer une vue pour afficher la boutique
  }
}
