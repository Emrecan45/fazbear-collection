export default class PlayerService {

  // Retourne l'identifiant unique du joueur (créé si inexistant)
  static getPlayerId() {
    let id = localStorage.getItem("playerId");
    if (id === null) {
      id = "player_" + Math.random();
      localStorage.setItem("playerId", id);
    }
    return id;
  }
}
