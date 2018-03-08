const { GraphQLID } = require('graphql');
const { db } = require('../../db');
const { Team } = require('./teamType');

const joinTeam = {
  args: {
    gameId: {
      type: GraphQLID,
    },
    teamId: {
      type: GraphQLID,
    },
  },
  // TODO: Add check for if the team has reached capacity
  resolve: async (_, { gameId, teamId }) => {
    const result = await
      db
        .table('games')
        .get(gameId)
        .update(game => ({
          teams: game('teams').map(team =>
            db.branch(
              team('id').eq(teamId),
              team.merge({
                // TODO: Add the user from the current sessions
                // This can be done after https://github.com/zanchi/scavenge/issues/5
                players: team('players').append({
                  id: Math.random(),
                  ready: false,
                }),
              }),
              team
            )
          ),
        }),
        { returnChanges: true })
        .run();

    console.log(result);
    if (result.first_error) {
      throw Error(result.first_error);
    }
    // If the provided teamId isn't in the list of teams, no changes will be made
    // to the document, so we know we received a bad teamId
    if (result.unchanged) {
      throw Error('Could not find team with that id');
    }
    // The object returned by .update() will have skipped: 1 if the document doesn't exist
    if (result.skipped) {
      throw Error('Could not find game with that id');
    }

    return result.changes[0].new_val.teams.find(t => t.id === teamId);
  },
  type: Team,
};

module.exports = joinTeam;
