require('dotenv').config();
const session = require('express-session');
const RDBStore = require('session-rethinkdb')(session);
const { db } = require('./db');

const store = new RDBStore(db, {
  browserSessionsMaxAge: 60000,
  clearInterval: 60000,
  table: 'sessions',
});

const secret = process.env.SESSION_SECRET;

if (!secret) {
  throw Error(`Scavenge config error:
"SESSION_SECRET" must be defined as an environment variable`
  );
}

module.exports = session({
  resave: true,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  store,
});
