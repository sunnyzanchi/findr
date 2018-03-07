const {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');
const GraphQLDate = require('graphql-date');
const { Play } = require('./playType');
const { Team } = require('./teamType');
const { User } = require('../users');

const Game = new GraphQLObjectType({
  fields: {
    created: {
      type: GraphQLDate,
    },
    createdBy: {
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
    teams: {
      type: new GraphQLList(Team),
    },
  },
  name: 'Game',
});

const GameInputType = new GraphQLInputObjectType({
  fields: {
    duration: {
      type: GraphQLString,
    },
    maxPlayersPerTeam: {
      type: GraphQLInt,
    },
    maxTeams: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
  },
  name: 'GameInputType',
});

module.exports = {
  Game,
  GameInputType,
};
