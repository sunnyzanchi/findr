const { test } = require('ava');
const { gql } = require('../../testUtils');

test('can get a game', async t => {
  const query = `
  {
    game(id: "g111") {
      id
      name
      status
    }
  }`;

  const result = await gql(query);

  t.true(result.id === 'g111');
  t.true(result.name === 'TestGame1');
  t.true(result.status === 'PREGAME');
});

test('throws if id isn\'t provided', async t => {
  const query = `
  {
    game {
      id
      name
      status
    }
  }`;

  await t.throws(gql(query));
});

test('throws if the game doesn\'t exist', async t => {
  const query = `
  {
    game(id: "definitely doesn't exist"){
      id
      name
      status
    }
  }`;

  await t.throws(gql(query));
});
