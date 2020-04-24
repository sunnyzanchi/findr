const {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql')
const { GraphQLDateTime } = require('graphql-iso-date')
const Username = require('./username')

const User = new GraphQLObjectType({
  fields: {
    avatarUrl: {
      type: GraphQLString,
    },
    created: {
      type: GraphQLDateTime,
    },
    email: {
      type: GraphQLString,
    },
    gamesLost: {
      type: GraphQLInt,
    },
    gamesPlayed: {
      type: GraphQLInt,
    },
    gamesWon: {
      type: GraphQLInt,
    },
    id: {
      type: GraphQLID,
    },
    listsCreated: {
      type: GraphQLInt,
    },
    phone: {
      type: GraphQLString,
    },
    username: {
      type: Username,
    },
  },
  name: 'User',
})

const UserInputType = new GraphQLInputObjectType({
  fields: {
    email: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLID,
    },
    password: {
      type: GraphQLString,
    },
    phone: {
      type: GraphQLString,
    },
    username: {
      type: Username,
    },
  },
  name: 'UserInputType',
})

module.exports = {
  User,
  UserInputType,
}
