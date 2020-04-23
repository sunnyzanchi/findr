const { test } = require('ava')
const { gql } = require('../../testUtils')

test('can take email argument', async t => {
  const query = `
  {
    user (email: "a@a.com") {
      id
      email
    }
  }`

  const user = await gql(query)

  t.truthy(user.id)
  t.true(user.email === 'a@a.com')
})

test('can take id argument', async t => {
  const query = `
  {
    user (id: "111") {
      id
      email
    }
  }`

  const user = await gql(query)
  t.truthy(user.id)
  t.true(user.email === 'a@a.com')
})

test('throws if neither argument is provided', async t => {
  const query = `
  {
    user {
      id
      email
    }
  }`
  await t.throws(gql(query))
})
