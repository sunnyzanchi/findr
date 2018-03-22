const addTeam = require('./addTeam');
const createGame = require('./createGame');
const getGame = require('./getGame');
const joinTeam = require('./joinTeam');
const { Game, GameInputType } = require('./type');

const mutations = {
  addTeam,
  createGame,
  joinTeam,
};

const queries = {
  game: getGame,
};

module.exports = {
  Game,
  GameInputType,
  mutations,
  queries,
};
