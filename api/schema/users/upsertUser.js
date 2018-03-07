const bcrypt = require('bcrypt');
const { GraphQLNonNull } = require('graphql');
const { db, r } = require('../../db');
const { User, UserInputType } = require('./type');

const SALT_ROUNDS = 12;

const upsertUser = {
  args: {
    user: {
      type: new GraphQLNonNull(UserInputType),
    },
  },
  resolve: async (_, { user }) => {
    // TODO: Add password validation
    const hash = user.password
      ? await bcrypt.hash(user.password, SALT_ROUNDS)
      : undefined;

    // We're updating an existing user
    if (user.id) {
      const result = await db
        .table('users')
        .get(user.id)
        .update({
          ...user,
          password: hash,
        }, { returnChanges: true })
        .run();

      return result.changes[0].new_val;
    }

    const result = await db
      .table('users')
      .filter({ username: user.username })
      .count()
      .do(count =>
        r.branch(
          count.gt(0),
          'EXISTS',
          db.table('users').insert({
            ...user,
            password: hash,
          },
          { returnChanges: true })
        )
      )
      .run();

    if (result === 'EXISTS') {
      throw Error('User already exists');
    }

    return result.changes[0].new_val;
  },
  type: User,
};

module.exports = upsertUser;
