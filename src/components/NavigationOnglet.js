import I18n from "../services/I18n.js";

export default class NavigationOnglet {

  // Gere l'affichage de l'onglet actif dans la navigation
  static gererOngletsActifs(mode) {
    let tabCharacters = document.getElementById('tab-characters');
    let tabEquipment = document.getElementById('tab-equipment');
    
    if (tabCharacters === null || tabEquipment === null) {
      return;
    }

    if (mode === 'equipements') {
      tabEquipment.classList.add('active');
      tabCharacters.classList.remove('active');
    } else {
      tabCharacters.classList.add('active');
      tabEquipment.classList.remove('active');
    }
  }

  // Adapte les options du filtre note selon le mode : étoiles pour les perso et stats pour les équipements
  static setNoteFilter(modeActuel) {
    let noteSelect = document.getElementById('noteFilter');
    if (noteSelect === null) {
      return;
    }
    
    if (modeActuel === 'personnages') {
      noteSelect.innerHTML = '<option value="">' + I18n.t("filter_all_notes") + '</option><option value="1">★</option><option value="2">★★</option><option value="3">★★★</option><option value="4">★★★★</option><option value="5">★★★★★</option>';
    } else {
      noteSelect.innerHTML = '<option value="">' + I18n.t("filter_bonus_types") + '</option><option value="force">' + I18n.t("stat_force") + '</option><option value="agilite">' + I18n.t("stat_agilite") + '</option><option value="intelligence">' + I18n.t("stat_intelligence") + '</option>';
    }
  }
}
