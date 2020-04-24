const { GraphQLObjectType } = require('graphql')
const { mutations: authMutations } = require('./auth')
const { mutations: gameMutations } = require('./games')
const { mutations: userMutations } = require('./users')

const mutations = new GraphQLObjectType({
  fields: {
    ...authMutations,
    ...gameMutations,
    ...userMutations,
  },
  name: 'Mutations',
})

module.exports = mutations
