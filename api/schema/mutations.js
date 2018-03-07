const { GraphQLObjectType } = require('graphql');
const { mutations: gameMutations } = require('./games');
const { mutations: userMutations } = require('./users');

const mutations = new GraphQLObjectType({
  fields: {
    ...gameMutations,
    ...userMutations,
  },
  name: 'Mutations',
});

module.exports = mutations;
