const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const app = express();

app.use('/graphql', graphqlHTTP({
  graphiql: process.env.NODE_ENV !== 'production',
  schema,
}));

app.listen(8000);
console.log('API started on port 8000');
