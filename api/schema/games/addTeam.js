const { GraphQLID, GraphQLNonNull } = require('graphql');
const randomColor = require('random-color');
const { db } = require('../../db');
const { isLoggedIn } = require('../../utils/auth');
const { Team, TeamInputType } = require('./teamType');
const uuid = require('uuid/v4');

/**
 * This lets a player create a new team in a game that has not started.
 * If the game is not in WAITING state, (STARTED or COMPLETE),
 * it will throw an error.
 *
 * Adding a new team will also put the player making the request on that team.
 * If the player is already on another team, it will remove them from that team.
 * If the team that they are leaving consists solely of that player,
 * that team will be removed.
 */
const addTeam = {
  args: {
    gameId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    team: {
      type: new GraphQLNonNull(TeamInputType),
    },
  },
  resolve: async (_, { gameId, team }, context) => {
    if (!isLoggedIn(context.req)) {
      throw Error('Must be logged in to add a team');
    }

    const currentUserId = context.req.session.user.id;

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
              teams: game('teams').fold(
                [],
                (acc, t) => db.branch(
                  t('players').count().eq(1).and(
                    t('players').contains(currentUserId)
                  ),
                  acc,
                  acc.append(
                    t.merge({
                      players: t('players').difference([currentUserId]),
                    })
                  )
                )
              )
                .default([])
                .append({
                  ...team,
                  color: team.color || randomColor().hexString(),
                  // I wanted to use rethink's uuid but that makes the query
                  // non-deterministic which would force us to use the nonAtomic
                  // flag for this query
                  id: uuid(),
                  players: [currentUserId],
                }),
            }), { returnChanges: true })
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
