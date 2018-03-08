const { GraphQLObjectType } = require('graphql');
const { mutations: listMutations } = require('./lists');
const { mutations: userMutations } = require('./users');

const mutations = new GraphQLObjectType({
  fields: {
    ...listMutations,
    ...userMutations,
  },
  name: 'Mutations',
});

module.exports = mutations;
