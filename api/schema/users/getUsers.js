const { GraphQLInt, GraphQLList, GraphQLString } = require('graphql')
const { GraphQLNonNull } = require('graphql')
const { createLimitedQuery, db } = require('../../db')
const { User } = require('./type')

const getUsers = {
  args: {
    limit: {
      type: GraphQLInt,
    },
    search: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  description: 'Search for a user by part of their email',
  resolve: (_, { limit, search }) =>
    createLimitedQuery(
      db.table('users').filter(user => user('email').match(`(?i)${search}`))
    )(limit).run(),
  type: new GraphQLList(User),
}

module.exports = getUsers
