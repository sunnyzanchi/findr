const { GraphQLObjectType } = require('graphql')
const { mutations: authMutations } = require('./auth')
const { mutations: userMutations } = require('./users')

const mutations = new GraphQLObjectType({
  fields: {
    ...authMutations,
    ...userMutations,
  },
  name: 'Mutations',
})

module.exports = mutations
