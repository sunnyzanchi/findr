const { test } = require('ava')
const { gql, httpContext } = require('../../testUtils')

test('logging in returns true and sets the user session', async t => {
  const query = `
  mutation {
    login (password: "a", email: "a@a.com")
  }`

  const context = httpContext()

  const result = await gql(query, undefined, context)

  const session = context.req.session

  t.true(result)
  t.true(session.user.id === '111')
  t.true(session.user.email === 'a@a.com')
  t.falsy(session.user.password)
})

test('throws if no password provided', async t => {
  const query = `
  mutation {
    login(email: "a@a.com")
  }`

  await t.throws(gql(query))
})

test('throws if no email provided', async t => {
  const query = `
  mutation {
    login(password: "a")
  }`

  await t.throws(gql(query))
})

test('throws if password is incorrect', async t => {
  const query = `
  mutation {
    login(password: "definitely the wrong password", email: "a@a.com")
  }`

  await t.throws(gql(query))
})

test("throws if user doesn't exist", async t => {
  const query = `
  mutation {
    login(password: "a", email: "thisUserDoesntExist")
  }`

  await t.throws(gql(query))
})
