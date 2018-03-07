const { GraphQLNonNull } = require('graphql');
const { Game, GameInputType } = require('./type');

const newGame = {
  args: {
    game: {
      type: new GraphQLNonNull(GameInputType),
    },
  },
  resolve: (_, { game }) => {
    console.log(game);
  },
  type: Game,
};

module.exports = newGame;
