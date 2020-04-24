const dbName = process.env.NODE_ENV === 'test' ? 'findrTest' : 'findr'

const db = require('rethinkdbdash')({
  db: dbName,
  host: process.env.DB_HOST,
  post: process.env.DB_POST,
})
const utils = require('./utils')

module.exports = {
  ...utils,
  db,
}
