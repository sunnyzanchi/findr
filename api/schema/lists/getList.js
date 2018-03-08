const { GraphQLID, GraphQLString } = require('graphql');
const { db } = require('../../db');
const { List } = require('./type');

const getList = {
  args: {
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
  },
  resolve: (_, { id, name }) => {
    if (id) {
      return db.table('lists').get(id).run();
    }

    if (name) {
      return db
        .table('lists')
        .filter({ name })
        .nth(0)
        .default({})
        .run();
    }

    throw Error('`name` or `id` arg is required');
  },
  type: List,
};

module.exports = getList;
