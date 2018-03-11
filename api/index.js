require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const auth = require('./auth');
const schema = require('./schema');
const app = express();

app.use(auth);
app.use('/graphql', graphqlHTTP((req, res) => ({
  context: { req, res },
  graphiql: process.env.NODE_ENV !== 'production',
  schema,
})));

app.listen(8000);
console.log('API started on port 8000');
