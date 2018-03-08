require('dotenv').config();
const db = require('rethinkdbdash')({
  db: 'scavenge',
  host: process.env.DB_HOST,
  post: process.env.DB_POST,
});
const utils = require('./utils');

module.exports = {
  ...utils,
  db,
};
