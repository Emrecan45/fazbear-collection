function cacherToutesLesSections() {
  let sections = document.querySelectorAll(".section-page");
  for (let i = 0; i < sections.length; i++) {
    sections[i].style.display = "none";
  }
}

function afficherSectionAccueil() {
  cacherToutesLesSections();
  document.getElementById("accueil").style.display = "block";
}

function afficherSectionInventaire() {
  cacherToutesLesSections();
  document.getElementById("inventaire").style.display = "block";
}

function afficherSectionBoutique() {
  cacherToutesLesSections();
  document.getElementById("boutique").style.display = "block";
}

function router() {
  let currentHash = window.location.hash;

  if (currentHash === "#accueil" || currentHash === "") {
    afficherSectionAccueil();
  } else if (currentHash === "#inventaire") {
    afficherSectionInventaire();
  } else if (currentHash === "#boutique") {
    afficherSectionBoutique();
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
