const test = require('ava')
const { gql } = require('../../testUtils')

test('should be able to add a user', async t => {
  const userToAdd = {
    email: 'upsertUserTest@example.com',
    password: 'a',
  }

  const query = `
  mutation($user: UserInputType!) {
    user(user: $user) {
      email
      id
    }
  }
  `

  const user = await gql(query, { user: userToAdd })

  t.truthy(user.id)
  t.true(user.email === userToAdd.email)
})

test('should be able to update a user', async t => {
  const email = 'testing@example.com'
  const query = `
  mutation {
    user(user: { id: 555, email: "${email}" }) {
      id
      email
    }
  }`

  const user = await gql(query)

  t.true(user.id === '555')
  t.true(user.email === email)
})

test('throws if no user is provided', async t => {
  const query = `
  mutation {
    user {
      email
      id
    }
  }
  `
  await t.throwsAsync(() => gql(query))
})

test('throws if no password is provided', async t => {
  const query = `
  mutation {
    user(user: { email: "a@a.com" }) {
      email
      id
    } 
  }`
  await t.throwsAsync(() => gql(query))
})

test('throws if no email is provided', async t => {
  const query = `
  mutation {
    user(user: { password: "a" }) {
      email
      id
    } 
  }`
  await t.throwsAsync(() => gql(query))
})

test('throws if trying to create a user with an existing email', async t => {
  const query = `
  mutation {
    user(user: { password: "b", email: "b@example.com" }) {
      email
      id
    }
  }`

  await t.throwsAsync(() => gql(query))
})
