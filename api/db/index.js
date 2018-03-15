const dbName = process.env.NODE_ENV === 'test'
  ? 'scavengeTest'
  : 'scavenge';

const db = require('rethinkdbdash')({
  db: dbName,
  host: process.env.DB_HOST,
  post: process.env.DB_POST,
});
const utils = require('./utils');

module.exports = {
  ...utils,
  db,
};
