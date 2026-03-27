import CharacterProvider from "../services/CharacterProvider.js";

export default class DetailCharacterView {
  static async render(id) {
    
    // on cible d'abord la section ou on va afficher le personnage
    
    let section = document.getElementById("personnage");
    
    if (section === null) {
      console.log("Erreur : la balise avec l'id 'personnage' n'existe pas dans le HTML");
      return;
    }

    section.style.display = "block";

    // récupère les données du personage grace au Provider
    const character = await CharacterProvider.getCharacter(id);

    if (character === undefined || character === null) {
      section.innerHTML = "<p>Personnage introuvable.</p>";
      return; 
    }

    // gestion des sauvegardes avec localstorage
    let texteFavoris = localStorage.getItem("favorisPersonnages");
    let texteNotes = localStorage.getItem("notesPersonnages");

    // on transforme le texte en vrai tableaux/objets js. 
    // et si c'est vide, on crée un array vide [] ou un objet vide {}
    let favoris = [];
    if (texteFavoris !== null) {
      favoris = JSON.parse(texteFavoris);
    }

    let notes = {};
    if (texteNotes !== null) {
      notes = JSON.parse(texteNotes);
    }

    // préparation des données à afficher

    let noteActuelle = 0;
    if (notes[character.id] !== undefined) {
      noteActuelle = notes[character.id]; // la note donné par l'utilisateur
    } else if (character.note !== undefined) {
      noteActuelle = character.note; // note de base dans la bdd
    }

    let estFavori = false;
    if (favoris.includes(character.id)) {
      estFavori = true;
    }

    // fonction simple pour créer le HTML des étoiles https://openclassrooms.com/forum/sujet/javascript-systeme-de-notation-a-etoiles-53989
    function genererEtoiles(note) {
      let htmlEtoiles = "";
      for (let i = 1; i <= 5; i++) {
        if (i <= note) {
          htmlEtoiles += "<span>★</span>"; 
        } else {
          htmlEtoiles += "<span>☆</span>";
        }
      }
      return `<div class="text-warning" id="stars-display">${htmlEtoiles}</div>`;
    }

    let classeBoutonFavori = "btn-outline-primary";
    let texteBoutonFavori = "Ajouter aux favoris";

    if (estFavori === true) {
      classeBoutonFavori = "btn-primary";
      texteBoutonFavori = "Supprimer des favoris";
    }

    // création de l'affichage html
    section.innerHTML = `
      <div class="row">
        <div class="col-12">
          <h1 class="my-4">${character.name}</h1>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-md-4">
          <img src="${character.image}" alt="${character.name}" class="img-fluid rounded shadow-sm">
        </div>
        <div class="col-md-8">
          <h5 class="text-muted">${character.title}</h5>
          <p id="character-description">${character.description}</p>

          <div class="mb-3">
            <h6>Stats</h6>
            <ul class="list-group list-group-flush">
              <li class="list-group-item small">Force : ${character.stats.force}</li>
              <li class="list-group-item small">Agilité : ${character.stats.agilite}</li>
              <li class="list-group-item small">Intelligence : ${character.stats.intelligence}</li>
            </ul>
          </div>

          <div class="d-flex align-items-center gap-3 mb-3">
            <div id="stars-container">${genererEtoiles(noteActuelle)}</div>
            <button id="favori-btn" class="btn ${classeBoutonFavori}">
              ${texteBoutonFavori}
            </button>
          </div>

          <div class="card p-3">
            <form id="rating-form">
              <div class="mb-2">Donnez une note (1-5) :</div>
              <div class="d-flex align-items-center gap-2">
                <select id="rating-select" class="form-select w-auto">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button class="btn btn-success" type="submit">Enregistrer la note</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    // ajout des evenement (clicks)
    
    const selectNote = section.querySelector("#rating-select");
    if (noteActuelle === 0) {
      selectNote.value = "1";
    } else {
      selectNote.value = noteActuelle;
    }

    const boutonFavori = section.querySelector("#favori-btn");
    boutonFavori.addEventListener("click", () => {
      if (favoris.includes(character.id)) {
        const position = favoris.indexOf(character.id);
        favoris.splice(position, 1);
        
        boutonFavori.className = "btn btn-outline-primary";
        boutonFavori.textContent = "Ajouter aux favoris";
      } 
      else {
        favoris.push(character.id);
        
        boutonFavori.className = "btn btn-primary";
        boutonFavori.textContent = "Supprimer des favoris";
      }
      
      // on sauvegarde le nouveau tableau dans le navigateur
      localStorage.setItem("favorisPersonnages", JSON.stringify(favoris));
    });

    // le clic sur "Enregistrer la note"
    const formulaireNote = section.querySelector("#rating-form");
    formulaireNote.addEventListener("submit", (evenement) => {
      
      // récupère la note choisie et la transforme en nombre
      let nouvelleNote = parseInt(selectNote.value);
      
      // enregistre la note dans notre objet
      notes[character.id] = nouvelleNote;
      localStorage.setItem("notesPersonnages", JSON.stringify(notes));
      
      // maj l'affichage des étoiles
      const affichageEtoiles = section.querySelector("#stars-display");
      affichageEtoiles.innerHTML = genererEtoiles(nouvelleNote);
    });
  }
}