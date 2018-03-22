const { test } = require('ava');
const { dissoc } = require('ramda');
const { gql, httpContext } = require('../../testUtils');

const createGame = `
mutation($game: GameInputType!) {
  createGame(game: $game) {
    duration
    id
    name
    status
  }
}`;

const game = {
  duration: 1200,
  name: 'login throw',
};

test('games can be created and have the correct values', async t => {
  // have to be logged in to make a game
  const context = httpContext();
  await gql(
    `mutation { login(password: "a", username: "a") }`,
    undefined,
    context,
  );

  const result = await gql(createGame, { game }, context);

  t.truthy(result.id);
  t.true(result.duration === game.duration);
  t.true(result.name === game.name);
  t.true(result.status === 'PREGAME');
});

test('throws if not logged in', async t => {
  await t.throws(gql(createGame, { game }));
});

test('throws if game arg isn\'t provided', async t => {
  const query = `
    mutation {
      createGame {
        id
      }
    }
  `;
  await t.throws(gql(query));
});

test('throws if duration isn\'t provided', async t => {
  const query = `
  mutation($game: GameInputType!) {
    createGame(game: $game) {
      id
    }
  }`;

  await t.throws(gql(query, { game: dissoc('duration', game) }));
});

test('throws if name isn\'t provided', async t => {
  const query = `
  mutation($game: GameInputType!) {
    createGame(game: $game) {
      id
    }
  }`;

  await t.throws(gql(query, { game: dissoc('name', game) }));
});
