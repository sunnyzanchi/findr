const { GraphQLNonNull } = require('graphql');
const { db } = require('../../db');
const { Game, GameInputType } = require('./type');

const newGame = {
  args: {
    game: {
      type: new GraphQLNonNull(GameInputType),
    },
  },
  resolve: async (_, { game }) => {
    const result = await
      db
        .table('games')
        .insert({
          ...game,
          created: new Date(),
          plays: [],
          status: 'WAITING',
          teams: [],
        },
        { returnChanges: true });

    return result.changes[0].new_val;
  },
  type: Game,
};

module.exports = newGame;
