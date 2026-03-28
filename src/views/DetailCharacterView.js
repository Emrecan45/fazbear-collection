import CharacterProvider from "../services/CharacterProvider.js";
import RarityBadge from "../components/RarityBadge.js";

export default class DetailCharacterView {
  static async render(id) {
    
    // on cible d'abord la section ou on va afficher le personnage
    let section = document.getElementById("personnage");
    

    section.style.display = "block";

    // récupère les données du personage grace au Provider
    const character = await CharacterProvider.getCharacter(id);

    // gestion des sauvegardes pour la note avec localstorage
    let texteNotes = localStorage.getItem("notesPersonnages");
    let notes = {};
    if (texteNotes !== null) {
      notes = JSON.parse(texteNotes);
    }

    let noteActuelle = 0;
    if (notes[character.id] !== undefined) {
      noteActuelle = notes[character.id]; // la note donné par l'utilisateur
    } else if (character.note !== undefined) {
      noteActuelle = character.note; // note de base dans la bdd
    }

    section.innerHTML = `
      <div class="row mt-4 mb-4">
        <div class="col-md-5 text-center">
          <h2>${RarityBadge.getHtml(character.rarete)}</h2>
          <h1 class="text-white">${character.name}</h1>
        </div>
      </div>

      <div class="row">
        <div class="col-md-5 mb-4 text-center">
          <img src="${character.image}" alt="${character.name}" style="max-height: 400px;">
          
          <div class="mt-3">
            <div class="fs-5 mb-2 text-white">Notez cet animatronique</div>
              <div class="text-warning" style="font-size: 1.8rem;">
                <span class="star" data-value="1" style="cursor: pointer;">☆</span>
                <span class="star" data-value="2" style="cursor: pointer;">☆</span>
                <span class="star" data-value="3" style="cursor: pointer;">☆</span>
                <span class="star" data-value="4" style="cursor: pointer;">☆</span>
                <span class="star" data-value="5" style="cursor: pointer;">☆</span>
              </div>
          </div>
        </div>

        <div class="col-md-7 text-white">
          <h3>${character.title}</h3>
          <p class="fs-5 mb-4">${character.description}</p>
          
          <p class="fs-5 mb-2">Force : ${character.stats.force}</p>
          <p class="fs-5 mb-2">Agilité : ${character.stats.agilite}</p>
          <p class="fs-5 mb-2">Intelligence : ${character.stats.intelligence}</p>

          <div class="mt-auto text-end pt-3">
            <button id="back-btn" class="btn btn-outline-light">Retour</button>
          </div>
        </div>
      </div>
    `;

    // ajout des evenement
    const etoiles = section.querySelectorAll(".star");

    function majEtoiles(valeur) {
      for (let i = 0; i < etoiles.length; i++) {
        let valeurEtoile = parseInt(etoiles[i].getAttribute("data-value"));
        if (valeurEtoile <= valeur) {
          etoiles[i].textContent = "★";
        } else {
          etoiles[i].textContent = "☆";
        }
      }
    }

    if (noteActuelle > 0) {
      majEtoiles(noteActuelle);
    }

    for (let i = 0; i < etoiles.length; i++) {
      etoiles[i].addEventListener("click", function() {
        let noteChoisie = parseInt(this.getAttribute("data-value"));
        notes[character.id] = noteChoisie;
        localStorage.setItem("notesPersonnages", JSON.stringify(notes));
        majEtoiles(noteChoisie);
      });
    }

    // Gestion du bouton retour
    const boutonRetour = section.querySelector("#back-btn");
    boutonRetour.addEventListener("click", function() {
      window.history.back();
    });
  }
}
