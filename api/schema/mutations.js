const { GraphQLObjectType } = require('graphql');
const { mutations: userMutations } = require('./users');

const mutations = new GraphQLObjectType({
  fields: {
    ...userMutations,
  },
  name: 'Mutations',
});

module.exports = mutations;
