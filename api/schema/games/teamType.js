const {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');
const { User } = require('../users');

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
      type: new GraphQLList(User),
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
