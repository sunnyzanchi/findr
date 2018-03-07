const addGame = require('./addGame');
const { Game, GameInputType } = require('./type');

const mutations = {
  addGame,
};

const queries = {

};

module.exports = {
  Game,
  GameInputType,
  mutations,
  queries,
};
