const Utils = {
  parseRequestURL: () => {
    let url = location.hash.slice(1).toLowerCase() || "/";
    let r = url.split("/");
    let request = {
      resource: null,
      id: null,
      verb: null,
    };
    request.resource = r[1];
    request.id = r[2];
    request.verb = r[3];

    return request;
  },

  sleep: (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  // Convertit un texte de bonus comme "+10 force" en objet avec stat, valeur et texte
  parseBonusStat: (texteBonus) => {
    if (texteBonus === undefined || texteBonus === null || texteBonus === "") {
      return null;
    }

    let r = texteBonus.split(" ");

    if (r.length < 2) {
      return null;
    }

    let valStr = r[0]; // Le bonus sous forme de string, ex: "+10"
    let statStr = r[1];   // "force", "agilite" ou "intelligence"

    return {
      stat: statStr,
      valeur: parseInt(valStr), // mettre le bonus str en nbr
      texte: valStr
    };
  },

  // Calcule le nombre total de pages pour la pagination
  calculerTotalPages: function(nombreElements, itemsParPage) {
    let total = parseInt(nombreElements / itemsParPage);
    if (nombreElements % itemsParPage !== 0) {
      total = total + 1;
    }
    if (total === 0) {
      total = 1;
    }
    return total;
  },


};

export default Utils;
