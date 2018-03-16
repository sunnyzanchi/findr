const { test } = require('ava');
const { gql, httpContext } = require('../../testUtils');

test('logging out returns true and removes the user session', async t => {
  // we have to log in first
  // we're using a different user than the login test because the tests
  // run concurrently and we don't want them interferring with each other
  const login = `
  mutation {
    login(username: "b", password: "b")
  }`;

  const context = httpContext();

  // this mutates context.req.session
  await gql(login, undefined, context);

  const query = `
  mutation {
    logout
  }`;

  const result = await gql(query, undefined, context);

  t.true(result);
  t.falsy(context.req.session);
});
