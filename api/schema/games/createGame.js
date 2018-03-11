const { GraphQLNonNull } = require('graphql');
const { db } = require('../../db');
const { Game, GameInputType } = require('./type');
const { isLoggedIn } = require('../../utils/auth');

const createGame = {
  args: {
    game: {
      type: new GraphQLNonNull(GameInputType),
    },
  },
  resolve: async (_, { game }, context) => {
    if (!isLoggedIn(context.req)) {
      throw Error('Must be logged in to create a game');
    }

    const currentUserId = context.req.session.user.id;

    const result = await
      db
        .table('games')
        .insert({
          ...game,
          created: new Date(),
          createdBy: currentUserId,
          plays: [],
          status: 'WAITING',
          teams: [],
        },
        { returnChanges: true });

    return result.changes[0].new_val;
  },
  type: Game,
};

module.exports = createGame;
