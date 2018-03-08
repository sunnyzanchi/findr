const addGame = require('./addGame');
const addTeam = require('./addTeam');
const joinTeam = require('./joinTeam');
const readyStatus = require('./readyStatus');
const { Game, GameInputType } = require('./type');

const mutations = {
  addGame,
  addTeam,
  joinTeam,
  readyStatus,
};

const queries = {

};

module.exports = {
  Game,
  GameInputType,
  mutations,
  queries,
};
