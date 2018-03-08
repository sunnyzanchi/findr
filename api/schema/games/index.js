const addGame = require('./addGame');
const addTeam = require('./addTeam');
const { Game, GameInputType } = require('./type');

const mutations = {
  addGame,
  addTeam,
};

const queries = {

};

module.exports = {
  Game,
  GameInputType,
  mutations,
  queries,
};
