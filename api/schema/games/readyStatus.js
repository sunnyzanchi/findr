const { GraphQLBoolean, GraphQLID } = require('graphql');
const { db } = require('../../db');
const { UserInGame } = require('./userInGameType');

const readyStatus = {
  args: {
    gameId: {
      type: GraphQLID,
    },
    status: {
      type: GraphQLBoolean,
    },
    // This will come from the current session after
    // https://github.com/zanchi/scavenge/issues/5
    // is implemented
    userId: {
      type: GraphQLID,
    },
  },
  resolve: async (_, { gameId, status, userId }) => {
    console.log(status);
    const result = await
      db
        .table('games')
        .get(gameId)
        .update(game => ({
          teams: game('teams').map(
            team => db.branch(
              team('players').contains(p => p('id').eq(userId)),
              team('players').map(
                player => db.branch(
                  player('id').eq(userId),
                  player.merge({ ready: status }),
                  player,
                )
              ),
              team
            )
          ),
        }),
        { returnChanges: true })
        .run();

    console.log(result);

    return result.changes[0].new_val;
  },
  type: UserInGame,
};

module.exports = readyStatus;
