const { GraphQLID, GraphQLString } = require('graphql');
const { db } = require('../../db');
const { User } = require('./type');

const getUser = {
  args: {
    id: {
      type: GraphQLID,
    },
    username: {
      type: GraphQLString,
    },
  },
  description: 'Get a user by their username or uuid',
  resolve: (_, { id, username }) => {
    if (id) {
      return db.table('users').get(id).run();
    }

    if (username) {
      return db
        .table('users')
        .filter({ username })
        .nth(0)
        // To stop an ugly rethink error from leaking if the user doesn't exist
        .default({})
        .run();
    }

    throw Error('`username` or `id` arg is required');
  },
  type: User,
};

module.exports = getUser;
