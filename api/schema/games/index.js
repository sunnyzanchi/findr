const addGame = require('./addGame');
const addTeam = require('./addTeam');
const joinTeam = require('./joinTeam');
const { Game, GameInputType } = require('./type');

const mutations = {
  addGame,
  addTeam,
  joinTeam,
};

const queries = {

};

module.exports = {
  Game,
  GameInputType,
  mutations,
  queries,
};
