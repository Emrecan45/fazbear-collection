const STRINGS = {
  en: {
    nav_home: "Home",
    nav_catalog: "Catalog",
    nav_inventory: "Inventory",
    nav_shop: "Shop",
    footer_part1: "Non-profit student project",
    footer_part2: "Images and descriptions come from the",
    footer_link: "FNaF Fandom Wiki",

    welcome_title: "Welcome to Fazbear Collection!",
    welcome_intro: "The ultimate app for collectors of the <strong>Five Nights at Freddy's</strong> universe.",
    welcome_draws_t: "Draws",
    welcome_draws: "Use the <a href='#/boutique' class='text-white text-decoration-underline'>Shop</a> to perform draws and try to unlock new rare models.",
    welcome_collection_t: "Collection",
    welcome_collection: "Browse the full <a href='#/catalogue/personnages' class='text-white text-decoration-underline'>Catalog</a> to discover every existing model, then head to your <a href='#/inventaire/personnages' class='text-white text-decoration-underline'>Inventory</a> to manage and admire the ones you own.",
    welcome_equip_t: "Equipment",
    welcome_equip: "Assign mechanical items to your animatronics to tweak their Strength, Agility and Intelligence stats.",
    welcome_rating_t: "Rating",
    welcome_rating: "Rate models on a scale of 1 to 5 stars and mark your favorites.",
    word_shop: "Shop",
    word_catalog: "Catalog",
    word_inventory: "Inventory",

    catalog_title: "Catalog",
    inventory_title: "Inventory",
    shop_title: "Shop",
    tab_characters: "Animatronics",
    tab_equipment: "Equipment",

    inv_empty_chars: "Your animatronics inventory is empty, go visit the shop!",
    inv_empty_equip: "Your equipment inventory is empty, go visit the shop!",

    shop_summon_char: "Summon an Animatronic",
    shop_summon_equip: "Summon an Equipment",

    detail_back: "Back",
    detail_rate: "Rate this animatronic",
    detail_rarity: "Rarity:",
    detail_equipment_label: "Equipment:",
    detail_none: "None",
    reviews: "reviews",

    stat_force: "Strength",
    stat_agilite: "Agility",
    stat_intelligence: "Intelligence",

    card_details: "Details",
    equip_bonus: "Bonus:",

    list_no_chars: "No animatronic found.",
    list_no_equip: "No equipment found.",

    search_placeholder: "Search by name...",
    filter_all_raretes: "All rarities",
    filter_all_notes: "All ratings",
    filter_bonus_types: "Bonus types",
    filter_favorites_only: "Favorites only",
    filter_reset: "Clear filters",

    pagination_prev: "Previous",
    pagination_next: "Next",
    pagination_page: "Page",

    raretes: {
      "Commun": "Common",
      "Rare": "Rare",
      "Épique": "Epic",
      "Légendaire": "Legendary",
      "Mythique": "Mythic"
    }
  },
  fr: {
    nav_home: "Accueil",
    nav_catalog: "Catalogue",
    nav_inventory: "Inventaire",
    nav_shop: "Boutique",
    footer_part1: "Projet pédagogique à but non lucratif",
    footer_part2: "Les images et descriptions proviennent du",
    footer_link: "Wiki FNaF Fandom",

    welcome_title: "Bienvenue sur Fazbear Collection !",
    welcome_intro: "L'application ultime pour les collectionneurs de l'univers <strong>Five Nights at Freddy's</strong>.",
    welcome_draws_t: "Tirages",
    welcome_draws: "Utilisez la <a href='#/boutique' class='text-white text-decoration-underline'>Boutique</a> pour effectuer des tirages et tenter de débloquer de nouveaux modèles rares.",
    welcome_collection_t: "Collection",
    welcome_collection: "Explorez le <a href='#/catalogue/personnages' class='text-white text-decoration-underline'>Catalogue</a> complet pour découvrir tous les modèles existants, puis accédez à votre <a href='#/inventaire/personnages' class='text-white text-decoration-underline'>Inventaire</a> pour gérer et admirer ceux que vous possédez.",
    welcome_equip_t: "Équipement",
    welcome_equip: "Attribuez des objets mécaniques à vos animatroniques pour modifier leurs statistiques de Force, Agilité et Intelligence.",
    welcome_rating_t: "Évaluation",
    welcome_rating: "Notez les modèles sur une échelle de 1 à 5 étoiles et marquez vos favoris.",
    word_shop: "Boutique",
    word_catalog: "Catalogue",
    word_inventory: "Inventaire",

    catalog_title: "Catalogue",
    inventory_title: "Inventaire",
    shop_title: "Boutique",
    tab_characters: "Animatroniques",
    tab_equipment: "Équipements",

    inv_empty_chars: "Votre inventaire d'animatroniques est vide, allez visiter la boutique !",
    inv_empty_equip: "Votre inventaire d'équipements est vide, allez visiter la boutique !",

    shop_summon_char: "Invoquer un Animatronique",
    shop_summon_equip: "Invoquer un Équipement",

    detail_back: "Retour",
    detail_rate: "Notez cet animatronique",
    detail_rarity: "Rareté :",
    detail_equipment_label: "Équipement :",
    detail_none: "Aucun",
    reviews: "avis",

    stat_force: "Force",
    stat_agilite: "Agilité",
    stat_intelligence: "Intelligence",

    card_details: "Détails",
    equip_bonus: "Bonus :",

    list_no_chars: "Aucun animatronique trouvé.",
    list_no_equip: "Aucun équipement trouvé.",

    search_placeholder: "Rechercher par nom...",
    filter_all_raretes: "Toutes les raretés",
    filter_all_notes: "Toutes les notes",
    filter_bonus_types: "Types de bonus",
    filter_favorites_only: "Favoris uniquement",
    filter_reset: "Effacer les filtres",

    pagination_prev: "Précédent",
    pagination_next: "Suivant",
    pagination_page: "Page",

    raretes: {
      "Commun": "Commun",
      "Rare": "Rare",
      "Épique": "Épique",
      "Légendaire": "Légendaire",
      "Mythique": "Mythique"
    }
  }
};

let lang = localStorage.getItem("fazbear_lang") || "en";

export default class I18n {

  static getLang() {
    return lang;
  }

  static setLang(nouvelle) {
    lang = nouvelle;
    localStorage.setItem("fazbear_lang", nouvelle);
  }

  static toggle() {
    this.setLang(lang === "en" ? "fr" : "en");
    return lang;
  }

  // Libelle a afficher sur le bouton : la langue vers laquelle on peut basculer
  static autreLangue() {
    return lang === "en" ? "FR" : "EN";
  }

  static t(cle) {
    const dict = STRINGS[lang] || STRINGS.en;
    if (dict[cle] !== undefined) {
      return dict[cle];
    }
    return cle;
  }

  // Traduit une rarete (la valeur stockee reste en francais, seul l'affichage change)
  static rarete(valeur) {
    const dict = STRINGS[lang] || STRINGS.en;
    if (valeur && dict.raretes[valeur] !== undefined) {
      return dict.raretes[valeur];
    }
    return valeur;
  }
}
