const { GraphQLID, GraphQLString } = require('graphql')
const { db } = require('../../db')
const { User } = require('./type')

const getUser = {
  args: {
    email: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLID,
    },
  },
  description: 'Get a user by their email or uuid',
  resolve: (_, { id, email }) => {
    if (id) {
      return db.table('users').get(id).run()
    }

    if (email) {
      return (
        db
          .table('users')
          .filter({ email })
          .nth(0)
          // To stop an ugly rethink error from leaking if the user doesn't exist
          .default({})
          .run()
      )
    }

    throw Error('`email` or `id` arg is required')
  },
  type: User,
}

module.exports = getUser
