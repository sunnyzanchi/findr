require('dotenv').config();
const r = require('rethinkdbdash')({
  host: process.env.DB_HOST,
  post: process.env.DB_POST,
});

module.exports = {
  db: r.db('scavenge'),
  r,
};
