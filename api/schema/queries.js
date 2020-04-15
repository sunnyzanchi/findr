const { GraphQLObjectType } = require('graphql');
const { queries: listQueries } = require('./lists');
const { queries: userQueries } = require('./users');

const query = new GraphQLObjectType({
  fields: {
    ...listQueries,
    ...userQueries,
  },
  name: 'Queries',
});

module.exports = query;
