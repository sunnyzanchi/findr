require('dotenv').config();
const bcrypt = require('bcrypt');
const { GraphQLBoolean, GraphQLNonNull, GraphQLString } = require('graphql');
const { db } = require('../../db');

const login = {
  args: {
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_, { password, username }, context) => {
    // This query is crashing the API intermittently?
    const realHash = await
      db
        .table('users')
        .filter({ username })
        .nth(0)('password')
        .run();

    const same = await bcrypt.compare(password, realHash);
    if (!same) {
      throw Error('Incorrect password');
    }
    return true;
  },
  type: GraphQLBoolean,
};

module.exports = login;
