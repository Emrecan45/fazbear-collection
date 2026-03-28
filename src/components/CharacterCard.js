import RarityBadge from "./RarityBadge.js";

export default class CharacterCard {

  static getHtml(character, boutonFavori = true) {
    let etoiles = "";
    let note = character.note;

    // Afficher les étoiles seulement si l'utilisateur a déjà donné une note au perso
    if (typeof note !== "undefined" && note > 0) {
      for (let j = 1; j <= 5; j++) {
        if (j <= note) {
          etoiles += "<span>★</span>";
        } else {
          etoiles += "<span>☆</span>";
        }
      }
    }

      // mettre le coeur de favoris seulement si boutonFavori est true
      let coeurHtml = "";
      if (boutonFavori === true) {
        // Récupération des favoris du localStorage
        let favorisStr = localStorage.getItem("favorisPersonnages");
        let favoris = [];
      if (favorisStr !== null) {
        favoris = JSON.parse(favorisStr);
      }

      // Vérification si le personnage est dans les favoris
      let estFavori = false;
      for (let i = 0; i < favoris.length; i++) {
        if (favoris[i] == character.id) {
          estFavori = true;
          break;
        }
      }

      // classes et couleur pour le coeur de favori
      let coeurClass = "bi-heart";
      let coeurColor = "#6c757d";
      
      if (estFavori === true) {
        coeurClass = "bi-heart-fill";
        coeurColor = "#dc3545";
      }

      coeurHtml = `<i class="bi ${coeurClass} position-absolute btn-favori" data-id="${character.id}" style="top: 10px; right: 15px; font-size: 1.5rem; cursor: pointer; color: ${coeurColor};"></i>`;
    }

    return `
      <div class="col-md-4 mb-4">
        <div class="card card-compact h-100 shadow-sm position-relative">
            
            ${coeurHtml}

            <img src="${character.image}" loading="lazy" class="card-img-top card-compact-img" alt="${character.name}">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h5 class="card-title mb-0">${character.name}</h5>
                ${RarityBadge.getHtml(character.rarete)}
              </div>
              <h6 class="card-subtitle mb-2 text-muted">${character.title}</h6>            
              
              <div class="d-flex justify-content-between align-items-center">
                <div class="text-warning">${etoiles}</div>
                <a href="#/personnage/${character.id}" class="btn btn-sm btn-outline-light">Détails</a>
              </div>
            </div>
        </div>
      </div>
    `;
  }

  static gererFavoris() {
    let boutons = document.querySelectorAll(".btn-favori");
    
    for (let k = 0; k < boutons.length; k++) {
      boutons[k].onclick = function() {
        
        // recuperer l'id du personnage à partir du data-id du bouton cliqué
        let idString = this.getAttribute("data-id");
        let id = parseInt(idString);
        
        let favorisStr = localStorage.getItem("favorisPersonnages");
        let favoris = [];
        if (favorisStr !== null) {
          favoris = JSON.parse(favorisStr);
        }

        let possede = false;
        for (let i = 0; i < favoris.length; i++) {
          if (favoris[i] == id) {
            possede = true;
            break;
          }
        }

        if (possede === true) {
          let nouveauTableau = [];
          for (let i = 0; i < favoris.length; i++) {
            if (favoris[i] != id) {
              nouveauTableau.push(favoris[i]);
            }
          }
          favoris = nouveauTableau;

          // icone du coeur coeur vide
          this.classList.remove("bi-heart-fill");
          this.classList.add("bi-heart");
          this.style.color = "#6c757d"; 
          
        } else {
          // mettre le personnage dans les favoris
          favoris.push(id);
          // changer l'icone du coeur vers coeur rouge rempli
          this.classList.remove("bi-heart");
          this.classList.add("bi-heart-fill");
          this.style.color = "#dc3545"; 
        }

        localStorage.setItem("favorisPersonnages", JSON.stringify(favoris));
      };
    }
  }
}
