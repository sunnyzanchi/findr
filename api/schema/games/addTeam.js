const { GraphQLID, GraphQLNonNull } = require('graphql');
const randomColor = require('random-color');
const { db } = require('../../db');
const { Team, TeamInputType } = require('./teamType');
const uuid = require('uuid/v4');

const addTeam = {
  args: {
    gameId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    team: {
      type: new GraphQLNonNull(TeamInputType),
    },
  },
  resolve: async (_, { gameId, team }) => {
    const result = await db
      .table('games')
      .get(gameId)
      .update(game =>
        db
          .branch(
            game('teams').contains(
              t => t('name').eq(team.name)
            ),
            db.error('Team with that name already exists'),
            {
              teams: game('teams')
                .append({
                  ...team,
                  color: team.color || randomColor().hexString(),
                  // I wanted to use rethink's uuid but that makes the query
                  // non-deterministic which would force us to use the nonAtomic
                  // flag for this query
                  id: uuid(),
                  // TODO: Add player making the team from the current session
                  // This can be done after https://github.com/zanchi/scavenge/issues/5
                  // is implemented
                  players: [],
                }),
            }
          ),
      {
        returnChanges: true,
      })
      .run();

    if (result.first_error) {
      throw Error(result.first_error);
    }
    // The object returned by .update() will have skipped: 1 if the document doesn't exist
    if (result.skipped) {
      throw Error('Could not find game with that id');
    }

    // We need to find the team we just added because the above query updates the
    // game document, but this query expects the Team type to be returned
    return result.changes[0].new_val.teams.find(t => t.name === team.name);
  },
  type: Team,
};

module.exports = addTeam;
