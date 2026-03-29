import CharacterProvider from "../services/CharacterProvider.js";
import EquipmentProvider from "../services/EquipmentProvider.js";
import Utils from "../services/Utils.js";
import RarityBadge from "../components/RarityBadge.js";

export default class DetailCharacterView {
  static async render(id, origine) {
    
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
          
          <p class="fs-5 mb-2" data-stat="force">Force : ${character.stats.force}</p>
          <p class="fs-5 mb-2" data-stat="agilite">Agilité : ${character.stats.agilite}</p>
          <p class="fs-5 mb-2" data-stat="intelligence">Intelligence : ${character.stats.intelligence}</p>
          <div id="champ-equipmnt"></div>

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

    // Afficher le bonus d'équipement uniquement si on vient de l'inventaire
    if (origine === 'inventaire') {
      const tousLesEquipements = await EquipmentProvider.fetchEquipments();
      let equipementActuel = null;
      
      // On cherche l'équipement du personnage
      if (character.equipmentId !== null && character.equipmentId !== undefined) {
        for (let k = 0; k < tousLesEquipements.length; k++) {
          if (tousLesEquipements[k].id === character.equipmentId) {
            equipementActuel = tousLesEquipements[k];
            break;
          }
        }
      }
      this.appliquerEquipmentBonus(equipementActuel, character);

      // Proposer les équipements du joueur
      const equipementsPossedes = await EquipmentProvider.fetchEquipementsPossedes();
      const zoneAttribution = section.querySelector("#champ-equipmnt");
      
      if (equipementsPossedes && equipementsPossedes.length > 0) {
        const interfaceAttribution = this.renderAssignEquipment(character, equipementsPossedes);
        if (zoneAttribution && interfaceAttribution) {
          zoneAttribution.appendChild(interfaceAttribution);
        }
      }
    }
  }

  static renderAssignEquipment(character, equipementsDisponibles) {
    const conteneur = document.createElement("div");

    const etiquette = document.createElement("label");
    etiquette.setAttribute("for", "select-equipement");
    etiquette.className = "text-white fs-5 mb-2 me-2"; 
    etiquette.textContent = "Équipement :";
    conteneur.appendChild(etiquette);

    const menuDeroulant = document.createElement("select");
    menuDeroulant.id = "select-equipement";
    menuDeroulant.className = "form-select form-card mb-2 d-inline-block w-auto";

    const optionAucun = document.createElement("option");
    optionAucun.value = "";
    optionAucun.textContent = "Aucun";
    menuDeroulant.appendChild(optionAucun);

    for (let i = 0; i < equipementsDisponibles.length; i++) {
      const equipement = equipementsDisponibles[i];
      const option = document.createElement("option");
      option.value = equipement.id;
      option.textContent = equipement.name;
      
      // verifier si c'est l'équipement actuel du personnage
      if (character.equipmentId !== null && character.equipmentId !== undefined) {
          if (character.equipmentId === equipement.id) {
              option.selected = true;
          }
      }
      menuDeroulant.appendChild(option);
    }

    conteneur.appendChild(menuDeroulant);

    // Changement d'équipement
    menuDeroulant.addEventListener("change", async function() {
      let valeurChoisie = this.value;
      let nouvelId = null;
      
      if (valeurChoisie !== "") {
        nouvelId = valeurChoisie;
      }

      await CharacterProvider.updateCharacterEquipment(character.id, nouvelId);
      
      character.equipmentId = nouvelId;
      let equipementAssigne = null;
      
      if (nouvelId !== null) {
          for (let j = 0; j < equipementsDisponibles.length; j++) {
            if (equipementsDisponibles[j].id === nouvelId) {
              equipementAssigne = equipementsDisponibles[j];
              break;
            }
          }
      }
      DetailCharacterView.appliquerEquipmentBonus(equipementAssigne, character);
    });

    return conteneur;
  }

  static appliquerEquipmentBonus(equipement, character) {
    const section = document.getElementById("personnage");
    // Nettoyage des anciens bonus affichés
    const lignesStats = section.querySelectorAll("[data-stat]");
    for (let i = 0; i < lignesStats.length; i++) {
      const ancienBadge = lignesStats[i].querySelector(".equipment-bonus");
      if (ancienBadge) {
        ancienBadge.parentNode.removeChild(ancienBadge);
      }
    }

    if (equipement !== null) {
      const bonus = Utils.parseBonusStat(equipement.bonusStat);
      const ligneCible = section.querySelector("[data-stat='" + bonus.stat + "']");
      const total = character.stats[bonus.stat] + bonus.valeur;

      const badge = document.createElement("span");
      badge.className = "equipment-bonus text-success ms-2";
      badge.textContent = `${bonus.texte} (${total})`;
      ligneCible.appendChild(badge);
    }
  }
}
