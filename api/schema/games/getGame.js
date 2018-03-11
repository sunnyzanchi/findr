const { GraphQLID, GraphQLNonNull } = require('graphql');
const { db } = require('../../db');
const { Game } = require('./type');

const getGame = {
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: (_, { id }) =>
    db
      .table('games')
      .get(id)
      .run(),
  type: Game,
};

module.exports = getGame;
