const { test } = require('ava');
const { gql, httpContext } = require('../../testUtils');

const joinTeam = `
mutation($gameId: ID!, $teamId: ID!) {
  joinTeam(gameId: $gameId, teamId: $teamId) {
    id
    name
    players {
      id
    }
  }
}`;

test('can join an existing team', async t => {
  const context = httpContext();
  await gql(
    `mutation { login(password: "a", username: "a") }`,
    undefined,
    context,
  );

  const result = await gql(
    joinTeam,
    { gameId: 'g111', teamId: 't111' },
    context,
  );

  t.true(result.id === 't111');
  t.true(result.name === 'TestTeam1');
  t.truthy(result.players.find(p => p.id === '111'));
});

test('throws if trying to join a team when not logged in', async t => {
  await t.throws(gql(joinTeam, { gameId: 'g111', teamId: 't111' }));
});

test('throws if game id isn\'t provided', async t => {
  await t.throws(gql(joinTeam, { teamId: 't111' }));
});

test('throws if team id isn\'t provided', async t => {
  await t.throws(gql(joinTeam, { gameId: 'g111' }));
});
