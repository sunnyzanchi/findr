const { GraphQLID, GraphQLNonNull } = require('graphql')
const { db } = require('../../db')
const { isLoggedIn } = require('../../utils/auth')
const { Team } = require('./teamType')

const joinTeam = {
  args: {
    gameId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    teamId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_, { gameId, teamId }, context) => {
    if (!isLoggedIn(context.req)) {
      throw Error('Must be logged in to join a game')
    }

    const currentUserId = context.req.session.user.id

    const result = await db
      .table('games')
      .get(gameId)
      .update(
        game => ({
          teams: game('teams').fold([], (acc, team) =>
            db.branch(
              team('id').eq(teamId),
              acc.append(
                team.merge({
                  players: db.branch(
                    team('players')
                      .count()
                      .lt(game('maxPlayersPerTeam'))
                      .default(true),
                    team('players')
                      .difference([currentUserId])
                      .append(currentUserId),
                    db.error('Team is at capacity')
                  ),
                })
              ),
              db.branch(
                team('players')
                  .count()
                  .eq(1)
                  .and(team('players').contains(currentUserId)),
                acc,
                acc.append(
                  team.merge({
                    players: team('players').difference([currentUserId]),
                  })
                )
              )
            )
          ),
        }),
        { returnChanges: true }
      )
      .run()

    if (result.first_error) {
      throw Error(result.first_error)
    }
    // If the provided teamId isn't in the list of teams, no changes will be made
    // to the document, so we know we received a bad teamId
    if (result.unchanged) {
      throw Error('Could not find team with that id')
    }
    // The object returned by .update() will have skipped: 1 if the document doesn't exist
    if (result.skipped) {
      throw Error('Could not find game with that id')
    }

    return result.changes[0].new_val.teams.find(t => t.id === teamId)
  },
  type: Team,
}

module.exports = joinTeam
