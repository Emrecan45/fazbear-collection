export default class AccueilView {

  // Affiche la page d'accueil avec la présentation du siteeeeeeeeee
  static async render() {
    let section = document.getElementById("accueil");
    section.style.display = "block";

    section.innerHTML = `
      <div class="container mt-5">
        <h1 class='text-center text-white my-4'>Bienvenue sur Fazbear Collection !</h1>
        
        <div class="row justify-content-center mt-5">
          <div class="col-md-8 text-center text-white" style="background-color: rgba(0, 0, 0, 0.7); padding: 40px;">
            
            <p class="fs-4 mb-5">L'application ultime pour les collectionneurs de l'univers <strong>Five Nights at Freddy's</strong>.</p>
            
            <div class="mb-4">
              <h4 class="text-white">Tirages</h4>
              <p class="fs-5">Utilisez la <a href="#/boutique" class="text-white">Boutique</a> pour effectuer des tirages et tenter de débloquer de nouveaux modèles rares.</p>
            </div>

            <div class="mb-4">
              <h4 class="text-white">Collection</h4>
              <p class="fs-5">
                Explorez le <a href="#/catalogue/personnages" class="text-white">Catalogue</a> complet pour découvrir tous les modèles existants,
                puis accédez à votre <a href="#/inventaire/personnages" class="text-white">Inventaire</a> pour gérer et admirer ceux que vous possédez.
              </p>
            </div>

            <div class="mb-4">
              <h4 class="text-white">Équipement</h4>
              <p class="fs-5">Attribuez des objets mécaniques à vos animatroniques pour modifier leurs statistiques de Force, Agilité et Intelligence.</p>
            </div>

            <div class="mb-4">
              <h4 class="text-white">Évaluation</h4>
              <p class="fs-5">Notez les modèles sur une échelle de 1 à 5 étoiles et marquez vos favoris.</p>
            </div>

          </div>
        </div>
      </div>
    `;
  }
}
