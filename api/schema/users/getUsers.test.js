const { test } = require('ava')
const { gql } = require('../../testUtils')

const searchString = 'a'

test('can search by email', async t => {
  const query = `
  {
    users(search: "${searchString}") {
      email
      id
    }
  }
  `
  const users = await gql(query)

  users.forEach(user => {
    t.truthy(user.id)
    t.true(user.email.toLowerCase().includes(searchString))
  })
})

test('respects limit argument', async t => {
  const query = `
  {
    users(limit: 2, search: "${searchString}") {
      email
      id
    }
  }
  `
  const users = await gql(query)

  t.true(Array.isArray(users))
  t.true(users.length <= 2)
})

test("throws if search argument isn't provided", async t => {
  const query = `
  {
    users {
      email
      id
    }
  }
  `
  await t.throws(gql(query))
})
