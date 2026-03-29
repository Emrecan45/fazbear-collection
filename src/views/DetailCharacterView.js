import CharacterProvider from "../services/CharacterProvider.js";
import EquipmentProvider from "../services/EquipmentProvider.js";
import Utils from "../services/Utils.js";
import RarityBadge from "../components/RarityBadge.js";
import StatBar from "../components/StatBar.js";

export default class DetailCharacterView {
  static async render(id, origine) {
    
    // on cible d'abord la section ou on va afficher le personnage
    let section = document.getElementById("personnage");
    

    section.style.display = "block";

    // récupère les données du personage grace au Provider
    const character = await CharacterProvider.getCharacter(id);

    let noteActuelle = 0;
    if (character.note !== undefined && character.note !== null) {
      noteActuelle = character.note;
    }

    section.innerHTML = `
      <div class="position-relative">
        <button id="back-btn" class="btn btn-outline-light position-absolute" style="top: 50px; left: 15px;">Retour</button>
        <div class="row">
          <div class="col-md-5 text-center">
            <h1 class="text-white my-5">${character.name}</h1>
            <img src="${character.image}" alt="${character.name}" style="max-height: 400px;">
            
            <div class="mt-3">
              <div class="fs-5 text-white">Notez cet animatronique</div>
                <div class="text-warning" style="font-size: 3rem;">
                  <span class="star" data-value="1" style="cursor: pointer;">☆</span>
                  <span class="star" data-value="2" style="cursor: pointer;">☆</span>
                  <span class="star" data-value="3" style="cursor: pointer;">☆</span>
                  <span class="star" data-value="4" style="cursor: pointer;">☆</span>
                  <span class="star" data-value="5" style="cursor: pointer;">☆</span>
                </div>
            </div>
          </div>

          <div class="col-md-7 text-white">
            <h3 class="mt-5">${character.title}</h3>
            <p class="fs-5 mb-4">${character.description}</p>
            
            <div class="d-flex align-items-center mb-4">
              <span class="fs-5 me-3">Rareté :</span>
              <h3 class="mb-0">${RarityBadge.getHtml(character.rarete)}</h3>
            </div>
            ${StatBar.getHtml('force', 'Force', character.stats.force, 'red')}
            ${StatBar.getHtml('agilite', 'Agilité', character.stats.agilite, 'green')}
            ${StatBar.getHtml('intelligence', 'Intelligence', character.stats.intelligence, 'blue')}
            <div id="champ-equipmnt"></div>
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
      etoiles[i].addEventListener("click", async function() {
        let noteChoisie = parseInt(this.getAttribute("data-value"));
        await CharacterProvider.updateCharacterNote(character.id, noteChoisie);
        character.note = noteChoisie;
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

      let texteInv = localStorage.getItem("inventaireEquipements");
      let monSac = [];
      if (texteInv !== null) {
          monSac = JSON.parse(texteInv);
      }
      
      if (character.equipmentId !== null && character.equipmentId !== undefined) {
        let jeLePossede = false;
        for (let i = 0; i < monSac.length; i++) {
            if (monSac[i] === character.equipmentId) {
                jeLePossede = true;
                break;
            }
        }

        if (jeLePossede === true) {
            for (let k = 0; k < tousLesEquipements.length; k++) {
              if (tousLesEquipements[k].id === character.equipmentId) {
                equipementActuel = tousLesEquipements[k];
                break;
              }
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
    const anciensBadges = section.querySelectorAll(".equipment-bonus");
    for (let i = 0; i < anciensBadges.length; i++) {
      anciensBadges[i].remove();
    }

    const statsList = ["force", "agilite", "intelligence"];
    
    for (let i = 0; i < statsList.length; i++) {
        const stat = statsList[i];
        const block = section.querySelector(`[data-stat='${stat}']`);
        
        if (block) {
            const label = block.querySelector(".stat-label");
            const bar = block.querySelector("progress");

            // on veux la valeur avec le bonus de l'équipement
            const valeurFinale = character.getStatFinale(stat, equipement);
            const baseVal = character.stats[stat];

            // Rendu du texte
            let nomPropre = "";
            if (stat === "force") {
                nomPropre = "Force";
            } else if (stat === "agilite") {
                nomPropre = "Agilité";
            } else if (stat === "intelligence") {
                nomPropre = "Intelligence";
            }
            label.textContent = `${nomPropre} : ${baseVal}`;

            // rendu de la barre de stat
            bar.value = valeurFinale;

            // texte de bonus si on en a un
            if (valeurFinale > baseVal && equipement !== null && equipement.bonusStat) {
                const bonus = Utils.parseBonusStat(equipement.bonusStat);
                const bonusTxt = document.createElement("span");
                bonusTxt.className = "equipment-bonus text-success ms-2";
                bonusTxt.textContent = `${bonus.texte} (${valeurFinale})`;
                label.appendChild(bonusTxt);
            }
        }
    }
  }
}
