const bcrypt = require('bcrypt')
const { GraphQLNonNull } = require('graphql')
const { db } = require('../../db')
const { User, UserInputType } = require('./type')

const SALT_ROUNDS = Number(process.env.PW_SALT_ROUNDS)

if (!SALT_ROUNDS || !Number.isInteger(SALT_ROUNDS)) {
  throw Error(`Findr config error:
SALT_ROUNDS must be defined as an environment variable and must be an integer
`)
}

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
      : undefined

    // We're updating an existing user
    if (user.id) {
      const result = await db
        .table('users')
        .get(user.id)
        .update(
          {
            ...user,
            password: hash,
          },
          { returnChanges: true }
        )
        .run()

      return result.changes[0].new_val
    }

    // We're inserting a new user
    if (!user.username) {
      throw Error('`username` is required for adding a new user')
    }

    if (!user.password) {
      throw Error('`password` is required for adding a new user')
    }

    const result = await db
      .table('users')
      .filter({ username: user.username })
      .count()
      .do(count =>
        db.branch(
          count.gt(0),
          'EXISTS',
          db.table('users').insert(
            {
              ...user,
              password: hash,
            },
            { returnChanges: true }
          )
        )
      )
      .run()

    if (result === 'EXISTS') {
      throw Error(
        'User already exists. To update a user, make sure to pass the id'
      )
    }

    return result.changes[0].new_val
  },
  type: User,
}

module.exports = upsertUser
