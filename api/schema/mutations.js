const { GraphQLObjectType } = require('graphql');
const { mutations: listMutations } = require('./lists');
const { mutations: authMutations } = require('./auth');
const { mutations: userMutations } = require('./users');

const mutations = new GraphQLObjectType({
  fields: {
    ...listMutations,
    ...authMutations,
    ...userMutations,
  },
  name: 'Mutations',
});

module.exports = mutations;
