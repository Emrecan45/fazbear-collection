export default class GachaService {
  
  static tirageAleatoire(liste) {
    // On prends un nbr au hasard entre 0 et 100 
    let proba = Math.random() * 100;
    let rareteChoisie = "";

    // On determine la rarete en fonction du nombre tiré
    if (proba <= 0.1) {
      rareteChoisie = "mythique";   // 0.1% de chance
    } else if (proba <= 2) {
      rareteChoisie = "légendaire"; // 2% de chance
    } else if (proba <= 10) {
      rareteChoisie = "épique";     // 10% de chance
    } else if (proba <= 30) {
      rareteChoisie = "rare";       // 30% de chance
    } else {
      rareteChoisie = "commun";     // 70% de chance
    }

    let candidats = [];
    for (let i = 0; i < liste.length; i++) {
      let item = liste[i];
      // Si la rareté de l'objet est celle qu'on a tirée au sort
      if (item.rarete.toLowerCase() === rareteChoisie) {
        candidats.push(item); // On l'ajoute dans notre liste de candidats
      }
    }

    // prendre un candidat au hasard parmi la liste des candidats
    let indexAleatoire = Math.floor(Math.random() * candidats.length); // maths.random = nbr entre 0 et 1 donc on multiplie par la longueur de la liste candidats
    return candidats[indexAleatoire];
  }

  static ajouterAInventaire(id) {
    let inventaire = [];
    let sauvegarde = localStorage.getItem('inventaireJoueur');

    //  récupère l'inventaire du localStorage et si pas encore d'inventaire dans localStorage, on fait avec une liste vide
    if (sauvegarde !== null) {
      inventaire = JSON.parse(sauvegarde);
    }

    // On ajoute le nouveau id a la liste de l'inventaire
    inventaire.push(id);

    // on met l'inventaire à jour dans le localStorage
    localStorage.setItem('inventaireJoueur', JSON.stringify(inventaire));
  }
}
