const { test } = require('ava')
const { gql } = require('../../testUtils')

test('can take username argument', async t => {
  const query = `
  {
    user (username: "a") {
      id
      username
    }
  }`

  const user = await gql(query)

  t.truthy(user.id)
  t.true(user.username === 'a')
})

test('can take id argument', async t => {
  const query = `
  {
    user (id: "111") {
      id
      username
    }
  }`

  const user = await gql(query)
  t.truthy(user.id)
  t.true(user.username === 'a')
})

test('throws if neither argument is provided', async t => {
  const query = `
  {
    user {
      id
      username
    }
  }`
  await t.throws(gql(query))
})
