const { GraphQLID, GraphQLNonNull } = require('graphql')
const { db } = require('../../db')
const { Game } = require('./type')

const getGame = {
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_, { id }) => {
    const result = await db.table('games').get(id).run()

    if (result === null) {
      throw Error('Could not find game with that id')
    }

    return result
  },
  type: Game,
}

module.exports = getGame
