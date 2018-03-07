const { GraphQLObjectType } = require('graphql');
const { queries: gameQueries } = require('./games');
const { queries: userQueries } = require('./users');

const query = new GraphQLObjectType({
  fields: {
    ...gameQueries,
    ...userQueries,
  },
  name: 'Queries',
});

module.exports = query;
