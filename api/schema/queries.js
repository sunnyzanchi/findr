const { GraphQLObjectType } = require('graphql')
const { queries: userQueries } = require('./users')

const query = new GraphQLObjectType({
  fields: {
    ...userQueries,
  },
  name: 'Queries',
})

module.exports = query
