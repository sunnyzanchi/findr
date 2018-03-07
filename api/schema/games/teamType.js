const {
  GraphQLID,
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

module.exports = { Team };
