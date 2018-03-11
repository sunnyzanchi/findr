const bcrypt = require('bcrypt');
const { GraphQLBoolean, GraphQLNonNull, GraphQLString } = require('graphql');
const { dissoc } = require('ramda');
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
    const user = await
      db
        .table('users')
        .filter({ username })
        .nth(0)
        .default({})
        .run();

    if (!user.id) {
      throw Error('Username not found');
    }

    const same = await bcrypt.compare(password, user.password);
    if (!same) {
      throw Error('Incorrect password');
    }

    // express-session relies on us mutating the req.session to set the session
    context.req.session.user = dissoc('password', user);

    return true;
  },
  type: GraphQLBoolean,
};

module.exports = login;
