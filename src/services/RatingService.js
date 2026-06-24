import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../config.js";

// Notes partagees entre tous les visiteurs via Supabase (PostgREST).
// Si la config est vide, le service se desactive proprement (notes a 0, vote ignore).

let statsCache = null;

function estConfigure() {
  return SUPABASE_URL !== "" && SUPABASE_ANON_KEY !== "";
}

function entetes(extra) {
  const base = {
    "apikey": SUPABASE_ANON_KEY,
    "Authorization": "Bearer " + SUPABASE_ANON_KEY,
    "Content-Type": "application/json"
  };
  if (extra) {
    for (let cle in extra) {
      base[cle] = extra[cle];
    }
  }
  return base;
}

function formater(moyenne, nombre) {
  if (!nombre || nombre === 0) {
    return "0.0";
  }
  return Number(moyenne).toFixed(1);
}

export default class RatingService {

  static estActif() {
    return estConfigure();
  }

  // Identifiant anonyme du visiteur (cree une fois, garde dans le navigateur)
  static userId() {
    let id = localStorage.getItem("fazbear_user");
    if (id === null) {
      id = "u_" + Date.now() + "_" + Math.floor(Math.random() * 1000000);
      localStorage.setItem("fazbear_user", id);
    }
    return id;
  }

  // Note donnee par ce visiteur a un personnage (0 si aucune)
  static maNote(characterId) {
    let v = localStorage.getItem("note_perso_" + characterId);
    if (v === null) {
      return 0;
    }
    return parseInt(v);
  }

  // Charge la moyenne et le nombre de notes de tous les personnages (une fois par page)
  static async chargerStats() {
    if (statsCache !== null) {
      return statsCache;
    }
    if (!estConfigure()) {
      statsCache = {};
      return statsCache;
    }

    const map = {};
    try {
      const url = SUPABASE_URL + "/rest/v1/note_stats?select=character_id,moyenne,nombre";
      const res = await fetch(url, { headers: entetes() });
      const lignes = await res.json();
      for (let i = 0; i < lignes.length; i++) {
        map[lignes[i].character_id] = {
          moyenne: formater(lignes[i].moyenne, lignes[i].nombre),
          nombre: lignes[i].nombre
        };
      }
    } catch (err) {
      console.error("RatingService.chargerStats :", err);
    }

    statsCache = map;
    return map;
  }

  static async stat(characterId) {
    const map = await this.chargerStats();
    if (map[characterId] !== undefined) {
      return map[characterId];
    }
    return { moyenne: "0.0", nombre: 0 };
  }

  // Enregistre (ou remplace) la note du visiteur, puis renvoie la nouvelle moyenne
  static async voter(characterId, valeur) {
    if (!estConfigure()) {
      return { moyenne: "0.0", nombre: 0 };
    }

    const corps = [{
      user_id: this.userId(),
      character_id: String(characterId),
      value: valeur
    }];

    try {
      await fetch(SUPABASE_URL + "/rest/v1/notes?on_conflict=user_id,character_id", {
        method: "POST",
        headers: entetes({ "Prefer": "resolution=merge-duplicates,return=minimal" }),
        body: JSON.stringify(corps)
      });
      localStorage.setItem("note_perso_" + characterId, valeur);
    } catch (err) {
      console.error("RatingService.voter :", err);
    }

    statsCache = null; // la moyenne a change
    return this.statFraiche(characterId);
  }

  // Relit la moyenne d'un personnage directement depuis le serveur (apres un vote)
  static async statFraiche(characterId) {
    if (!estConfigure()) {
      return { moyenne: "0.0", nombre: 0 };
    }
    try {
      const url = SUPABASE_URL + "/rest/v1/note_stats?character_id=eq." +
        encodeURIComponent(characterId) + "&select=moyenne,nombre";
      const res = await fetch(url, { headers: entetes() });
      const lignes = await res.json();
      if (lignes.length > 0) {
        return { moyenne: formater(lignes[0].moyenne, lignes[0].nombre), nombre: lignes[0].nombre };
      }
    } catch (err) {
      console.error("RatingService.statFraiche :", err);
    }
    return { moyenne: "0.0", nombre: 0 };
  }
}
