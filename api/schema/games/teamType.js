const {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');
const { UserInGame } = require('./userInGameType');
const { userLoader } = require('../../loaders');

const Team = new GraphQLObjectType({
  fields: {
    color: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    players: {
      resolve: (team) => userLoader().loadMany(team.players),
      type: new GraphQLList(UserInGame),
    },
    score: {
      type: GraphQLInt,
    },
  },
  name: 'Team',
});

const TeamInputType = new GraphQLInputObjectType({
  fields: {
    color: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
  },
  name: 'TeamInputType',
});

module.exports = { Team, TeamInputType };
