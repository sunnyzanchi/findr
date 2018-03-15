const { graphql } = require('graphql');
const schema = require('../schema');

const gql = (query, variables, context) =>
  graphql(schema, query, undefined, context, variables)
    .then(result => {
      if (result.errors) {
        throw result.errors;
      }
      return result.data;
    })
    .then(data => Object.values(data)[0]);

module.exports = {
  gql,
};
