require('dotenv').config();
const r = require('rethinkdbdash')({
  host: process.env.DB_HOST,
  post: process.env.DB_POST,
});
const utils = require('./utils');

module.exports = {
  ...utils,
  db: r.db('scavenge'),
  r,
};
