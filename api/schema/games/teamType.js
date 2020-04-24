const {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql')
const { User } = require('../users')
const { userLoader } = require('../../loaders')

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
      resolve: team => userLoader().loadMany(team.players),
      type: new GraphQLList(User),
    },
    score: {
      type: GraphQLInt,
    },
  },
  name: 'Team',
})

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
})

module.exports = { Team, TeamInputType }
