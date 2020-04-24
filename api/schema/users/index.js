const getUser = require('./getUser')
const getUsers = require('./getUsers')
const upsertUser = require('./upsertUser')
const { User, UserInputType } = require('./type')

const queries = {
  user: getUser,
  users: getUsers,
}

const mutations = {
  user: upsertUser,
}

module.exports = {
  mutations,
  queries,
  User,
  UserInputType,
}
