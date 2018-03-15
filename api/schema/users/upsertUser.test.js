const { test } = require('ava');
const { gql } = require('../../testUtils');

test('should be able to add a user', async t => {
  const userToAdd = {
    password: 'a',
    username: 'upsertUserTest',
  };

  const query = `
  mutation($user: UserInputType!) {
    user(user: $user) {
      id
      username
    }
  }
  `;

  const user = await gql(query, { user: userToAdd });

  t.truthy(user.id);
  t.true(user.username === userToAdd.username);
});

test('throws if no user is provided', async t => {
  const query = `
  mutation {
    user {
      id
      username
    }
  }
  `;
  await t.throws(gql(query));
});

test('throws if no password is provided', async t => {
  const query = `
  mutation {
    user(user: { username: "a" }) {
      id
      username
    } 
  }`;
  await t.throws(gql(query));
});

test('throws if no username is provided', async t => {
  const query = `
  mutation {
    user(user: { password: "a" }) {
      id
      username
    } 
  }`;
  await t.throws(gql(query));
});
