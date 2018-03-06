const { GraphQLObjectType, GraphQLString } = require('graphql');

const query = new GraphQLObjectType({
  fields: {
    test: {
      resolve: () => 'test',
      type: GraphQLString,
    },
  },
  name: 'Queries',
});

module.exports = query;
