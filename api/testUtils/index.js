const { graphql } = require('graphql')
const { store } = require('../auth')
const schema = require('../schema')

/**
 * @param {string} query The query to test against the GraphQL schema
 * @param {object} variables Any variables to provide
 * @param {object} context Optional context object to provide
 */
const gql = (query, variables, context) =>
  graphql(schema, query, undefined, context, variables)
    .then(result => {
      if (result.errors) {
        throw Error(result.errors)
      }
      return result.data
    })
    .then(data => Object.values(data)[0])

/**
 * @return {object} An object with the same signature of the context that's passed by express
 */
const httpContext = () => {
  const context = {
    req: {},
    res: {},
  }

  store.generate(context.req)
  context.req.sessionStore = store
  return context
}

module.exports = {
  gql,
  httpContext,
}
