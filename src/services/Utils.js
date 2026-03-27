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
