import Utils from "../services/Utils.js";

export default class AccueilView {
  static async render() {
    let section = document.getElementById("accueil");
    section.innerHTML = "<h1 class='text-center text-white my-4'>Bienvenue sur Fazbear.io !</h1>"
  }
}
