const {
  GraphQLEnumType,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');
const { Play } = require('./playType');
const { Team } = require('./teamType');
const { User } = require('../users');
const { userLoader } = require('../../loaders');

const GameStatus = new GraphQLEnumType({
  name: 'GameStatus',
  values: {
    COMPLETE: { value: 'COMPLETE' },
    PREGAME: { value: 'PREGAME' },
    STARTED: { value: 'STARTED' },
  },
});

const Game = new GraphQLObjectType({
  fields: {
    created: {
      type: GraphQLDateTime,
    },
    createdBy: {
      resolve: (game) => userLoader().load(game.createdBy),
      type: User,
    },
    duration: {
      description: 'Length of the game in seconds',
      type: GraphQLInt,
    },
    id: {
      type: GraphQLID,
    },
    // Will come from https://github.com/zanchi/scavenge/issues/1
    // list: {
    //   type: List
    // },
    maxPlayersPerTeam: {
      type: GraphQLInt,
    },
    maxTeams: {
      type: GraphQLInt,
    },
    name: {
      description: 'The user-set name of the game',
      type: GraphQLString,
    },
    plays: {
      description: 'A list of descriptions of every time a player scores',
      type: new GraphQLList(Play),
    },
    status: {
      type: GameStatus,
    },
    teams: {
      type: new GraphQLList(Team),
    },
  },
  name: 'Game',
});

const GameInputType = new GraphQLInputObjectType({
  fields: {
    duration: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    maxPlayersPerTeam: {
      type: GraphQLInt,
    },
    maxTeams: {
      type: GraphQLInt,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  name: 'GameInputType',
});

module.exports = {
  Game,
  GameInputType,
};
